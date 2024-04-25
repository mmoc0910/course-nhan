import { FC, useEffect, useState } from "react";
import { AuthType, CommentType, IntroduceType } from "../../../../types";
import { ReplySVG } from "../../../../icons/ReplySVG";
import avatarDefault from "../../../../assets/images/avatar.png";
import { DAY_FORMAT } from "../../../../constanst";
import { useToogleValue } from "../../../../hooks/useToogleValue";
import { CommoentInput } from "./CommoentInput";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import TrashCan from "../../../../icons/TrashCan";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import PenFancy from "../../../../icons/PenFancy";
import EditComment from "./EditComment";

type CommentItemProps = {
  comment: CommentType;
  handleFetchComment: () => void;
};
export const CommentItem: FC<CommentItemProps> = ({
  comment,
  handleFetchComment,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { auth } = useSelector((state: RootState) => state.auth);
  const { value, handleToogleValue } = useToogleValue();
  const [replyUser, setReplyUser] = useState<AuthType>();
  const info = comment.user.description
    ? (JSON.parse(comment.user.description) as IntroduceType)
    : undefined;
  const infoReplyUser =
    replyUser && replyUser.description
      ? (JSON.parse(replyUser.description) as IntroduceType)
      : undefined;
  useEffect(() => {
    (async () => {
      if (comment.replyComment)
        try {
          const result = await axiosPrivate.get(
            `/users/${comment.replyComment.user}`
          );
          setReplyUser(result.data);
        } catch (error) {
          console.log(error);
        }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDeleteComment = async (commentId: string) => {
    try {
      await axiosPrivate.delete(`/comments/${commentId}`);
      handleFetchComment();
      toast("Xóa thành công");
    } catch (error) {
      console.log(error);
    }
  };
  if (auth)
    return (
      <div className="border-b border-[rgb(222, 225, 243)] py-5 flex items-stretch gap-5">
        <img
          src={info ? info.avatarURL : avatarDefault}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="w-full">
          <div className="flex items-center justify-between w-full">
            <p className="font-semibold text-lg">{comment.user.name}</p>
            <p className="text-text4">{DAY_FORMAT(comment.updatedAt)}</p>
          </div>
          {replyUser && comment.replyComment ? (
            <div className="my-6 pl-5 flex items-start gap-5 border-l-4 border-text4">
              <div className="w-12 h-12 relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-[#cccccc8a] z-[5]"></div>
                <img
                  src={infoReplyUser ? infoReplyUser.avatarURL : avatarDefault}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              <div className="w-full">
                <p className="font-semibold text-lg text-text4">
                  {replyUser.name}
                </p>
                <p className="mt-1 text-text4">
                  {comment.replyComment.content}
                </p>
              </div>
            </div>
          ) : null}
          {isEdit ? (
            <EditComment
              commentId={comment._id}
              initialValue={comment.content}
              handleFetchComment={() => {
                handleFetchComment();
                setIsEdit(false);
              }}
            />
          ) : (
            <p className="mt-1">{comment.content}</p>
          )}
          <div className="flex items-center gap-5 mt-2">
            <div onClick={handleToogleValue}>
              <ReplySVG className="fill-secondary40 cursor-pointer" />
            </div>
            {comment.user._id === auth._id ? (
              <div onClick={() => setIsEdit(true)}>
                <PenFancy className="fill-primary cursor-pointer" />
              </div>
            ) : null}
            {auth.role === 4 ||
            auth.role === 3 ||
            auth._id === comment.user._id ? (
              <div onClick={() => handleDeleteComment(comment._id)}>
                <TrashCan className="fill-error cursor-pointer" />
              </div>
            ) : null}
          </div>

          {value ? (
            <div className="mt-2">
              <CommoentInput
                replyCommentId={comment._id}
                lessonId={comment.lesson._id}
                handleFetchComment={() => {
                  handleFetchComment();
                  handleFetchComment();
                  handleToogleValue();
                }}
              />
            </div>
          ) : null}
        </div>
        {/* <div className="flex items-stretch">
          {comment.user._id === auth._id ? (
            <div
              className="bg-secondary40 p-3 flex items-center justify-center text-white cursor-pointer"
              onClick={() => setIsEdit(true)}
            >
              <PenFancy />
            </div>
          ) : null}
          {auth.role === 4 ||
          auth.role === 3 ||
          auth._id === comment.user._id ? (
            <div
              className="bg-error p-3 flex items-center justify-center text-white cursor-pointer"
              onClick={() => handleDeleteComment(comment._id)}
            >
              <TrashCan />
            </div>
          ) : null}
        </div> */}
      </div>
    );
  return;
};
