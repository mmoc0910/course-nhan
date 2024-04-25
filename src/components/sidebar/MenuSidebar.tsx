import { listCategory } from "../../constanst";
import { Category } from "../../types";
import MenuSideBarItem from "./MenuSideBarItem";
import { v4 as uuidv4 } from "uuid";

export interface MenuItem {
  title: string;
  childrens?: Category[];
}

const MenuSidebar = () => {
  return (
    <div className="shadow-lg rounded-md relative">
      <div className="flex items-center gap-5 px-5 py-3 bg-gray-soft rounded-tl-md rounded-tr-md">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-5 h-5 fill-black"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </span>
        <p className="font-medium">Các khóa học</p>
      </div>
      <ul className="">
        {listCategory.map((item) => (
          <MenuSideBarItem key={uuidv4()} menuItem={item} />
        ))}
      </ul>
    </div>
  );
};

export default MenuSidebar;
