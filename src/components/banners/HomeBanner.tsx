import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HomeBanner = () => {
  return (
    <Swiper
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={true}
      modules={[Pagination, Autoplay]}
      className="mySwiper rounded-xl"
    >
      <SwiperSlide>
        <div className="w-full aspect-video rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full aspect-video rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full aspect-video rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HomeBanner;
