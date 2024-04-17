import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthType } from "../../types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Table, TableProps, Tag } from "antd";
import { Link } from "react-router-dom";
import { DAY_FORMAT } from "../../constanst";
import { toast } from "react-toastify";
import classNames from "../../utils/classNames";

const ApproveTeacher = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState<boolean>(false);
  const [teachers, setTeacher] = useState<AuthType[]>([]);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchData = async () => {
    try {
      const result = await axiosPrivate.get<AuthType[]>(
        `/users?role=3&status=0`
      );
      setTeacher(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleApproveAccount = useCallback(async (_id: string) => {
    try {
      setLoading(true);
      await axiosPrivate.get(`/users/approve-teacher/${_id}`);
      fetchData();
      toast("Approve account success");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleRejectAccount = useCallback(async (_id: string) => {
    try {
      setLoading(true);
      await axiosPrivate.get(`/users/reject-teacher/${_id}`);
      fetchData();
      toast("Reject account success");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleUpdateEnableAccount = useCallback(
    async (_id: string, enable: boolean) => {
      try {
        setLoading(true);
        await axiosPrivate.patch(`/users/${_id}`, { enable: enable ? 1 : 0 });
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
  const columns: TableProps<AuthType>["columns"] = useMemo(
    () => [
      {
        title: () => (
          <p className="font-semibold font-primary">Tên giáo viên</p>
        ),
        dataIndex: "name",
        key: "name",
        render: (text) => <p className="font-primary">{text}</p>,
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
        title: () => <p className="font-semibold font-primary">Chứng chỉ</p>,
        dataIndex: "certificate",
        key: "certificate",
        render: (text) => (
          <Link
            to={text}
            className="font-primary text-secondary"
            target="_blank"
          >
            Click here to view
          </Link>
        ),
      },
      {
        title: () => <p className="font-semibold font-primary">Ngày tạo</p>,
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text) => <p className="font-primary">{DAY_FORMAT(text)}</p>,
      },
      {
        title: () => <p className="font-semibold font-primary">Trạng thái</p>,
        dataIndex: "status",
        key: "status",
        render: (_, record) => (
          <div className="font-primary flex items-center gap-2">
            {record.status === 0 ? (
              <Tag color="red">InActive</Tag>
            ) : (
              <Tag color="green">Active</Tag>
            )}
            {record.enable === 0 ? (
              <Tag color="pink">disable</Tag>
            ) : (
              <Tag color="blue">enable</Tag>
            )}
          </div>
        ),
      },
      {
        title: () => <p className="font-semibold font-primary"></p>,
        dataIndex: "action",
        key: "action",
        render: (_, record) => (
          <div className="font-primary flex items-center gap-2">
            {record.status === 0 ? (
              <>
                <button
                  onClick={() => handleApproveAccount(record._id)}
                  type="button"
                  className="px-2 py-1 rounded-lg font-semibold text-white bg-secondary20"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleRejectAccount(record._id)}
                  type="button"
                  className="px-2 py-1 rounded-lg font-semibold text-white bg-error"
                >
                  Reject
                </button>
              </>
            ) : null}

            <button
              onClick={() =>
                handleUpdateEnableAccount(record._id, !record.enable)
              }
              type="button"
              className={classNames(
                "px-2 py-1 rounded-lg font-semibold text-white",
                record.enable ? "bg-error" : "bg-primary20"
              )}
            >
              {record.enable === 1 ? "Disable account" : "Enable account"}
            </button>
          </div>
        ),
      },
    ],
    [handleApproveAccount, handleRejectAccount, handleUpdateEnableAccount]
  );
  return (
    <div className="rounded-xl border border-border-gray overflow-hidden">
      <Table dataSource={teachers} columns={columns} loading={loading} />
    </div>
  );
};

export default ApproveTeacher;
