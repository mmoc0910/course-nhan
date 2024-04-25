import { useState } from "react";
import classNames from "../../utils/classNames";
import { MenuItem } from "./MenuSidebar";
import { v4 as uuidv4 } from "uuid";
import { Link, NavLink } from "react-router-dom";
import { Category } from "../../types";

const MenuSideBarItem = ({ menuItem }: { menuItem: Category }) => {
  return (
    <li className="hover:bg-gray-soft transition-all duration-200 cursor-pointer group">
      <div
        className={classNames(
          "relative flex items-center gap-5 px-5 py-4",
          menuItem.childrens
            ? " before:absolute before:right-0 before:invisible before:opacity-0 before:group-hover:visible before:group-hover:opacity-100 before:transition-all before:duration-300 before:content-[''] before:border-[10px] before:border-r-primary before:border-transparent"
            : ""
        )}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-4 h-4 fill-icon-color group-hover:fill-primary transition-all duration-300"
          >
            <path d="M219.3 .5c3.1-.6 6.3-.6 9.4 0l200 40C439.9 42.7 448 52.6 448 64s-8.1 21.3-19.3 23.5L352 102.9V160c0 70.7-57.3 128-128 128s-128-57.3-128-128V102.9L48 93.3v65.1l15.7 78.4c.9 4.7-.3 9.6-3.3 13.3s-7.6 5.9-12.4 5.9H16c-4.8 0-9.3-2.1-12.4-5.9s-4.3-8.6-3.3-13.3L16 158.4V86.6C6.5 83.3 0 74.3 0 64C0 52.6 8.1 42.7 19.3 40.5l200-40zM111.9 327.7c10.5-3.4 21.8 .4 29.4 8.5l71 75.5c6.3 6.7 17 6.7 23.3 0l71-75.5c7.6-8.1 18.9-11.9 29.4-8.5C401 348.6 448 409.4 448 481.3c0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-71.9 47-132.7 111.9-153.6z" />
          </svg>
        </span>
        {menuItem.childrens ? (
          <p className="group-hover:text-primary transition-all duration-300">
            {menuItem.title}
          </p>
        ) : (
          <Link
            to={`/category/${menuItem.id}`}
            className="group-hover:text-primary transition-all duration-300"
          >
            {menuItem.title}
          </Link>
        )}
      </div>
      {menuItem?.childrens ? (
        <MenuSideBarItemContent menuItem={menuItem.childrens} />
      ) : null}
    </li>
  );
};

const MenuSideBarItemContent = ({ menuItem }: { menuItem: MenuItem[] }) => {
  const [activeMenu, setActiveMenu] = useState<MenuItem>(menuItem[0]);
  return (
    <div className="absolute z-50 bg-lite border-l-4 border-primary top-0 left-full w-[calc(1300px-40px-100%)] min-h-full shadow-md rounded-tr-md rounded-br-md invisible opacity-0 group-hover:visible group-hover:opacity-100">
      <div className="flex items-center gap-2 px-3 pt-3 border-b border-b-strock">
        {menuItem.map((item) => (
          <div
            onClick={() => setActiveMenu(item)}
            key={uuidv4()}
            className={classNames(
              "relative flex justify-center font-medium uppercase p-4 pt-2 rounded-tr-md rounded-tl-md before:content-[''] before:absolute before:border-8 before:border-t-primary before:border-transparent before:top-full",
              activeMenu.title === item.title
                ? "bg-primary text-white before:visible before:opacity-100"
                : "before:invisible before:opacity-0 text-black"
            )}
          >
            {item.title}
          </div>
        ))}
      </div>
      <ul
        className={classNames(
          "p-10 pt-5",
          activeMenu.childrens &&
            activeMenu.childrens.every((i) => !i.childrens)
            ? "grid grid-cols-4 gap-1"
            : "space-y-5"
        )}
      >
        {activeMenu.childrens
          ? activeMenu.childrens.map((item) => (
              <li className="" key={uuidv4()}>
                {item.childrens ? (
                  <p className="text-primary text-lg uppercase mb-2">
                    {item.title}
                  </p>
                ) : (
                  <NavLink
                    to={`/category/${item.id}`}
                    className={({ isActive }) =>
                      classNames(
                        "capitalize hover:text-primary transition-all duration-300 hover:underline hover:decoration-primary",
                        isActive ? "underline text-primary" : ""
                      )
                    }
                  >
                    {item.title}
                  </NavLink>
                )}

                {item.childrens ? (
                  <div
                    className={classNames(
                      item.childrens.some((item) => !item.childrens)
                        ? "grid grid-cols-4 gap-1"
                        : ""
                    )}
                  >
                    {item.childrens.map((i) => {
                      if (i.childrens)
                        return (
                          <div className="mb-5">
                            <p className="text-primary uppercase mb-2">
                              {i.title}
                            </p>
                            {i.childrens ? (
                              <div className="grid grid-cols-4 gap-1">
                                {i.childrens.map((o) => (
                                  <Link
                                    to={`/category/${o.id}`}
                                    key={uuidv4()}
                                    className="capitalize hover:text-primary transition-all duration-300 hover:underline hover:decoration-primary"
                                  >
                                    {o.title}
                                  </Link>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        );
                      return (
                        <Link
                          to={`/category/${i.id}`}
                          key={uuidv4()}
                          className="capitalize hover:text-primary transition-all duration-300 hover:underline hover:decoration-primary"
                        >
                          {i.title}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default MenuSideBarItem;
