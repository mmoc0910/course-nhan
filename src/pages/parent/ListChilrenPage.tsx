import { Link } from "react-router-dom";
import Heading from "../../components/common/Heading";
import { Table, TableProps } from "antd";
import { AuthType } from "../../types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RootState } from "../../store/configureStore";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { DAY_FORMAT } from "../../constanst";

const ListChilrenPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [listChild, setListChild] = useState<AuthType[]>([]);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchData = useCallback(async () => {
    if (auth)
      try {
        setLoading(true);
        const result = await axiosPrivate.get<AuthType>(`/users/${auth._id}`);
        setListChild(result.data.children);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns: TableProps<AuthType>["columns"] = useMemo(
    () => [
      {
        title: () => <p className="font-semibold font-primary">Họ và tên</p>,
        dataIndex: "name",
        key: "name",
        render: (text) => (
          <p
            className="font-primary"
          >
            {text}
          </p>
        ),
      },
      {
        title: () => (
          <p className="font-semibold font-primary">Tên đăng nhập</p>
        ),
        dataIndex: "username",
        key: "username",
        render: (text) => <p className="font-primary">{text}</p>,
      },
      {
        title: () => <p className="font-semibold font-primary">Email</p>,
        dataIndex: "email",
        key: "email",
        render: (text) => <p className="font-primary">{text}</p>,
      },
      {
        title: () => <p className="font-semibold font-primary">Ngày đăng ký</p>,
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text) => <p className="font-primary">{DAY_FORMAT(text)}</p>,
      },
      {
        title: () => <p className="font-semibold font-primary"></p>,
        dataIndex: "action",
        key: "action",
        render: (_, record) => (
          <Link
            to={`/children/${record._id}`}
            className="px-4 py-2 rounded-lg bg-primary20 text-white font-medium hover:text-white hover:bg-primary40"
          >
            Xem quá trình học
          </Link>
        ),
      },
    ],
    []
  );
  return (
    <div className="container space-y-10 mt-10">
      <Heading>Danh sách con của bạn</Heading>
      <div className="rounded-xl border border-border-gray overflow-hidden">
        <Table dataSource={listChild} columns={columns} loading={loading} />
      </div>
    </div>
  );
};

export default ListChilrenPage;
