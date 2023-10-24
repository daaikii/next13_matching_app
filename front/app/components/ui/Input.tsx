import styles from "./Input.module.scss"

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
    <div className={styles.input}>
      {errors[id] && <span className={styles.input_error}>※This field is required</span>}
      <label className={styles.input_label} htmlFor={id}>{label}</label>
      {type === "textarea"
        ? <textarea
          className={styles.input_textarea}
          id={id}
          disabled={disabled}
          {...register(id, { required: true, maxLength: 200 })}
        />
        : <input
          className={styles.input_input}
          type={type}
          id={id}
          disabled={disabled}
          {...register(id, { required: true })}
        />
      }
    </div>
  );
};

export default Input;
