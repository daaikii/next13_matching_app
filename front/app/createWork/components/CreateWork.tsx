"use client";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import Input from "@/app/components/ui/Input";
import uploadImageToS3 from "@/app/lib/uploadImageToS3";

const CreateWork = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          disabled={isLoading}
          register={register}
          errors={errors}
          type="file"
          id="image"
          label="image"
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
          type="text"
          id="body"
          label="body"
        />
        <button>投稿</button>
      </form>
    </>
  );
};

export default CreateWork;
