import styles from "./CreateWork.module.scss"

import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import Input from "@/app/components/ui/Input";
import FileInput from "@/app/components/ui/FileInput"
import uploadImageToS3 from "@/app/lib/uploadImageToS3";
import Button from "@/app/components/ui/Button";

const CreateWork = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageState, setImageState] = useState(false)

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const imageURL = await uploadImageToS3(data.image[0]);
    const newWorkData = {
      imageURL,
      title: data.title,
      body: data.body,
    };
    await axios.post("/api/work/createWork", newWorkData);

    router.push("/work/listType/author");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && watch("image").item(0).name) {
      setImageState(true)
    }
  }

  return (
    <div className={styles.creatework}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <FileInput
          disabled={isLoading}
          register={register}
          errors={errors}
          type="file"
          id="image"
          label="image"
          onChange={onChange}
          imageState={imageState}
        />
        <Input
          disabled={isLoading}
          register={register}
          errors={errors}
          type="text"
          id="title"
          label="title"
        />
        <Input
          disabled={isLoading}
          register={register}
          errors={errors}
          type="textarea"
          id="body"
          label="body"
        />
        <Button disabled={isLoading} type="button">POST</Button>
      </form>
    </div>
  );
};

export default CreateWork;
