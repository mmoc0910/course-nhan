import { useEffect, useState } from "react";
import Heading from "../../components/common/Heading";
import { SubType } from "../../types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { Link, useParams } from "react-router-dom";
import CourseCard from "../../components/my-class/CourseCard";

const ChildrenClassPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const { childrenId } = useParams();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [myClass, setMyClass] = useState<SubType[]>([]);
  useEffect(() => {
    (async () => {
      if (auth)
        try {
          const result = await axiosPrivate.get<SubType[]>(
            `/subs?student=${childrenId}`
          );
          setMyClass(result.data);
        } catch (error) {
          console.log(error);
        }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container mt-5">
      <Heading>Danh sách khóa học của con</Heading>
      {/* <p className="mt-2 text-lg font-medium">
        Khóa học, tài liệu mà bạn đăng ký sẽ được hiển thị dưới đây
      </p> */}
      {myClass.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-10">
          {myClass.map((item) => {
            return <CourseCard key={item._id} item={item} childrenId={childrenId} />;
          })}
        </div>
      ) : (
        <p className="mt-20 text-center">
          Bạn chưa đăng ký khóa học nào cho con! {" "}
          <Link to={"/"} className="text-primary underline font-semibold">
            Tìm khóa học
          </Link>
        </p>
      )}
    </div>
  );
};

export default ChildrenClassPage;
