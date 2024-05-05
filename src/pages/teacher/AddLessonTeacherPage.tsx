import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import FormGroup from "../../components/common/FormGroup";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DocumentType } from "../../types";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";
import _ from "lodash";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setBreadcumb } from "../../store/breadcumb/breadcumbSlice";
import AddDocuments from "../../components/common/AddDocuments";
import EditDocument from "../../components/common/EditDocument";

const modules = {
  toolbar: [
    ["italic", "bold", "underline"],
    ["link"],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
  ],
};
const schema = yup
  .object({
    title: yup.string().required("Tiêu đề bài học không được để trống"),
    video: yup.string().required("Link video không được để trống"),
    description: yup.string(),
  })
  .required();
const AddLessonTeacherPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { courseId } = useParams();
  const { orderNumber } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfs, setPdfs] = useState<DocumentType[]>([]);
  console.log("pdfs -", pdfs);
  const { handleSubmit, control, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  useEffect(() => {
    dispatch(
      setBreadcumb([
        {
          title: "Khóa học",
          url: "/teacher/courses",
        },
        {
          title: "Danh sách bài học",
          url: `/teacher/courses/lessons/${courseId}`,
        },
        {
          title: "Thêm bài học mới",
          url: `/teacher/courses/add-lesson/${orderNumber}/${courseId}`,
        },
      ])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const descriptionWatch = watch("description");
  const onSubmit = async (data: {
    title: string;
    video: string;
    description?: string;
  }) => {
    try {
      setLoading(true);
      console.log("data - ", data);
      const { title, video, description } = data;
      await axiosPrivate.post("/lessons", {
        order: Number(orderNumber),
        title,
        video,
        pdf: JSON.stringify(pdfs.filter((item) => item.title && item.url)),
        course: courseId,
        description: description || "",
      });
      toast("Thêm bài học thành công");
      navigate(`/teacher/courses/lessons/${courseId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const debouncedContentChange = _.debounce((value) => {
    setValue("description", value);
    // console.log(value);
  }, 1000);
  const handleContentDebouncedChange = (value: string) => {
    debouncedContentChange(value);
  };
  const handleAddDocument = useCallback(
    (title: string, url: string) =>
      setPdfs((prev) => [...prev, { title, url }]),
    []
  );
  return (
    <>
      <form
        className="grid grid-cols-2 gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGroup>
          <Label htmlFor="title">Tiêu đề bài học*</Label>
          <Input name="title" control={control} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="video">Link video bài giảng*</Label>
          <Input name="video" control={control} />
        </FormGroup>
        <FormGroup className="col-span-2 ">
          <Label className="col-span-2">Tài liệu bài giảng</Label>
          <AddDocuments handleAddDocument={handleAddDocument} />
          <div className="space-y-2">
            {pdfs.map((item, index) => (
              <EditDocument
                key={uuidv4()}
                document={item}
                handleEditDocument={(title, url) =>
                  setPdfs((prev) =>
                    prev.map((item, i) => (i === index ? { title, url } : item))
                  )
                }
                handleDeleteDocument={() =>
                  setPdfs((prev) => prev.filter((_, i) => i !== index))
                }
                index={index}
              />
            ))}
          </div>
        </FormGroup>
        <FormGroup className="col-span-2">
          <Label>Mô tả bài học</Label>
          <ReactQuill
            placeholder=""
            modules={modules}
            theme="snow"
            value={descriptionWatch}
            onChange={handleContentDebouncedChange}
          />
        </FormGroup>
        <button className="col-span-2 w-full text-white bg-primary py-3 rounded-lg font-semibold flex items-center justify-center h-[48px]">
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-b-transparent animate-spin rounded-full" />
          ) : (
            "Thêm bài học mới"
          )}
        </button>
      </form>
    </>
  );
};

export default AddLessonTeacherPage;
