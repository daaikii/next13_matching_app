"use client";
import styles from "./AuthSocialButton.module.scss"

import React from "react";
import { IconType } from "react-icons";

type AuthSocialButtonProps = {
  onClick: () => void;
  icon: IconType;
};

const AuthSocialButton = ({ onClick, icon: Icon }: AuthSocialButtonProps) => {
  return (
    <button className={styles.auth_socialbutton} onClick={onClick}>
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
