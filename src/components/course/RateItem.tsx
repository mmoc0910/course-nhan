import { FC } from "react";
import { IntroduceType, RateType } from "../../types";
import avtarDefault from "../../assets/images/avatar.png";
import { DAY_FORMAT } from "../../constanst";
import { Rate } from "antd";

type RateItemProps = { rate: RateType };
const RateItem: FC<RateItemProps> = ({ rate }) => {
  const info = rate.user.description
    ? (JSON.parse(rate.user.description) as IntroduceType)
    : undefined;
  return (
    <div className="flex gap-5 py-5 border-b border-b-border-gray last:border-b-transparent">
      <img
        className="w-20 h-20 rounded-full object-cover shrink-0"
        src={info?.avatarURL ? info.avatarURL : avtarDefault}
      />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">{rate.user.name}</p>
          <p className="text-text4">{DAY_FORMAT(rate.updatedAt)}</p>
        </div>
        <Rate allowHalf defaultValue={rate.vote} disabled className="mt-3" />
        <p className="text-xl font-medium mt-2">{rate.content}</p>
      </div>
    </div>
  );
};

export default RateItem;
