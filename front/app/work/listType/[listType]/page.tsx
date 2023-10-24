import WorkList from "./components/WorkList";

export type ListType = "all" | "follow" | "entry" | "author";

type Props = {
  params: { listType: ListType };
};

const WorkListPage = ({ params }: Props) => {
  return <WorkList listType={params.listType} />

};

export default WorkListPage;
