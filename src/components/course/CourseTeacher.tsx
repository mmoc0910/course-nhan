import { Link } from "react-router-dom";
import { FC } from "react";

type CourseTeacherProps = { teacher: string };
const CourseTeacher: FC<CourseTeacherProps> = ({ teacher }) => {
  console.log("teacher - ", teacher);
  return (
    <div className="grid grid-cols-10 gap-10 pt-10">
      <div className="col-span-4 flex justify-center">
        <img
          src={
            "https://images.unsplash.com/photo-1712068968581-ed69e8f4a5ea?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="w-[70%] aspect-square rounded-full object-cover"
        />
      </div>
      <div className="col-span-6">
        <p className="text-2xl">
          Giáo viên:{" "}
          <Link to={"/"} className="font-semibold text-primary">
            Nguyen Van A
          </Link>
        </p>
        <p className="mt-5 text-lg">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero vel
          nulla itaque debitis nam! Aperiam nobis cum natus veniam sunt,
          voluptas nisi rerum laborum blanditiis minus, saepe, adipisci
          similique necessitatibus repellat deleniti ad consectetur molestiae
          sit minima sint quisquam tempora deserunt eligendi officia. Error
          magnam modi obcaecati praesentium? Error inventore aliquid corrupti
          molestiae, quos doloremque nulla dolorum expedita culpa rerum vero
          reiciendis deserunt assumenda voluptate laborum nihil, possimus soluta
          harum, illum dolore! Facere, veritatis tempore asperiores dicta, quis
          ipsam aliquid dolore excepturi voluptate magnam perspiciatis earum
          nobis iusto esse incidunt officia accusantium facilis non quos minima
          ducimus aperiam. Cum, nam.
        </p>
      </div>
    </div>
  );
};

export default CourseTeacher;
