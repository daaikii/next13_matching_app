import styles from "@/app/work/components/WorkList.module.scss"

import getWorkListData from "@/app/action/getWorkListData";
import WorkBox from "@/app/work/components/WorkBox";
import { ListType } from "../page";

const WorkList = async ({ listType }: { listType: ListType }) => {
  const workData = await getWorkListData(listType);
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
