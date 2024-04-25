import { FC } from "react";
import { Link } from "react-router-dom";

type DocumentTabProps = { documents: { title: string; url: string }[] };
const DocumentTab: FC<DocumentTabProps> = ({ documents }) => {
  return (
    <div className="text-lg">
      {documents.map((item, index) => (
        <div key={index}>
          <span>{item.title}: {" "}</span>
          <Link
            to={item.url} target="_blank"
            className="underline decoration-secondary text-secondary"
          >
            {item.url}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DocumentTab;
