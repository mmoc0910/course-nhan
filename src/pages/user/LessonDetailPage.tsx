import { Link } from "react-router-dom";
import Logo from "../../components/logo/Logo";
import LessonMenuSideBar from "../../components/lesson/lesson-menu-sidebar/LessonMenuSideBar";
import { useEffect, useRef } from "react";
import { Tab } from "../../components/tab/Tab";
import TabContent from "../../components/tab/TabContent";
import InfomationTab from "../../components/lesson/lesson-tabs/info-tab/InfomationTab";
import { CommentTab } from "../../components/lesson/lesson-tabs/comment-tab/CommentTab";
import { TestTab } from "../../components/lesson/lesson-tabs/test-tab/TestTab";
import DocumentTab from "../../components/lesson/lesson-tabs/document-tabs/DocumentTab";

const tabs = [
  { key: "info", title: "Thông tin" },
  { key: "document", title: "Tài liệu" },
  { key: "test", title: "Bài kiểm tra" },
  { key: "comment", title: "Bình luận" },
];
const LessonDetailPage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (headerRef.current && contentRef.current) {
      const windowHeight = window.innerHeight;
      const headerHeight = headerRef.current.clientHeight;
      contentRef.current.style.height = `${windowHeight - headerHeight}px`;
    }
  }, []);
  return (
    <div className="h-screen overflow-hidden">
      <div className="grid grid-cols-10 h-[80px]" ref={headerRef}>
        <div className="px-7 col-span-3 bg-[#f8f9ff] flex items-center">
          <p className="font-bold text-lg text-secondary">Nội dung bài học</p>
        </div>
        <div className="px-20 flex items-center justify-between bg-white col-span-7">
          <Logo className="text-secondary" />
          <Link to={"/"} className="flex items-center gap-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fill-secondary20"
              >
                <path d="M315.4 15.5C309.7 5.9 299.2 0 288 0s-21.7 5.9-27.4 15.5l-96 160c-5.9 9.9-6.1 22.2-.4 32.2s16.3 16.2 27.8 16.2H384c11.5 0 22.2-6.2 27.8-16.2s5.5-22.3-.4-32.2l-96-160zM288 312V456c0 22.1 17.9 40 40 40H472c22.1 0 40-17.9 40-40V312c0-22.1-17.9-40-40-40H328c-22.1 0-40 17.9-40 40zM128 512a128 128 0 1 0 0-256 128 128 0 1 0 0 256z" />
              </svg>
            </span>
            <p className="font-medium text-lg">Trở về dashboard</p>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-10" ref={contentRef}>
        <div className="col-span-3 overflow-scroll scroll-hidden">
          <LessonMenuSideBar />
        </div>
        <div
          className="col-span-7 overflow-scroll scroll-hidden"
        >
          <div className="px-20">
            <Tab tabs={tabs}>
              <TabContent>
                <InfomationTab />
              </TabContent>
              <TabContent>
                <DocumentTab />
              </TabContent>
              <TabContent>
                <TestTab />
              </TabContent>
              <TabContent>
                <CommentTab />
              </TabContent>
            </Tab>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailPage;
