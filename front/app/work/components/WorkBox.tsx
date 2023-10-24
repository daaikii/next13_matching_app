"use client"

import styles from "./WorkBox.module.scss"

import Link from "next/link";
import Image from "next/image";

import { Work } from "@prisma/client";


const WorkBox = ({ matchState, id, imageURL, title, body }: Work) => {
  return (
    <Link href={`/selectWork/${id}`}>
      <li
        className={`${styles.work_box_item} ${matchState && styles.work_box_matched}`}
        key={id}
      >
        <Image
          className={styles.work_box_image}
          src={imageURL}
          alt="work image"
          width={200}
          height={200}
        />
        <div className={styles.work_box_text}>
          <h2 className={styles.work_box_title}>{title}</h2>
          <p className={styles.work_box_body}>{body}</p>
        </div>
      </li>
    </Link>
  );
};

export default WorkBox;
