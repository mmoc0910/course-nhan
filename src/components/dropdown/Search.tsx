import { useState } from "react";

const Search = ({
  placeholder,
}: {
  placeholder: string;
}) => {
  const [value, setValue] = useState<string>("");
  return (
    <div className="sticky top-0 z-10 p-2 bg-inherit flex items-center w-full">
      <input
        type="text"
        placeholder={placeholder}
        className="text-sm font-medium placeholder:text-text4 py-[12px] px-[25px] pr-10 rounded-[10px] border border-solid w-full bg-inherit peer border-strock text-text1 outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Search;
