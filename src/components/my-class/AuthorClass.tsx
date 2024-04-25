import { FC, memo, useEffect, useState } from "react";
import { AuthType, IntroduceType } from "../../types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import avatarDefault from "../../assets/images/avatar.png";

type AuthorClassProps = { authorId: string };
const AuthorClass: FC<AuthorClassProps> = memo(({ authorId }) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [info, setInfo] = useState<IntroduceType>();
  const [authorName, setAuthorName] = useState<string>();
  useEffect(() => {
    (async () => {
      if (auth)
        try {
          const result = await axiosPrivate.get<AuthType>(`/users/${authorId}`);
          const { description, name } = result.data;
          setAuthorName(name);
          if (description) setInfo(JSON.parse(description) as IntroduceType);
        } catch (error) {
          console.log(error);
        }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (authorName)
    return (
      <div className="flex items-center gap-3">
        <img className="w-10 h-10 rounded-full object-cover" src={info ? info.avatarURL : avatarDefault} />
        <p className="font-medium text-lg">{authorName}</p>
      </div>
    );
  return;
});

export default AuthorClass;
