"use client";

import styles from "./SelectWork.module.scss"

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AiFillStar, AiOutlineStar, AiFillHeart, AiOutlineHeart } from "react-icons/ai"

import Button from "@/app/components/ui/Button";
import { User, Work } from "@prisma/client";


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

  const isAuthor = c.id === s.authorId
  const isFollowed = useMemo(() => s.followUsers.some((users) => users.id === c.id), [s.followUsers, c.id])
  const isEntered = useMemo(() => s.entryUsers.some((users) => users.id === c.id), [s.entryUsers, c.id])

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

  const deleteWork = useCallback(() => {
    setIsLoading(true);
    axios.delete(`/api/work/deleteWork/${s.id}`);
    router.push("/work/listType/author");
  }, [router, s.id]);

  const followForWork = useCallback(() => {
    setIsLoading(true);
    axios.post("/api/work/followWork", {
      workId: s.id,
      currentUserId: c.id,
    });
    router.push("/work/listType/follow/");
  }, [router, s.id, c.id]);

  const entryForWork = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/work/entryWork", {
        workId: s.id,
        currentUserId: c.id,
      })
    router.push("/work/listType/entry/");
  }, [router, s.id, c.id]);

  return (
    <div className={styles.content}>
      <div className={styles.select}>

        <h2 className={styles.title}>
          {s.title}
        </h2>

        <div className={styles.icons}>
          {isEntered
            ?
            <AiFillStar
              className={styles.icon}
              disabled={true}
              size={20}
            />
            : <AiOutlineStar
              className={isAuthor ? "" : styles.icon}
              onClick={entryForWork}
              disabled={isLoading || isAuthor}
              size={20}
            />
          }
          <p className={styles.people}>{s.entryUsers.length}</p>
          {isFollowed
            ? <AiFillHeart
              className={styles.icon}
              disabled={true}
              size={20}
            />
            : <AiOutlineHeart
              className={isAuthor ? "" : styles.icon}
              onClick={followForWork}
              disabled={isLoading || isAuthor}
              size={20}
            />
          }
          <p className={styles.people}>{s.followUsers.length}</p>
        </div>

        {s.matchState && <p className={styles.message}>募集は締め切られました。</p>}

        <div className={styles.image}>
          <Image
            src={s.imageURL!}
            alt="select work image"
            width={1000}
            height={600}
          />
        </div>

        <p className={styles.body}>{s.body}</p>

        {isAuthor && (
          <>
            <div className={styles.entrant}>
              {/* マッチ済みのバイトでは無い場合、エントリー者リストを表示 */}
              {!s.matchState &&
                <>
                  <p>ENTRY USER</p>
                  <ul className={styles.entrant_list} >
                    {s.entryUsers.map((user) => {
                      return (
                        <li key={user.id}>
                          <span
                            className={styles.entrant_list_id}
                            onClick={() => recruitUser(user.id)}>
                            {user.name}
                          </span>
                        </li>
                      );
                    })
                    }
                  </ul>
                </>
              }
            </div>

            <div className={styles.delete}>
              {s.matchState ? (
                <Button onClick={deleteWork} type="button">
                  作業を終了し投稿を削除
                </Button>
              ) : (
                <Button onClick={deleteWork} type="button">
                  削除
                </Button>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default SelectWork;
