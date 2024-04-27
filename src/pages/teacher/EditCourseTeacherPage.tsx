import FormGroup from "../../components/common/FormGroup";
import { Input, Textarea } from "../../components/input";
import { Label } from "../../components/label";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DropdownWithComponents } from "../../components/dropdown";
import { countLevels, getCategoryById, listCategory } from "../../constanst";
import { v4 as uuidv4 } from "uuid";
import { ChevronRight } from "../../icons/ChevronRight";
import { uploadFireStore } from "../../utils/uploadFireStore";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { CourseType } from "../../types";
import { setBreadcumb } from "../../store/breadcumb/breadcumbSlice";
import { useDispatch } from "react-redux";

const schema = yup
  .object({
    title: yup.string().required("Họ và tên không được để trống"),
    description: yup.string().required("Tên đăng nhập không được để trống"),
    rose: yup.number().required().positive().integer(),
    price: yup.number().required().positive().integer(),
    courseObjectives: yup
      .string()
      .required("Tên đăng nhập không được để trống"),
  })
  .required();
const EditCourseTeacherPage = () => {
  const dispatch = useDispatch();

  const { courseId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [category, setCategory] = useState<{
    rank: number;
    class: number;
    subject: number;
  }>();
  const [poster, setPoster] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>();
  const { handleSubmit, control, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const nameWatch = watch("title");
  useEffect(() => {
    dispatch(
      setBreadcumb([
        {
          title: "Khóa học",
          url: "/teacher/courses",
        },
        {
          title: nameWatch,
          url: `/teacher/courses/lessons/${courseId}`,
        },
      ])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, nameWatch]);
  useEffect(() => {
    (async () => {
      try {
        const result = await axiosPrivate.get<CourseType>(
          `/courses/${courseId}`
        );
        const {
          title,
          description,
          rose,
          price,
          poster,
          rank,
          class: classId,
          subject,
        } = result.data;
        const { description: desc, courseObjectives } = JSON.parse(
          description
        ) as { description: string; courseObjectives: string };
        setValue("title", title);
        setValue("description", desc);
        setValue("courseObjectives", courseObjectives);
        setValue("rose", rose);
        setValue("price", price);
        setImage(poster);
        setCategory({ class: classId, rank, subject });
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = async (data: {
    title: string;
    description: string;
    rose: number;
    price: number;
    courseObjectives: string;
  }) => {
    try {
      setLoading(true);
      console.log("data - ", data);
      if (category) {
        let posterURL = image;
        if (poster) {
          posterURL = await uploadFireStore(poster);
        }
        const { title, description, courseObjectives, price, rose } = data;
        await axiosPrivate.patch(`/courses/${courseId}`, {
          rank: category.rank,
          class: category.class,
          subject: category.subject,
          title,
          description: JSON.stringify({ description, courseObjectives }),
          price,
          rose,
          poster: posterURL,
        });
        toast("Chỉnh sửa khóa học thành công");
        navigate("/teacher/courses");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="grid grid-cols-4 gap-5" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label htmlFor="poster">Poster*</Label>
        <label htmlFor="poster">
          {poster ? (
            <img
              src={URL.createObjectURL(poster)}
              className="w-3/4 aspect-video rounded-xl cursor-pointer object-cover"
            />
          ) : (
            <img
              src={image}
              className="w-1/2 aspect-video rounded-xl cursor-pointer object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            id="poster"
            onChange={(e) => e.target.files && setPoster(e.target.files[0])}
            className="hidden"
          />
        </label>
      </FormGroup>
      <div className="col-span-3 grid grid-cols-2 gap-5">
        <FormGroup>
          <Label>Danh mục*</Label>
          <DropdownWithComponents>
            <DropdownWithComponents.Select
              placeholder={
                category ? (
                  <span className="text-black">
                    {getCategoryById(listCategory, category.rank)?.title}{" "}
                    {" / "}
                    {getCategoryById(listCategory, category.class)?.title}{" "}
                    {" / "}
                    {getCategoryById(listCategory, category.subject)?.title}
                  </span>
                ) : (
                  <span className="text-text4">Select one</span>
                )
              }
            ></DropdownWithComponents.Select>
            <DropdownWithComponents.List>
              {listCategory.map((item) => {
                const level = countLevels(item);
                console.log("level - ", level);
                return (
                  <DropdownWithComponents.Option
                    key={uuidv4()}
                    onClick={() => {}}
                    className="!p-0"
                  >
                    <div className="relative w-full group/a">
                      <div className="flex items-center justify-between w-full px-5 py-4">
                        <p>{item.title}</p>
                        {level > 1 ? <ChevronRight className="w-3 h-3" /> : ""}
                      </div>
                      <div className="absolute w-max top-0 left-full bg-white invisible opacity-0 group-hover/a:visible group-hover/a:opacity-100 transition-all duration-200 rounded-lg shadow-lg border border-strock">
                        {item.childrens &&
                          item.childrens.map((i) => {
                            const childLevel = countLevels(i);
                            return (
                              <div className="relative w-full group/b">
                                <div
                                  className="flex items-center gap-10 justify-between w-full px-5 py-4 bg-white"
                                  // onClick={() =>
                                  //   childLevel === 1 &&
                                  //   setCategory({
                                  //     rank: item.id,
                                  //     class: i.id,
                                  //   })
                                  // }
                                >
                                  <p>{i.title}</p>
                                  {childLevel > 1 ? (
                                    <ChevronRight className="w-3 h-3" />
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="absolute w-max top-0 left-full bg-white invisible opacity-0 group-hover/b:visible group-hover/b:opacity-100 transition-all duration-200 rounded-lg shadow-lg border border-strock overflow-hidden">
                                  {i.childrens &&
                                    i.childrens.map((ii) => {
                                      return (
                                        <div className="relative w-full group/b">
                                          <div
                                            className="flex items-center justify-between w-full px-5 py-4 bg-white"
                                            onClick={() =>
                                              setCategory({
                                                rank: item.id,
                                                class: i.id,
                                                subject: ii.id,
                                              })
                                            }
                                          >
                                            <p>{ii.title}</p>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </DropdownWithComponents.Option>
                );
              })}
            </DropdownWithComponents.List>
          </DropdownWithComponents>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="title">Tên khóa học*</Label>
          <Input name="title" control={control} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="price">Giá khóa học*</Label>
          <Input name="price" control={control} type="number" min={1} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="rose">Phần trăm hoa hồng của Admin*</Label>
          <Input name="rose" control={control} type="number" min={0} />
        </FormGroup>
      </div>
      <FormGroup className="col-span-2">
        <Label htmlFor="description">Mô tả khóa học*</Label>
        <Textarea
          name="description"
          control={control}
          className="min-h-[200px]"
        />
      </FormGroup>
      <FormGroup className="col-span-2">
        <Label htmlFor="courseObjectives">Mục tiêu khóa học*</Label>
        <Textarea
          name="courseObjectives"
          control={control}
          className="min-h-[200px]"
        />
      </FormGroup>
      <button
        disabled={loading}
        className="disabled:cursor-not-allowed col-span-4 w-full text-white bg-primary py-3 rounded-lg font-semibold flex items-center justify-center h-[48px]"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-b-transparent animate-spin rounded-full" />
        ) : (
          "Chỉnh sửa khóa học"
        )}
      </button>
    </form>
  );
};

export default EditCourseTeacherPage;
