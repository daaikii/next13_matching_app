import getWorkListData from "@/app/action/getWorkListData";
import WorkBox from "./WorkBox";

const WorkList = async () => {
  const workData = await getWorkListData("all");
  return (
    <>
      {workData.map((work) => {
        return <WorkBox {...work} />;
      })}
    </>
  );
};

export default WorkList;
