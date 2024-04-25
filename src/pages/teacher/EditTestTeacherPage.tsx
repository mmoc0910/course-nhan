import { memo, useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Checkbox } from "../../components/checkbox";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import FormGroup from "../../components/common/FormGroup";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { TestType } from "../../types";
import { setBreadcumb } from "../../store/breadcumb/breadcumbSlice";
import { useDispatch } from "react-redux";

type QuestionType = {
  question: string;
  answer: string[];
  correct?: number | undefined;
};

const schema = yup
  .object({
    title: yup.string().required("Tiêu đề bài kiểm tra không được để trống"),
    duration: yup.number().required().positive().integer(),
  })
  .required();
const EditTestTeacherPage = () => {
  const dispatch = useDispatch();
  const { lessonId, courseId, testId } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  console.log("questions - ", questions);
  const { handleSubmit, control, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
   const titleWatch = watch('title');
  useEffect(() => {
    dispatch(
      setBreadcumb([
        {
          title: "Khóa học",
          url: "/teacher/courses",
        },
        {
          title: "Danh sách bài học",
          url: `/teacher/courses/lessons/${courseId}`,
        },
        {
          title: titleWatch,
          url: `/teacher/courses/${courseId}/lessons/${lessonId}/edit-test/${testId}`,
        },
      ])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleWatch]);
  useEffect(() => {
    if (testId) {
      (async () => {
        try {
          const result = await axiosPrivate.get<TestType>(`/tests/${testId}`);
          const { duration, title, qa } = result.data;
          setValue("title", title);
          setValue("duration", duration);
          setQuestions(JSON.parse(qa) as QuestionType[]);
        } catch (error) {
          console.log(error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId]);
  const onSubmit = async (data: { title: string; duration: number }) => {
    try {
      setLoading(true);
      console.log("data - ", data);
      const qa = questions.filter(
        (item) =>
          item.question &&
          item.correct !== undefined &&
          !item.answer.some((i) => i === "")
      );
      if (qa.length > 0) {
        await axiosPrivate.patch(`/tests/${testId}`, {
          ...data,
          lesson: lessonId,
          qa: JSON.stringify(qa),
        });
        toast("Chỉnh sửa thành công");
        navigate(`/teacher/courses/lessons/${courseId}`);
      } else {
        toast("Bạn chưa thêm câu hỏi nào");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteTest = async () => {
    try {
      await axiosPrivate.delete(`/tests/${testId}`);
      toast("Xóa bài test thành công");
      navigate(`/teacher/courses/lessons/${courseId}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateQuestions = useCallback(
    (
      index: number,
      question: string,
      answer: string[],
      correct: number | undefined
    ) =>
      setQuestions((curQuestion) =>
        curQuestion.map((item, i) =>
          i === index
            ? { question: question, answer: answer, correct: correct }
            : item
        )
      ),
    []
  );
  const handleAddQuestion = useCallback(
    () =>
      setQuestions((prev) => [
        ...prev,
        {
          question: "",
          answer: ["", "", "", ""],
          correct: undefined,
        },
      ]),
    []
  );
  const handleDeleteQuestion = useCallback(
    (index: number) =>
      setQuestions((prev) => prev.filter((_, i) => i !== index)),
    []
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="grid grid-cols-2 gap-5 mb-5">
        <FormGroup>
          <Label htmlFor="title">Tiêu đề bài kiểm tra*</Label>
          <Input name="title" control={control} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="duration">Thời gian làm bài*</Label>
          <Input name="duration" control={control} type="number" min={0} />
        </FormGroup>
      </div>
      {questions.map((item, index) => (
        <QuestionItem
          key={uuidv4()}
          index={index}
          dquestion={item}
          updateQuestions={handleUpdateQuestions}
          addQuestion={handleAddQuestion}
          deleteQuestion={handleDeleteQuestion}
          totalQues={questions.length}
        />
      ))}
      <div className="mt-5 col-span-3 grid grid-cols-2 gap-5">
        <button
          onClick={handleDeleteTest}
          type="button"
          className="w-full text-white bg-error py-3 rounded-lg font-semibold flex items-center justify-center h-[48px]"
        >
          Xóa bài kiểm tra
        </button>
        <button
          disabled={loading}
          className="disabled:cursor-not-allowed w-full text-white bg-primary py-3 rounded-lg font-semibold flex items-center justify-center h-[48px]"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-b-transparent animate-spin rounded-full" />
          ) : (
            "Chỉnh sửa bài kiểm tra"
          )}
        </button>
      </div>
    </form>
  );
};

const QuestionItem = memo(
  ({
    index,
    dquestion,
    updateQuestions,
    addQuestion,
    deleteQuestion,
    totalQues,
  }: {
    index: number;
    dquestion: QuestionType;
    totalQues: number;
    updateQuestions: (
      index: number,
      question: string,
      answer: string[],
      correct: number | undefined
    ) => void;
    addQuestion: () => void;
    deleteQuestion: (index: number) => void;
  }) => {
    const [correct, setCorrect] = useState<number | undefined>(
      dquestion.correct
    );
    const [question, setQuestion] = useState<string>(dquestion.question);
    const [answer, setAnswer] = useState<string[]>(dquestion.answer);
    //   console.log("data - ", correct, question, answer);
    // useEffect(() => {
    //   updateQuestions(index, question, answer, correct);
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    return (
      <div className="px-5 py-2 rounded-xl border border-border-gray space-y-2">
        <div className="flex items-center gap-5">
          <p className="shrink-0">Câu hỏi {index + 1}</p>
          <input
            placeholder="Câu hỏi 1"
            className="focus:border-primary text-black font-medium placeholder:text-text4 py-3 px-[25px] rounded-[10px] border border-solid w-full bg-inherit peer outline-none border-strock"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-2">
          {answer.map((item, index) => (
            <div className="flex items-center gap-3">
              <Checkbox
                checked={correct === index}
                onClick={() => setCorrect(index)}
              />
              <input
                placeholder={`Câu trả lời ${index + 1}`}
                className="focus:border-primary text-black font-medium placeholder:text-text4 py-3 px-[25px] rounded-[10px] border border-solid w-full bg-inherit peer outline-none border-strock"
                type="text"
                value={item}
                onChange={(e) =>
                  setAnswer((prev) =>
                    [...prev].map((it, ii) =>
                      ii === index ? e.target.value : it
                    )
                  )
                }
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 w-1/5">
          <button
            type="button"
            className="col-span-2 w-full text-white bg-error py-2 text-sm rounded-lg font-semibold flex items-center justify-center"
            onClick={() => {
              if (totalQues == 1) addQuestion();
              deleteQuestion(index);
            }}
          >
            Xóa
          </button>
          <button
            type="button"
            className="col-span-2 w-full text-white bg-primary py-2 text-sm rounded-lg font-semibold flex items-center justify-center"
            onClick={() => {
              if (
                question &&
                correct !== undefined &&
                !answer.some((i) => i === "")
              ) {
                updateQuestions(index, question, answer, correct);
                if (index + 1 === totalQues) addQuestion();
              } else {
                toast("Bạn chưa điền đầy đủ thông tin câu hỏi");
              }
            }}
          >
            Apply
          </button>
        </div>
      </div>
    );
  }
);

export default EditTestTeacherPage;
