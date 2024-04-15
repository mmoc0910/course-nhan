import { ArrowRight } from "../../../../icons/ArrowRight";
import video from "../../../../assets/videos/169471-841382876_tiny.mp4";

const InfomationTab = () => {
  return (
    <div className="pb-10">
      <video
        controls
        controlsList="nodownload"
        className="w-full aspect-video object-cover"
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="mt-5 space-y-5">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-2xl">
            Intro (Nhớ đọc mô tả quan trọng)
          </p>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary40 text-white">
            <ArrowRight />
          </button>
        </div>
        <div className="text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero
          similique saepe vitae placeat recusandae, velit inventore labore at
          reiciendis nemo ab rerum minus itaque quas ex nesciunt distinctio quo
          tenetur sequi. Alias tenetur asperiores tempora hic vero, assumenda
          illo inventore ipsam quibusdam debitis nostrum vitae error cumque sit
          repudiandae aliquid veniam corrupti repellat adipisci minima atque.
          Sit pariatur facilis cupiditate placeat harum minus explicabo amet?
          Tempore delectus culpa, repellendus consequatur reiciendis rem
          repudiandae minus? Dolorem aperiam esse autem dolores nam sint,
          excepturi cum aspernatur aut temporibus! Reprehenderit quas debitis a
          quos repellat! Animi, adipisci. Inventore corrupti facilis ratione
          quasi aspernatur.
        </div>
      </div>
    </div>
  );
};

export default InfomationTab;
