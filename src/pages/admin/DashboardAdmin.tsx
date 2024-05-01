import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { VND } from "../../constanst";
import { useDispatch } from "react-redux";
import { setBreadcumb } from "../../store/breadcumb/breadcumbSlice";

type SatifyAdminType = {
  numberCourse: number;
  numberStudent: number;
  numberParent: number;
  numberTeacher: number;
  totalFreeTeacher: number;
  totalFreeAdmin: number;
};
const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [satify, setSatify] = useState<SatifyAdminType>();
  useEffect(() => {
    dispatch(setBreadcumb([{ title: "Dashboard", url: "/admin/dashboard" }]));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const result = await axiosPrivate.get<SatifyAdminType>(
          "/satisfy/admin"
        );
        setSatify(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (satify)
    return (
      <div className="grid grid-cols-3 gap-5">
        <div className="border border-border-gray rounded-xl p-5 space-y-5">
          <p className="text-2xl font-semibold">Tổng giáo viên</p>
          <p className="text-3xl font-bold">{satify.numberTeacher}</p>
        </div>
        <div className="border border-border-gray rounded-xl p-5 space-y-5">
          <p className="text-2xl font-semibold">Tổng học viên</p>
          <p className="text-3xl font-bold">{satify.numberStudent}</p>
        </div>
        <div className="border border-border-gray rounded-xl p-5 space-y-5">
          <p className="text-2xl font-semibold">Tổng phụ huynh</p>
          <p className="text-3xl font-bold">{satify.numberParent}</p>
        </div>
        <div className="border border-border-gray rounded-xl p-5 space-y-5">
          <p className="text-2xl font-semibold">Tổng khóa học</p>
          <p className="text-3xl font-bold">{satify.numberCourse}</p>
        </div>
        <div className="border border-border-gray rounded-xl p-5 space-y-5">
          <p className="text-2xl font-semibold">Tổng tiền của giáo viên</p>
          <p className="text-3xl font-bold">
            {satify.totalFreeTeacher ? VND.format(satify.totalFreeTeacher) : 0} USD
          </p>
        </div>
        <div className="border border-border-gray rounded-xl p-5 space-y-5">
          <p className="text-2xl font-semibold">Tổng tiền của admin</p>
          <p className="text-3xl font-bold">
            {satify.totalFreeAdmin ? VND.format(satify.totalFreeAdmin) : 0} USD
          </p>
        </div>
      </div>
    );
  return;
};

export default DashboardAdmin;
