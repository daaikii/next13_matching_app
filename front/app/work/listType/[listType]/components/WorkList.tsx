import getWorkListData from "@/app/action/getWorkListData";
import WorkBox from "@/app/work/components/WorkBox";
import { ListType } from "../page";

const WorkList = async ({ listType }: { listType: ListType }) => {
  const workData = await getWorkListData(listType);
  return (
    <>
      {workData ? (
        workData.map((work) => {
          return <WorkBox {...work} />;
        })
      ) : (
        <p>投稿がありません</p>
      )}
    </>
  );
};

export default WorkList;
