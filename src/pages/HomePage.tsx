import HomeBanner from "../components/banners/HomeBanner";
import CourseList from "../components/home/CourseList";
import Satify from "../components/home/Satify";
import MenuSidebar from "../components/sidebar/MenuSidebar";

const HomePage = () => {
  return (
    <div className="">
      <div className="container grid grid-cols-10 gap-5">
        <div className="col-span-3">
          <MenuSidebar />
        </div>
        <div className="col-span-5">
          <HomeBanner />
        </div>
        <div className="col-span-2">
          <img
            className="w-full h-full object-cover rounded-xl"
            src="https://images.unsplash.com/photo-1516381548400-349d680edb56?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>
      <Satify />
      <CourseList heading="Tiểu học" />
      <CourseList heading="Trung học cơ sở" />
      <CourseList heading="Trung học phổ thông" />
    </div>
  );
};

export default HomePage;
