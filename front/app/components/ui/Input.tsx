import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

type AuthFormProps = {
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  id: string;
  type: string;
  label: string;
};

const Input: React.FC<AuthFormProps> = ({
  disabled,
  register,
  errors,
  id,
  type,
  label,
}) => {
  return (
    <div className={`${disabled ? "disabled" : ""}`}>
      <label htmlFor={label}>{label}</label>
      {errors.id && <span>This field is required</span>}
      <input
        type={type}
        id={id}
        disabled={disabled}
        {...register(id, { required: true })}
      />
    </div>
  );
};

export default Input;
