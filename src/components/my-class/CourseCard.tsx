import { FC, useEffect, useState } from "react";
import { LessonType, SubType } from "../../types";
import AuthorClass from "./AuthorClass";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

type CourseCardProps = { item: SubType; childrenId?: string };
const CourseCard: FC<CourseCardProps> = ({ item, childrenId }) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [firstLessonId, setFirstLessonId] = useState<string>();
  useEffect(() => {
    (async () => {
      if (auth)
        try {
          const result = await axiosPrivate.get<LessonType[]>(
            `/lessons?course=${item.course._id}`
          );
          if (result.data.length > 0) setFirstLessonId(result.data[0]._id);
        } catch (error) {
          console.log(error);
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (firstLessonId && auth)
    return (
      <Link
        to={
          !childrenId
            ? `/course/${item.course._id}/lesson/${firstLessonId}`
            : `/student/${childrenId}/course/${item.course._id}/lesson/${firstLessonId}`
        }
        className="flex items-stretch rounded-xl gap-5"
        style={{ boxShadow: "rgba(153, 196, 227, 0.35) 0px 4px 10px" }}
      >
        <img
          className="w-44 h-44 object-cover rounded-xl shrink-0"
          src={item.course.poster}
        />
        <div className="flex flex-col justify-between p-5">
          <p className="text-xl font-semibold line-clamp-2">
            {item.course.title}
          </p>
          <AuthorClass authorId={String(item.course.teacher)} />
        </div>
      </Link>
    );
  return;
};

export default CourseCard;
