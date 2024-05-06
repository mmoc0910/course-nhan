import { FC, memo, useCallback, useEffect, useState } from "react";
import { QAType, ResultLessonType, TestType } from "../../../../types";
import { v4 as uuidv4 } from "uuid";
import classNames from "../../../../utils/classNames";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import { toast } from "react-toastify";
import axios from "axios";
import { CountdownProps, Modal, Rate, Statistic } from "antd";
const { Countdown } = Statistic;

type TestTabProps = {
  test: TestType;
  updateLessonComplete: (value: number) => void;
  courseId: string;
  studentId: string;
  isRate: boolean;
};
export const TestTab: FC<TestTabProps> = ({
  test,
  updateLessonComplete,
  courseId,
  studentId,
  isRate,
}) => {
  // console.log("isRate - ", isRate);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [isStart, setIsStart] = useState<boolean>(
    auth && auth.role !== 1 ? true : false
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const questions = JSON.parse(test.qa) as QAType[];
  const [showResult, setShowresult] = useState<boolean>(false);
  const [answers, setAnswers] = useState<(number | undefined)[]>(
    new Array(questions.length).fill(undefined)
  );
  console.log("answer - ", answers);
  console.log("questions - ", questions);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultTest, setResultTest] = useState<number | undefined>();
  const [isSave, setIsSave] = useState<boolean>(false);
  // console.log("resultTest - ", resultTest);
  // console.log("isStart - ", isStart);
  useEffect(() => {
    fetchData();
    // setShowresult(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    isRate && !resultTest && !isSave && showModal();
  }, [isRate, isSave, resultTest]);
  const fetchData = async () => {
    if (auth)
      try {
        const result = await axiosPrivate.get<ResultLessonType[]>(
          `/results?student=${studentId}&test=${test._id}`
        );
        if (result.data.length > 0) {
          const { totalCorrect } = result.data[0];
          setResultTest(totalCorrect / answers.length);
          const { answer } = result.data[0];
          const answerParse = answer.split(",").map((item) => Number(item));
          setAnswers((prev) => [
            ...answerParse,
            ...new Array(prev.length - answerParse.length).fill(""),
          ]);
          setIsSave(true);
          setShowresult(false);
        }
      } catch (error) {
        // console.log(error);
      }
  };
  const handleSubmitTest = async () => {
    if (auth)
      try {
        setLoading(true);
        // console.log('answers.join(",") - ', answers.join(","));
        await axiosPrivate.post(`/results`, {
          student: auth._id,
          test: test._id,
          answer: answers.join(","),
        });
        const result = await axiosPrivate.post<{ lastOrder: number }>(
          `/results/last-order`,
          {
            student: auth._id,
            course: courseId,
          }
        );
        fetchData();
        if (result.data) updateLessonComplete(result.data.lastOrder);
        toast("Success");
        setIsStart(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error);
          toast(error.response?.data.message);
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
        // questions.forEach((item, index)=> console.log(`câu hỏi ${item.question}:`, item))
        const iresultTest = questions.filter(
          (item, index) => (Number(item.correct) === Number(answers[index])) && (answers[index] !== undefined)
        );
        // console.log("iresultTest - ", iresultTest);
        // console.log("result test - ", resultTest);
        // setResultTest(resultTest.length)
        setResultTest(iresultTest.length / answers.length);
        setAnswers(answers);
        setIsStart(false);
        setShowresult(true);
        setIsSave(false);
      } finally {
        setLoading(false);
      }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish: CountdownProps["onFinish"] = useCallback(() => {
    handleSubmitTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Modal open={isModalOpen} footer={[]} onCancel={handleCancel} centered>
        <RateCourse courseId={courseId} handleCancel={handleCancel} />
      </Modal>
      <p className="text-center font-bold text-3xl mb-3">{test.title}</p>
      <p className="text-center font-medium text-lg mb-3">
        Tổng số câu hỏi: {questions.length}
      </p>
      {auth && (auth.role === 1) ? (
        <div className="flex items-center gap-2 justify-center mb-3">
          <p className="text-center font-semibold text-xl">Thời gian:</p>
          {isStart ? (
            <CownDownTest duration={test.duration} onFinish={onFinish} />
          ) : (
            <p className="text-center font-semibold text-xl">
              {test.duration} phút
            </p>
          )}
        </div>
      ) : null}
      {(resultTest !== undefined && !isStart) ? (
        <p className="text-center mb-5 text-lg text-secondary font-semibold">
          Số điểm đã đạt được:{" "}
          <span className="text-secondary">{(resultTest * 100).toFixed(1)}%</span>
        </p>
      ) : null}
      {(auth && auth.role === 2 && resultTest !== undefined) ? (
        <p className="text-center mb-5 text-lg text-secondary font-semibold">
          Số điểm đã đạt được:{" "}
          <span className="text-secondary">{(resultTest * 100).toFixed(1)}%</span>
        </p>
      ) : null}
      {!isStart ? (
        <div className="flex justify-center items-center mb-5 gap-5">
          {resultTest !== undefined ? (
            <>
              {isSave && !showResult && (
                <button
                  className="px-5 py-3 bg-primary20 text-white font-semibold rounded-lg"
                  onClick={() => setShowresult(true)}
                >
                  Xem kết quả
                </button>
              )}
              <button
                className="px-5 py-3 bg-secondary20 text-white font-semibold rounded-lg"
                onClick={() => {
                  setAnswers(new Array(questions.length).fill(undefined));
                  setIsStart(true);
                }}
              >
                Làm lại
              </button>
            </>
          ) : (
            <button
              className="px-5 py-3 bg-secondary20 text-white font-semibold rounded-lg"
              onClick={() => {
                setAnswers(new Array(questions.length).fill(undefined));
                setIsStart(true);
              }}
            >
              Bắt đầu làm
            </button>
          )}
        </div>
      ) : null}
      {(isStart || showResult) && (
        <ul className="space-y-4">
          {questions.map((item, index) => (
            <li key={uuidv4()}>
              <p className={classNames("font-semibold mb-3")}>
                Câu {index + 1}: {item.question}
              </p>
              <ul className="grid grid-cols-2">
                {item.answer.map((value, i) => (
                  <li
                    onClick={() =>
                      isStart &&
                      auth?.role === 1 &&
                      setAnswers((prev) =>
                        [...prev].map((number, ind) =>
                          ind === index ? i : number
                        )
                      )
                    }
                    className={classNames(
                      "flex items-center gap-2 rounded-xl px-6 py-2 border border-border-gray cursor-pointer",
                      answers[index] === i
                        ? "border-[#00000063] bg-[#dee9f3]"
                        : "",
                      (!isStart || auth?.role === 2) &&
                        answers[index] !== item.correct &&
                        answers[index] === i
                        ? "border-error"
                        : "",
                      (!isStart || auth?.role === 2) &&
                        answers[index] === item.correct &&
                        answers[index] === i
                        ? "border-primary"
                        : "",

                      auth && (auth.role === 3 || auth.role === 4) && item.correct === i
                        ? "border-primary"
                        : ""
                    )}
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      {isStart && auth?.role === 1 ? (
        <button
          onClick={handleSubmitTest}
          disabled={loading}
          className="disabled:cursor-not-allowed mt-5 px-5 mr-auto text-white bg-primary py-3 rounded-lg font-semibold flex items-center justify-center h-[48px]"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-b-transparent animate-spin rounded-full" />
          ) : (
            "Nộp bài"
          )}
        </button>
      ) : null}
    </div>
  );
};

const CownDownTest = memo(
  ({ duration, onFinish }: { duration: number; onFinish: () => void }) => {
    return (
      <Countdown
        value={Date.now() + duration * 60 * 1000}
        onFinish={onFinish}
      />
    );
  }
);

const RateCourse = ({
  courseId,
  handleCancel,
}: {
  courseId: string;
  handleCancel: () => void;
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(0);
  const [value, setValue] = useState<string>("");
  const handleSubmitRate = async () => {
    if (auth)
      try {
        setLoading(true);
        await axiosPrivate.post(`/rates`, {
          course: courseId,
          user: auth._id,
          content: value,
          vote: rate,
        });
        handleCancel();
        toast("Đánh giá khóa học thành công ");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
  };
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xl font-bold text-center">Đánh giá khóa học</p>
      <div className="flex justify-center">
        <Rate onChange={setRate} value={rate} allowHalf />
      </div>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Viết bình luận của bạn..."
        className="p-5 border border-border-gray rounded-xl w-full scroll-hidden"
      />
      <button
        onClick={handleSubmitRate}
        disabled={loading}
        className="disabled:cursor-not-allowed w-full mt-5 px-5 mr-auto text-white bg-primary py-3 rounded-lg font-semibold flex items-center justify-center h-[48px]"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-b-transparent animate-spin rounded-full" />
        ) : (
          "Đánh giá"
        )}
      </button>
    </div>
  );
};
