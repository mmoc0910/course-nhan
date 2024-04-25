import { useSelector } from "react-redux";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { RootState } from "../../../../store/configureStore";
import { useState } from "react";
import { toast } from "react-toastify";
import { PaperPlane } from "../../../../icons/PaperPlane";

const EditComment = ({
  initialValue,
  commentId,
  handleFetchComment,
}: {
  initialValue: string;
  commentId: string;
  handleFetchComment: () => void;
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>(initialValue);
  const handleSubmit = async () => {
    if (auth)
      if (value)
        try {
          setLoading(true);
          await axiosPrivate.patch(`/comments/${commentId}`, {
            content: value,
          });
          handleFetchComment();
          setValue("");
          console.log(value);
          toast("Chỉnh sửa thành công")
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

export default EditComment;
