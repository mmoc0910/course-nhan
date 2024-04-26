import { useCallback, useEffect, useMemo, useState } from "react";
import { CourseType } from "../../types";
import { api } from "../../api";
import { Table, TableProps, Tag } from "antd";
import { Link } from "react-router-dom";
import {
  DAY_FORMAT,
  VND,
  getCategoryById,
  listCategory,
} from "../../constanst";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setBreadcumb } from "../../store/breadcumb/breadcumbSlice";

const ApproveCourseAdmin = () => {  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<CourseType[]>([]);  useEffect(() => {
    dispatch(setBreadcumb([{ title: "Phê duyệt khóa học", url: "/admin/approve-courses" }]));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await api.get<CourseType[]>("/courses?approve=2");
      setCourses(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  const handleUpdateApproveCourse = useCallback(
    async (_id: string, approve: 0 | 1) => {
      try {
        setLoading(true);
        await axiosPrivate.patch(`/courses/${_id}`, { approve });
        fetchData();
        toast("Success");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const columns: TableProps<CourseType>["columns"] = useMemo(
    () => [
      {
        width: 200,
        title: () => <p className="font-semibold font-primary">Tên khóa học</p>,
        dataIndex: "title",
        key: "title",
        render: (text) => <p className="font-primary">{text}</p>,
      },
      {
        title: () => <p className="font-semibold font-primary">Giá</p>,
        dataIndex: "price",
        key: "price",
        render: (text) => (
          <p className="font-primary">{VND.format(text)}USD</p>
        ),
      },
      {
        title: () => <p className="font-semibold font-primary">Hoa hồng</p>,
        dataIndex: "rose",
        key: "rose",
        render: (text) => <p className="font-primary">{text}%</p>,
      },
      {
        title: () => <p className="font-semibold font-primary">Danh mục</p>,
        key: "category",
        render: (_, record) => (
          <p className="font-primary">
            {getCategoryById(listCategory, record.rank)?.title} {" / "}
            {getCategoryById(listCategory, record.class)?.title} {" / "}
            {getCategoryById(listCategory, record.subject)?.title}
          </p>
        ),
      },
      {
        title: () => <p className="font-semibold font-primary">Giáo viên</p>,
        key: "teacher",
        render: (_, record) => (
          <p className="font-primary">{record.teacher.name}</p>
        ),
      },
      {
        title: () => <p className="font-semibold font-primary">Chi tiết</p>,
        key: "_id",
        dataIndex: "_id",
        render: (text) => (
          <Link
            target="_blank"
            to={`/course/${text}`}
            className="font-primary text-primary hover:underline"
          >
            Click here
          </Link>
        ),
      },
      {
        title: () => <p className="font-semibold font-primary">Trạng thái</p>,
        key: "approve",
        dataIndex: "approve",
        render: (text: 0 | 1 | 2) => (
          <div className="font-primary">
            {text === 0 ? (
              <Tag color="red">Đã hủy</Tag>
            ) : text === 1 ? (
              <Tag color="green">Đã phê duyệt</Tag>
            ) : text === 2 ? (
              <Tag color="pink-inverse">Chờ phê duyệt</Tag>
            ) : (
              ""
            )}
          </div>
        ),
      },
      {
        title: () => <p className="font-semibold font-primary">Tạo ngày</p>,
        key: "createdAt",
        dataIndex: "createdAt",
        render: (text) => <p className="font-primary">{DAY_FORMAT(text)}</p>,
      },
      {
        title: () => <p className="font-semibold font-primary"></p>,
        key: "approve",
        dataIndex: "approve",
        render: (text: 0 | 1 | 2, record) => (
          <div className="font-primary flex items-center gap-2">
            {text === 2 ? (
              <>
                <button
                  onClick={() => handleUpdateApproveCourse(record._id, 1)}
                  type="button"
                  className="px-2 py-1 rounded-lg font-semibold text-white bg-primary20"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleUpdateApproveCourse(record._id, 0)}
                  type="button"
                  className="px-2 py-1 rounded-lg font-semibold text-white bg-secondary20"
                >
                  Reject
                </button>
              </>
            ) : null}
          </div>
        ),
      },
    ],
    [handleUpdateApproveCourse]
  );
  return (
    <div className="rounded-xl border border-border-gray overflow-hidden">
      <Table dataSource={courses} columns={columns} loading={loading} />
    </div>
  );
};

export default ApproveCourseAdmin;
