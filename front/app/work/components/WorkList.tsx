import styles from "./WorkList.module.scss"

import getWorkListData from "@/app/action/getWorkListData";
import WorkBox from "./WorkBox";

const WorkList = async () => {
  const workData = await getWorkListData("all");
  return (
    <div className={styles.content}>
      <ul className={styles.work_list}>
        {workData
          ? workData.map((work) => {
            return <WorkBox {...work} />;
          })
          : <p className={styles.work_list_message}>投稿はありません</p>
        }
      </ul>
    </div>
  );
};

export default WorkList;
