"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

import Button from "@/app/components/ui/Button";
import { User, Work } from "@prisma/client";
import toast from "react-hot-toast";

type SelectWork = Work & {
  followUsers: User[];
  entryUsers: User[];
};

type Props = {
  selectWork: SelectWork;
  currentUser: User;
};

const SelectWork = ({ selectWork: s, currentUser: c }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const recruitUser = (id: string) => {
    setIsLoading(true);
    if (s.matchState) {
      return null;
    }
    axios.post("/api/work/recruitUser", {
      workId: s.id,
      recruitUserId: id,
    });
    router.push("/work/listType/author");
  };

  const deleteWork = () => {
    setIsLoading(true);
    axios.post("/api/work/deleteWork/", { id: s.id });
    router.push("/work/listType/author");
  };

  const followForWork = () => {
    setIsLoading(true);
    axios.post("/api/work/followWork/", {
      workId: s.id,
      currentUserId: c.id,
    });
    router.push("/work/listType/follow/");
  };

  const entryForWork = () => {
    setIsLoading(true);
    axios
      .post("/api/work/entryWork", {
        workId: s.id,
        currentUserId: c.id,
      })
      .then((res) => {
        console.log(res);
      });
    router.push("/work/listType/entry/");
  };

  return (
    <>
      <h2>{s.title}</h2>
      <p>フォロワー:{s.followUsers.length}</p>
      {s.matchState && <p>募集は締め切られました。</p>}
      <Image
        src={s.imageURL!}
        alt="select work image"
        width={1000}
        height={500}
      />
      <p>{s.body}</p>
      {c.id === s.authorId ? (
        <>
          {!s.matchState &&
            s.entryUsers.map((user) => {
              return (
                <li key={user.id}>
                  <p onClick={() => recruitUser(user.id)}>{user.name}</p>;
                </li>
              );
            })}

          {s.matchState ? (
            <Button onClick={deleteWork} type="button">
              作業を終了し投稿を削除
            </Button>
          ) : (
            <Button onClick={deleteWork} type="button">
              削除
            </Button>
          )}
        </>
      ) : (
        <>
          {!s.entryUsers.some((users) => users.id === c.id) && (
            <Button onClick={entryForWork} type="button" disabled={isLoading}>
              エントリーする
            </Button>
          )}
          {!s.followUsers.some((users) => users.id === c.id) && (
            <Button onClick={followForWork} type="button" disabled={isLoading}>
              フォローする
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default SelectWork;
