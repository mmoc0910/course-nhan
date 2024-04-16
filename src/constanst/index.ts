import dayjs from "dayjs";
import { Category } from "../types";
export const DAY_FORMAT = (date: Date) =>
  dayjs(date).format("DD-MM-YYYY HH:mm");
export const listCategory: Category[] = [
  {
    id: 1,
    title: "Tiểu học",
    childrens: [
      {
        id: 2,
        title: "Lớp 1",
        childrens: [
          { id: 3, title: "Toán học" },
          { id: 4, title: "Tiếng việt" },
        ],
      },
      {
        id: 5,
        title: "Lớp 2",
        childrens: [
          { id: 6, title: "Toán học" },
          { id: 7, title: "Tiếng việt" },
        ],
      },
      {
        id: 8,
        title: "Lớp 3",
        childrens: [
          { id: 9, title: "Toán học" },
          { id: 10, title: "Tiếng việt" },
          { id: 11, title: "Tiếng anh" },
        ],
      },
      {
        id: 12,
        title: "Lớp 4",
        childrens: [
          { id: 13, title: "Toán học" },
          { id: 14, title: "Tiếng việt" },
          { id: 15, title: "Tiếng anh" },
        ],
      },
      {
        id: 16,
        title: "Lớp 5",
        childrens: [
          { id: 17, title: "Toán học" },
          { id: 18, title: "Tiếng việt" },
          { id: 19, title: "Tiếng anh" },
        ],
      },
    ],
  },
  {
    id: 20,
    title: "Trung học cơ sở",
    childrens: [
      {
        id: 21,
        title: "Lớp 6",
        childrens: [
          { id: 22, title: "Ngữ Văn" },
          { id: 23, title: "Toán" },
          { id: 24, title: "Tiếng Anh" },
          { id: 25, title: "Khoa học - tự nhiên" },
          { id: 26, title: "Lịch sử - địa lý" },
          { id: 27, title: "Tin học" },
        ],
      },
      {
        id: 28,
        title: "Lớp 7",
        childrens: [
          { id: 29, title: "Ngữ Văn" },
          { id: 30, title: "Toán" },
          { id: 31, title: "Tiếng Anh" },
          { id: 32, title: "Khoa học - tự nhiên" },
          { id: 33, title: "Lịch sử - địa lý" },
          { id: 34, title: "Tin học" },
        ],
      },
      {
        id: 35,
        title: "Lớp 8",
        childrens: [
          { id: 36, title: "Ngữ Văn" },
          { id: 37, title: "Toán" },
          { id: 38, title: "Tiếng Anh" },
          { id: 39, title: "Khoa học - tự nhiên" },
          { id: 40, title: "Lịch sử - địa lý" },
          { id: 41, title: "Tin học" },
        ],
      },
      {
        id: 42,
        title: "Lớp 9",
        childrens: [
          { id: 43, title: "Ngữ Văn" },
          { id: 43, title: "Toán" },
          { id: 44, title: "Tiếng Anh" },
          { id: 45, title: "Khoa học - tự nhiên" },
          { id: 46, title: "Lịch sử - địa lý" },
          { id: 47, title: "Tin học" },
        ],
      },
    ],
  },
  {
    id: 48,
    title: "Trung học phổ thông",
    childrens: [
      {
        id: 49,
        title: "Lớp 10",
        childrens: [
          { id: 50, title: "Ngữ Văn" },
          { id: 51, title: "Toán" },
          { id: 52, title: "Tiếng Anh" },
          { id: 53, title: "Vật lý" },
          { id: 54, title: "Hóa học" },
          { id: 55, title: "Sinh học" },
          { id: 56, title: "Lịch sử" },
          { id: 57, title: "Địa lý" },
        ],
      },
      {
        id: 58,
        title: "Lớp 11",
        childrens: [
          { id: 59, title: "Ngữ Văn" },
          { id: 60, title: "Toán" },
          { id: 61, title: "Tiếng Anh" },
          { id: 62, title: "Vật lý" },
          { id: 63, title: "Hóa học" },
          { id: 64, title: "Sinh học" },
          { id: 65, title: "Lịch sử" },
          { id: 66, title: "Địa lý" },
        ],
      },
      {
        id: 67,
        title: "Lớp 12",
        childrens: [
          { id: 68, title: "Ngữ Văn" },
          { id: 69, title: "Toán" },
          { id: 70, title: "Tiếng Anh" },
          { id: 71, title: "Vật lý" },
          { id: 72, title: "Hóa học" },
          { id: 73, title: "Sinh học" },
          { id: 74, title: "Lịch sử" },
          { id: 75, title: "Địa lý" },
        ],
      },
    ],
  },
  // {
  //   id: 76,
  //   title: "Cao đẳng - Đại học",
  //   childrens: [
  //     { id: 78, title: "Toán cao cấp" },
  //     { id: 79, title: "Toiec" },
  //   ],
  // },
];

// export const listCategory: Category[] = [
//   {
//     id: 1,
//     title: "Tiểu học",
//     childrens: [
//       {
//         id: 2,
//         title: "Lớp 1",
//       },
//       {
//         id: 5,
//         title: "Lớp 2",
//       },
//       {
//         id: 8,
//         title: "Lớp 3",
//       },
//       {
//         id: 12,
//         title: "Lớp 4",
//       },
//       {
//         id: 16,
//         title: "Lớp 4",
//       },
//     ],
//   },
//   {
//     id: 20,
//     title: "Trung học cơ sở",
//     childrens: [
//       {
//         id: 21,
//         title: "Lớp 6",
//       },
//       {
//         id: 28,
//         title: "Lớp 7",
//       },
//       {
//         id: 35,
//         title: "Lớp 8",
//       },
//       {
//         id: 42,
//         title: "Lớp 9",
//       },
//     ],
//   },
//   {
//     id: 48,
//     title: "Trung học phổ thông",
//     childrens: [
//       {
//         id: 49,
//         title: "Lớp 10",
//       },
//       {
//         id: 58,
//         title: "Lớp 11",
//       },
//       {
//         id: 67,
//         title: "Lớp 12",
//       },
//     ],
//   },
//   // {
//   //   id: 76,
//   //   title: "Cao đẳng - Đại học",
//   //   childrens: [
//   //     { id: 78, title: "Toán cao cấp" },
//   //     { id: 79, title: "Toiec" },
//   //   ],
//   // },
// ];

const roles = [
  { role: 1, title: "Học sinh" },
  { role: 2, title: "Phụ huynh" },
  { role: 3, title: "Giáo viên" },
  { role: 4, title: "Admin" },
];

export const getCategoryById = (
  categories: Category[],
  id: number
): Category | undefined => {
  for (const category of categories) {
    if (category.id === id) {
      return category;
    }
    if (category.childrens) {
      const childCategory = getCategoryById(category.childrens, id);
      if (childCategory) {
        return childCategory;
      }
    }
  }
  return undefined;
};

export const getRoleLabel = (role: 1 | 2 | 3 | 4) => {
  return roles.find((i) => i.role === role)?.title;
};

export const countLevels = (category: Category): number => {
  if (!category.childrens || category.childrens.length === 0) {
    return 1; // Nếu không có mục con, trả về 1 cấp
  } else {
    // Nếu có mục con, tính số cấp của mỗi mục con và lấy cấp cao nhất
    const childrenLevels = category.childrens.map(countLevels);
    return Math.max(...childrenLevels) + 1;
  }
};

export const VND = new Intl.NumberFormat("vi-VN", {
  // style: "currency",
  currency: "VND",
});