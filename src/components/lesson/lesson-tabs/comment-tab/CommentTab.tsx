import { FC, useCallback, useEffect, useState } from "react";
import { CommentType } from "../../../../types";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { CommentItem } from "./CommentItem";
import { CommoentInput } from "./CommoentInput";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/configureStore";

type CommentTabProps = { lessonId: string };
export const CommentTab: FC<CommentTabProps> = ({ lessonId }) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [comments, setComments] = useState<CommentType[]>([]);
  console.log("comments - ", comments);
  useEffect(() => {
    fetchComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);
  const fetchComment = useCallback(async () => {
    try {
      const result = await axiosPrivate.get<CommentType[]>(
        `/comments/?lesson=${lessonId}`
      );
      setComments(result.data.reverse());
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="h-full flex flex-col">
      {auth && (auth.role === 4 || auth.role === 2) ? null : (
        <CommoentInput lessonId={lessonId} handleFetchComment={fetchComment} />
      )}
      <div className="">
        {comments.length > 0 ? (
          comments.map((item) => (
            <CommentItem
              handleFetchComment={fetchComment}
              comment={item}
              key={item._id}
            />
          ))
        ) : (
          <p className="text-secondary text-center mt-10">
            Chưa có bình luận nào...
          </p>
        )}
      </div>
    </div>
  );
};
