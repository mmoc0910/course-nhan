import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthType } from "../../types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Table, TableProps, Tag } from "antd";
import { DAY_FORMAT } from "../../constanst";
import { toast } from "react-toastify";
import classNames from "../../utils/classNames";
import { useDispatch } from "react-redux";
import { setBreadcumb } from "../../store/breadcumb/breadcumbSlice";

const StudentAdminPage = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState<boolean>(false);
  const [teachers, setTeacher] = useState<AuthType[]>([]);
  useEffect(() => {
    dispatch(setBreadcumb([{ title: "Học viên", url: "/admin/students" }]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchData = async () => {
    try {
      const result = await axiosPrivate.get<AuthType[]>(
        `/users?role=1&status=1`
      );
      setTeacher(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateEnableAccount = useCallback(
    async (_id: string, enable: boolean) => {
      try {
        setLoading(true);
        await axiosPrivate.patch(`/users/blockAccount/${_id}`, { enable: enable ? 1 : 0 });
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
        title: () => <p className="font-semibold font-primary">Tên học viên</p>,
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
            {record.enable === 0 ? (
              <Tag color="pink">Disable</Tag>
            ) : (
              <Tag color="blue">Enable</Tag>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <div className="rounded-xl border border-border-gray overflow-hidden">
      <Table
        dataSource={teachers}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
};

export default StudentAdminPage;
