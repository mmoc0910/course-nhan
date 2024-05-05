import { memo, useState } from "react";
import classNames from "../../utils/classNames";
import { uploadFireStore } from "../../utils/uploadFireStore";

const AddDocuments = memo(
  ({
    handleAddDocument,
  }: {
    handleAddDocument: (title: string, url: string) => void;
  }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File>();
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const handleUploadFile = async () => {
      try {
        setLoading(true);
        if (file) {
          const fileUrl = await uploadFireStore(file);
          fileUrl && setUrl(fileUrl);
          setFile(undefined);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    return (
      <div className="col-span-2 grid grid-cols-3 gap-5">
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Tiêu đề tài liệu"
          className="focus:border-primary text-black font-medium placeholder:text-text4 py-3 px-[25px] rounded-[10px] border border-solid w-full bg-inherit peer outline-none border-strock"
        />
        <div className="relative flex items-center">
          <input
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            placeholder="Link tài liệu"
            className="focus:border-primary text-black font-medium placeholder:text-text4 py-3 px-[25px] pr-20 rounded-[10px] border border-solid w-full bg-inherit peer outline-none border-strock"
          />
          <div
            className={classNames(
              "absolute right-5 bg-[#f8f9ff] flex items-center justify-between",
              file ? "left-0" : ""
            )}
          >
            {file && (
              <span onClick={() => setFile(undefined)} className="block pl-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="fill-error w-5 h-5 cursor-pointer"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                </svg>
              </span>
            )}
            <label htmlFor="document" className="flex items-center w-full">
              {loading && (
                <div className="ml-5 w-5 h-5 shrink-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              )}
              <div className="flex items-center gap-2 pl-5 w-full justify-between">
                {file ? null : (
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="fill-text4 w-5 h-5 cursor-pointer"
                    >
                      <path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" />
                    </svg>
                  </span>
                )}

                {file ? (
                  <p className={"line-clamp-1 text-sm"}>{file.name}</p>
                ) : null}
              </div>
            </label>
            {file && (
              <p
                className="text-sm font-medium text-secondary underline cursor-pointer"
                onClick={handleUploadFile}
              >
                upload
              </p>
            )}

            <input
              type="file"
              id="document"
              className="hidden"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
          </div>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => {
              if (title && url) {
                handleAddDocument(title, url);
                setTitle("");
                setUrl("");
              }
            }}
            type="button"
            className="px-5 py-3 rounded-lg bg-secondary font-medium text-white w-max"
          >
            Thêm tài liệu
          </button>
        </div>
      </div>
    );
  }
);

export default AddDocuments;
