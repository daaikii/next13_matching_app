import styles from "./FileInput.module.scss"

import React from "react"
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { BsImageFill, BsImage } from "react-icons/bs"

type AuthFormProps = {
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  id: string;
  type: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageState: boolean;
};

const Input: React.FC<AuthFormProps> = ({
  disabled,
  register,
  errors,
  id,
  type,
  label,
  onChange,
  imageState
}) => {
  return (
    <div className={styles.input}>
      {errors[id] && <span className={styles.input_error}>※This field is required</span>}
      <label className={styles.input_label} htmlFor={id}>
        {imageState
          ? <BsImageFill color="aquamarine" size={20} />
          : <BsImage size={20} />
        }
      </label>
      <input
        className={styles.input_input}
        type={type}
        id={id}
        disabled={disabled}
        {...register(id, { required: true, onChange: onChange })}
      />
    </div>
  );
};

export default Input;
