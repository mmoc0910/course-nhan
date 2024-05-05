import React, { FC } from "react";
import { Control, useController } from "react-hook-form";
import classNames from "../../utils/classNames";

type InputType = {
  containerclass?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  control: Control<any>;
  name: string;
  placeholder?: string;
  children?: React.ReactNode;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: FC<InputType> = ({
  containerclass = "",
  type = "text",
  className = "",
  control,
  name,
  placeholder = "",
  children,
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, defaultValue: "" });
  return (
    <div className="">
      <div className={classNames("relative", containerclass)}>
        <input
          autoComplete="off"
          type={type}
          className={classNames(
            "focus:border-primary text-black font-medium placeholder:text-text4 py-3 px-[25px] rounded-[10px] border border-solid w-full bg-inherit peer outline-none",
            error ? "border-error text-error" : "border-border-gray text-text1",
            children ? "pr-16" : "",
            className
          )}
          placeholder={error ? "" : placeholder}
          id={name}
          {...rest}
          {...field}
        />
        {children}
      </div>
      {error && <p className="ont-medium text-error">{error.message}</p>}
    </div>
  );
};

export default Input;
