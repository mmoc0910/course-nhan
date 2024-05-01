import { FC, useEffect, useState } from "react";
import { RateType } from "../../types";
import RateItem from "./RateItem";
import { Rate } from "antd";
import { api } from "../../api";

type RateCourseProps = { courseId: string };
const RateCourse: FC<RateCourseProps> = ({ courseId }) => {
  const [listRateCourse, setListRateCourse] = useState<RateType[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get<RateType[]>(
          `/rates/?course=${courseId}`
        );
        setListRateCourse(result.data);
      } catch (error) {
        console.log(error);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);
  const totalRate = listRateCourse.reduce(
    (total, value) => (total += value.vote),
    0
  );
  console.log("totalRate - ", totalRate);
  if (listRateCourse.length > 0)
    return (
      <div>
        <div className="flex items-center mb-5">
          <Rate allowHalf className="text-primary"
            defaultValue={(totalRate / listRateCourse.length)}
            disabled
          />
          <p className="text-xl font-medium">({listRateCourse.length} lượt đánh giá)</p>
        </div>
        {listRateCourse.map((item) => (
          <RateItem key={item._id} rate={item} />
        ))}
      </div>
    );
  return <p className="mt-10 text-center text-primary">Chưa có đánh giá nào</p>;
};

export default RateCourse;
