"use client";
import React from "react";
import { IconType } from "react-icons";

type AuthSocialButtonProps = {
  onClick: () => void;
  icon: IconType;
};

const AuthSocialButton = ({ onClick, icon: Icon }: AuthSocialButtonProps) => {
  return (
    <button onClick={onClick}>
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
