import { FC, useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseItem from "../course/CourseItem";
import Heading from "../common/Heading";
import { CourseType } from "../../types";
type CourseListProps = { heading?: string; courses: CourseType[] };
const CourseList: FC<CourseListProps> = ({ heading, courses }) => {
  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);
  if (courses.length > 0)
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
  return;
};

export default CourseList;
