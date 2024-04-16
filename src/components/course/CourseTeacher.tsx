import { Link } from "react-router-dom";
import { FC } from "react";
import { AuthType, IntroduceType } from "../../types";
import parse from "html-react-parser";

type CourseTeacherProps = { teacher: AuthType };
const CourseTeacher: FC<CourseTeacherProps> = ({ teacher }) => {
  console.log("teacher - ", teacher);
  const desc = teacher.description
    ? (JSON.parse(teacher.description) as IntroduceType)
    : undefined;
  return (
    <div className="grid grid-cols-10 gap-10 pt-10">
      <div className="col-span-4 flex justify-center">
        <img
          src={
            desc?.avatarURL
              ? desc.avatarURL
              : "https://images.unsplash.com/photo-1712068968581-ed69e8f4a5ea?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="w-[70%] aspect-square rounded-full object-cover"
        />
      </div>
      <div className="col-span-6">
        <p className="text-2xl">
          Giáo viên:{" "}
          <Link to={"/"} className="font-semibold text-primary">
            {teacher.name}
          </Link>
        </p>{" "}
        <div className="mt-5">
          {desc?.introduce ? parse(desc.introduce) : null}
        </div>
      </div>
    </div>
  );
};

export default CourseTeacher;
