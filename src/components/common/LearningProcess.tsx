import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { RootState } from "../../store/configureStore";
import { FC, useEffect, useMemo, useState } from "react";
import { ResultLessonType } from "../../types";
import { Table, TableProps } from "antd";
import { DAY_FORMAT } from "../../constanst";

type LearningProcessProps = {
  studentId: string;
  courseId: string;
};
const LearningProcess: FC<LearningProcessProps> = ({ courseId, studentId }) => {
  console.log("studentId dd - ", studentId);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [listResultLesson, setListResultLesson] = useState<ResultLessonType[]>(
    []
  );
  console.log("listResultLesson - ", listResultLesson);
  useEffect(() => {
    (async () => {
      if (auth)
        try {
          const result = await axiosPrivate.get<ResultLessonType[]>(
            `/results?student=${studentId}&course=${courseId}`
          );
          setListResultLesson(result.data);
        } catch (error) {
          console.log(error);
        }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns: TableProps<ResultLessonType>["columns"] = useMemo(
    () => [
      {
        title: () => <p className="font-semibold font-primary">Tên bài học</p>,
        dataIndex: "name",
        key: "name",
        render: (_text, record) => (
          <p className="font-primary">{record.lesson.title}</p>
        ),
      },
      // {
      //   title: () => (
      //     <p className="font-semibold font-primary">Tên bài kiểm tra</p>
      //   ),
      //   dataIndex: "testName",
      //   key: "testName",
      //   render: (_, record) => (
      //     <p className="font-primary">{record.test.title}</p>
      //   ),
      // },
      // {
      //   title: () => <p className="font-semibold font-primary">Thời gian</p>,
      //   dataIndex: "duration",
      //   key: "duration",
      //   render: (_, record) => (
      //     <p className="font-primary">{record.test.duration}Phút</p>
      //   ),
      // },
      {
        title: () => <p className="font-semibold font-primary">Điểm</p>,
        dataIndex: "score",
        key: "score",
        render: (_, record) => (
          <p className="font-primary">
            {((record.totalCorrect * 10) / record.totalQuestion).toFixed(1)}
          </p>
        ),
      },
      {
        title: () => <p className="font-semibold font-primary">Ngày làm</p>,
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text) => <p className="font-primary">{DAY_FORMAT(text)}</p>,
      },
    ],
    []
  );
  if (listResultLesson.length > 0)
    return (
      <div className="rounded-xl border border-border-gray overflow-hidden mt-10">
        <Table dataSource={listResultLesson} columns={columns} pagination={{pageSize: 10, hideOnSinglePage: true}} />
      </div>
    );
  return (
    <p className="text-center px-5 text-secondary">
      Chưa có điểm quá trình được ghi nhận
    </p>
  );
};

export default LearningProcess;
