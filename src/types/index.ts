export type AuthType = {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: 1 | 2 | 3 | 4; //1:student 2:parent 3:teacher 4:admin
  children: [];
  status: 0 | 1;
  enable: 0 | 1;
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
  certificate?: string;
  description?: string;
};

export interface Category {
  id: number;
  title: string;
  childrens?: Category[];
}

export type CourseType = {
  _id: string;
  rank: number;
  class: number;
  title: string;
  description: string;
  poster: string;
  price: number;
  rose: number;
  status: 0 | 1;
  approve: 0 | 1 | 2 | 3; // 1: approve 0:reject 2:pending 3:notsubmit
  teacher: AuthType;
  createdAt: Date;
  updatedAt: Date;
  subject: number;
  listLesson?: LessonType[];
};
export type CourseDetailType = {
  _id: string;
  rank: number;
  class: number;
  title: string;
  description: string;
  poster: string;
  price: number;
  rose: number;
  status: 0 | 1;
  approve: 0 | 1 | 2 | 3; // 1: approve 0:reject 2:pending 3:notsubmit
  teacher: AuthType;
  createdAt: Date;
  updatedAt: Date;
  subject: number;
  listLesson?: LessonType[];
};

export type DocumentType = { title: string; url: string };

export type LessonType = {
  _id: string;
  order: number;
  title: string;
  description: string;
  video: string;
  pdf: string;
  course: string;
  createdAt: Date;
  updatedAt: Date;
  test: TestType | undefined;
};

export type TestType = {
  _id: string;
  duration: number;
  title: string;
  qa: string;
  lesson: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IntroduceType = {
  avatarURL?: string;
  introduce?: string;
};
