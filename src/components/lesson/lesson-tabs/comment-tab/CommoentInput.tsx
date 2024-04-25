import { useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import { toast } from "react-toastify";
import { PaperPlane } from "../../../../icons/PaperPlane";

export const CommoentInput = ({
  lessonId,
  replyCommentId,
  handleFetchComment,
}: {
  lessonId: string;
  replyCommentId?: string;
  handleFetchComment: () => void;
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const handleSubmit = async () => {
    if (auth)
      if (value)
        try {
          setLoading(true);
          let body;
          if (replyCommentId)
            body = {
              replyComment: replyCommentId /*Trả lời comment nào*/,
              user: auth._id,
              content: value,
              lesson: lessonId,
            };
          else
            body = {
              user: auth._id,
              content: value,
              lesson: lessonId,
            };
          await axiosPrivate.post(`/comments`, body);
          handleFetchComment();
          setValue("");
          console.log(value);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      else toast("Bạn chưa viết nội dung bình luận");
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex relative"
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Viết bình luận của bạn..."
        className="p-5 border border-border-gray rounded-xl w-full scroll-hidden"
      />
      <div
        className="absolute right-5 bottom-5 cursor-pointer"
        onClick={handleSubmit}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-b-transparent animate-spin rounded-full" />
        ) : (
          <PaperPlane className="fill-secondary w-5 h-5" />
        )}
      </div>
    </form>
  );
};
