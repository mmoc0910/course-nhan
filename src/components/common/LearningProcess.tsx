import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { RootState } from "../../store/configureStore";
import { FC, useEffect, useMemo, useState } from "react";
import { CourseType, LessonType, ResultLessonType } from "../../types";
import { Table, TableProps } from "antd";
import { DAY_FORMAT } from "../../constanst";

type LearningProcessProps = {
  course: CourseType;
  studentId: string;
  courseId: string;
};
const LearningProcess: FC<LearningProcessProps> = ({
  courseId,
  studentId,
  course,
}) => {
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
  const columns: TableProps<LessonType>["columns"] = useMemo(
    () => [
      {
        title: () => <p className="font-semibold font-primary">Tên bài học</p>,
        dataIndex: "name",
        key: "name",
        render: (_text, record) => (
          <p className="font-primary">{record.title}</p>
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
        render: (_, record) => {
          const data = listResultLesson.find(
            (item) => item.lesson._id === record._id
          );
          if (data)
            return (
              <p className="font-primary">
                {((data.totalCorrect) / data.totalQuestion * 100).toFixed(1)}%
              </p>
            );
          return <p className="font-primary">Chưa làm</p>;
        },
      },
      {
        title: () => <p className="font-semibold font-primary">Ngày làm</p>,
        dataIndex: "createdAt",
        key: "createdAt",
        render: (_text, record) => {
          const data = listResultLesson.find(
            (item) => item.lesson._id === record._id
          );
          if (data)
            return <p className="font-primary">{DAY_FORMAT(data.updatedAt)}</p>;
          return;
        },
      },
    ],
    [listResultLesson]
  );
  return (
    <div className="rounded-xl border border-border-gray overflow-hidden mt-10">
      <Table
        dataSource={course.listLesson}
        columns={columns}
        pagination={{ pageSize: 10, hideOnSinglePage: true }}
      />
    </div>
  );
};

export default LearningProcess;
