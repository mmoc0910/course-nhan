import { LessonMenuSidebarItem } from "./LessonMenuSidebarItem";
const menus = [
  {
    title: "Chương 1: Giới thiệu khóa học",
    childrens: [
      { title: "Intro (Nhớ đọc mô tả quan trọng)", haveLearned: true },
      { title: "Cài đặt vscode extensions và settings", haveLearned: true },
      { title: "Cài đặt NodeJS và Git scm", haveLearned: true },
      { title: "Cách đạt hiệu quả cao khi học khóa học", haveLearned: true },
      {
        title: "Cài đặt react dev tools và redux dev tools",
        haveLearned: false,
      },
      { title: "Giới thiệu outline khóa học", haveLearned: false },
    ],
  },
  {
    title: "Chương 2: React cơ bản",
    childrens: [
      { title: "Intro (Nhớ đọc mô tả quan trọng)", haveLearned: true },
      { title: "Cài đặt vscode extensions và settings", haveLearned: true },
      { title: "Cài đặt NodeJS và Git scm", haveLearned: true },
      { title: "Cách đạt hiệu quả cao khi học khóa học", haveLearned: true },
      {
        title: "Cài đặt react dev tools và redux dev tools",
        haveLearned: false,
      },
      { title: "Giới thiệu outline khóa học", haveLearned: false },
    ],
  },
  { title: "Chương 3: Tìm hiểu react hook useState" },
  { title: "Chương 4: Styling trong React" },
  { title: "Chương 5: Tìm hiểu React hook useEffect" },
  { title: "Chương 5: Tìm hiểu React hook useEffect" },
  { title: "Chương 5: Tìm hiểu React hook useEffect" },
  { title: "Chương 5: Tìm hiểu React hook useEffect" },
  { title: "Chương 5: Tìm hiểu React hook useEffect" },
  { title: "Chương 5: Tìm hiểu React hook useEffect" },
  { title: "Chương 5: Tìm hiểu React hook useEffect" },
  { title: "Chương 5: Tìm hiểu React hook useEffect" },
];
const LessonMenuSideBar = () => {
  return (
    <ul>
      {menus.map((item, index) => (
        <LessonMenuSidebarItem key={index} item={item} />
      ))}
    </ul>
  );
};

export default LessonMenuSideBar;
