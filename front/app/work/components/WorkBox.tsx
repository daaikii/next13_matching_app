import Link from "next/link";
import Image from "next/image";

import { Work } from "@prisma/client";

const WorkBox = ({ matchState, id, imageURL, title, body }: Work) => {
  return (
    <li className={`workBox ${matchState && "red"}`} key={id}>
      <Link href={`/selectWork/${id}`}>
        <Image src={imageURL} alt="work image" width={400} height={400} />
        <div className="workText">
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
      </Link>
    </li>
  );
};

export default WorkBox;
