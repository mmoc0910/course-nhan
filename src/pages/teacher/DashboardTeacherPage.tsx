import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { VND } from "../../constanst";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { setBreadcumb } from "../../store/breadcumb/breadcumbSlice";

type SatifyAdminType = {
  numberCourse: number;
  numberStudent: number;
  totalFee: number;
};
const DashboardTeacherPage = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [satify, setSatify] = useState<SatifyAdminType>();
  const { auth } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(
      setBreadcumb([
        {
          title: "Dashboard",
          url: "/teacher/dashboard",
        },
      ])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    (async () => {
      if (auth)
        try {
          const result = await axiosPrivate.get<SatifyAdminType>(
            `/satisfy/teacher/${auth._id}`
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
          <p className="text-2xl font-semibold">Tổng khóa học</p>
          <p className="text-3xl font-bold">{satify.numberCourse}</p>
        </div>
        <div className="border border-border-gray rounded-xl p-5 space-y-5">
          <p className="text-2xl font-semibold">Tổng học viên</p>
          <p className="text-3xl font-bold">{satify.numberStudent}</p>
        </div>
        <div className="border border-border-gray rounded-xl p-5 space-y-5">
          <p className="text-2xl font-semibold">Tổng tiền của giáo viên</p>
          <p className="text-3xl font-bold">{satify.totalFee ? VND.format(satify.totalFee) : 0} USD</p>
        </div>
      </div>
    );
  return;
};

export default DashboardTeacherPage;
