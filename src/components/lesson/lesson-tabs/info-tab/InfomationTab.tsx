import parse from "html-react-parser";
import { FC } from "react";
import YouTube from "react-youtube";

type InfomationTabProps = {
  videoId: string;
  description: string;
  title: string;
};
const InfomationTab: FC<InfomationTabProps> = ({
  videoId,
  description,
  title,
}) => {
  return (
    <div className="pb-10">
      <YouTube videoId={videoId} />
      <div className="mt-5 space-y-5">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-2xl">{title}</p>
        </div>
        <div className="">{parse(description)}</div>
      </div>
    </div>
  );
};

export default InfomationTab;
