import { FC, ReactNode, useEffect, useRef } from "react";
import { ITab } from "./type";
import classNames from "../../utils/classNames";

type TabProps = {
  tabs: ITab[];
  children: ReactNode;
  classNameTabItem?: string;
  classNameWrapperContent?: string;
  colorTab?: string;
};
export const Tab: FC<TabProps> = ({
  tabs,
  children,
  classNameTabItem = "",
  classNameWrapperContent = "",
  colorTab = "#6F49FD",
}) => {
  const tabBarRef = useRef<HTMLDivElement>(null);
  const tabBarHeaderRef = useRef<HTMLDivElement>(null);
  const wrapperContentTabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      console.log(e.target);
      const clickedElement = e.currentTarget as HTMLElement;
      const tabItems = Array.from(tabBarHeaderRef.current?.children || []);
      const index = tabItems.findIndex((item) => item === clickedElement);
      console.log("Clicked tab index:", index);
      const wrapperContentTab = wrapperContentTabRef.current;
      if (wrapperContentTab) {
        const wrappercontentTabWidth = wrapperContentTab.clientWidth;
        const contentTab = wrapperContentTab.firstElementChild as HTMLElement;
        if (contentTab) {
          contentTab.style.transform = `translateX(-${
            wrappercontentTabWidth * index
          }px)`;
        }
      }
      const width = clickedElement.clientWidth;
      const left = clickedElement.offsetLeft;
      if (tabBarHeaderRef.current) {
        const listTabItem = tabBarHeaderRef.current.childNodes;
        listTabItem?.forEach((item) => {
          if (item instanceof HTMLElement) item.style.color = "#B2B3BD";
        });
      }

      if (tabBarRef.current) {
        clickedElement.style.color = colorTab;
        tabBarRef.current.style.width = `${width}px`;
        tabBarRef.current.style.left = `${left}px`;
      }
    };

    const currentTabBarHeaderRef = tabBarHeaderRef.current;
    const wrapperContentTab = wrapperContentTabRef.current;
    if (tabBarRef.current && currentTabBarHeaderRef && wrapperContentTab) {
      const tabBarHeaderItemFirst =
        currentTabBarHeaderRef.firstElementChild as HTMLElement;
      const wrappercontentTabWidth = wrapperContentTab.clientWidth;
      const contentTab = wrapperContentTab.firstElementChild as HTMLElement;
      if (contentTab) {
        const listContentTab = contentTab.childNodes;
        contentTab.style.width = `${
          listContentTab.length * wrappercontentTabWidth
        }px`;
        console.log('wrappercontentTabWidth - ', wrappercontentTabWidth)
      }
      if (tabBarHeaderItemFirst) {
        console.log(
          "tabBarHeaderItemFirst - ",
          tabBarHeaderItemFirst.clientLeft
        );
        tabBarHeaderItemFirst.style.color = colorTab;
        tabBarRef.current.style.width = `${tabBarHeaderItemFirst.clientWidth}px`;
        tabBarRef.current.style.left = `${tabBarHeaderItemFirst.clientLeft}px`;
      }
      const listTabItem = currentTabBarHeaderRef.childNodes;
      console.log("listTabItem - ", listTabItem);
      listTabItem.forEach((item) => {
        if (item instanceof HTMLElement) {
          item.addEventListener("click", handleClick);
        }
      });
    }

    return () => {
      if (currentTabBarHeaderRef) {
        const listTabItem = currentTabBarHeaderRef.childNodes;
        listTabItem.forEach((item: Node) => {
          if (item instanceof HTMLElement) {
            item.removeEventListener("click", handleClick);
          }
        });
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="relative select-none">
        <div style={{background: colorTab}}
          className={classNames(
            "absolute bottom-[-1px] h-[3px] rounded-full transition-all duration-300"
          )}
          ref={tabBarRef}
        />
        <div
          className="flex items-center border-b border-b-border-gray"
          ref={tabBarHeaderRef}
        >
          {tabs.map((item) => (
            <div
              className={classNames(
                "font-bold text-xl py-2 text-text4 px-5 tab-header-item cursor-pointer transition-all duration-300",
                classNameTabItem
              )}
              key={item.key}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full overflow-hidden" ref={wrapperContentTabRef}>
        <div
          className={classNames(
            "pt-5 flex items-stretch flex-nowrap transition-all duration-300",
            classNameWrapperContent
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
