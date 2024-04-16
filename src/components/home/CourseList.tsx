import { FC, useEffect, useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseItem from "../course/CourseItem";
import Heading from "../common/Heading";
import { CourseType } from "../../types";
import { api } from "../../api";
type CourseListProps = { heading?: string };
const CourseList: FC<CourseListProps> = ({ heading }) => {
  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);
  const [courses, setCourses] = useState<CourseType[]>([]);
  console.log("course - ", courses);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get<CourseType[]>(`/courses?approve=1`);
        console.log("result - ", result.data);
        setCourses(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container py-10 space-y-8">
      {heading ? <Heading>{heading}</Heading> : null}
      <Swiper
        className="mySwiper"
        slidesPerView={5}
        spaceBetween={10}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        navigation={{
          nextEl: navigationNextRef.current,
          prevEl: navigationPrevRef.current,
        }}
        onSwiper={(swiper) => {
          // Delay execution for the refs to be defined
          setTimeout(() => {
            // Override prevEl & nextEl now that refs are defined
            if (swiper.params.navigation instanceof Object) {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }

            // Re-init navigation
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
      >
        {courses.map((item) => (
          <SwiperSlide key={item._id}>
            <CourseItem course={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CourseList;
