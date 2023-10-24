import SelectWork from "./components/SelectWork";
import getSelectWork from "@/app/action/getSelectWork";
import getCurrentUser from "@/app/action/getCurrentUser";

type Props = {
  params: { workId: string };
};

const SelectWorkPage = async ({ params }: Props) => {
  const selectWorkData = await getSelectWork(params.workId);
  const currentUser = await getCurrentUser();
  if (!selectWorkData || !currentUser) {
    return (
      <>
        <p>選択しなおしてください。</p>;
      </>
    );
  }
  return <SelectWork selectWork={selectWorkData} currentUser={currentUser} />;
};

export default SelectWorkPage;
