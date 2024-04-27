import { Key, useCallback, useEffect, useMemo, useState } from "react";
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
import { useDispatch } from "react-redux";
import { setBreadcumb } from "../../store/breadcumb/breadcumbSlice";
import _ from 'lodash';

const CourseAdmin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<CourseType[]>([]);
  useEffect(() => {
    dispatch(setBreadcumb([{ title: "Khóa học", url: "/admin/courses" }]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await api.get<CourseType[]>("/courses");
      setCourses(
        _.orderBy(result.data.filter((item) => item.approve !== 3 && item.approve !== 2), ['updatedAt', 'desc'])
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
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
        render: (text) => <p className="font-primary">{VND.format(text)}USD</p>,
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
        title: () => <p className="font-semibold font-primary">Tạo ngày</p>,
        key: "createdAt",
        dataIndex: "createdAt",
        render: (text) => <p className="font-primary">{DAY_FORMAT(text)}</p>,
      },
      {
        title: () => <p className="font-semibold font-primary">Ngày phê duyệt</p>,
        key: "updatedAt",
        dataIndex: "updatedAt",
        render: (text) => <p className="font-primary">{DAY_FORMAT(text)}</p>,
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
            ) : (
              ""
            )}
          </div>
        ),
        filters: [
          {
            text: "Đã phê duyệt",
            value: 1,
          },
          {
            text: "Đã hủy",
            value: 0,
          },
        ],
        onFilter: (value: boolean | Key, record) => {
          if (typeof value === "boolean") {
            // Xử lý trường hợp value là boolean
            return record.approve === (value ? 1 : 0);
          } else {
            // Xử lý trường hợp value là Key (đối với trường hợp khi dùng dropdown filter)
            return record.approve === value;
          }
        },
      },
    ],
    []
  );
  return (
    <div className="rounded-xl border border-border-gray overflow-hidden">
      <Table dataSource={courses} columns={columns} loading={loading} />
    </div>
  );
};

export default CourseAdmin;
