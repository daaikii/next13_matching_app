"use client";

import styles from "./AuthForm.module.scss"

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import AuthSocialButton from "./AuthSocialButton";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button"

const Auth = () => {
  const router = useRouter();
  const session = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/work");
    }
  }, [session?.status, router]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (!isLogin) {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", { ...data, redirect: false }))
        .then((res) => {
          if (res?.error) {
            toast.error("Error!!!!!!");
          }
          if (res?.ok) {
            router.push("/work");
          }
        })
        .catch((error) => toast.error(`${error}`))
        .finally(() => setIsLoading(false));
    }
    if (isLogin) {
      signIn("credentials", { ...data, redirect: false })
        .then((res) => {
          if (res?.error) {
            toast.error("Error!!!!!");
          }
          if (res?.ok) {
            router.push("/work");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialClick = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false }).then((user) => {
      if (user?.error) {
        toast.error("Error!!!!!");
      }
      if (user?.ok) {
        router.push("/work");
      }
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className={styles.auth}>
      <div className={styles.auth_inner}>
        <form className={styles.auth_form}>
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            type="text"
            id="email"
            label="email"
          />
          {!isLogin && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              type="text"
              id="name"
              label="name"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            type="password"
            id="password"
            label="password"
          />
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLogin ? "LOGIN" : "LEGISTER"}
          </Button>
        </form>
        {isLogin && (
          <div className={styles.auth_social}>
            <AuthSocialButton
              onClick={() => socialClick("google")}
              icon={FcGoogle}
            />
            <AuthSocialButton
              onClick={() => socialClick("github")}
              icon={BsGithub}
            />
          </div>
        )}
        <div className={styles.auth_change}>
          {isLogin ? <p>アカウント作成へ</p> : <p>アカウントをお持ちの場合</p>}
          <p className={styles.auth_change_link} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "register" : "login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
