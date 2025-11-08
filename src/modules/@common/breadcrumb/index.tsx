import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const BreadCrumb = ({ data }: any) => {
  return (
    <div className="flex items-center gap-2">
      {data?.map((item: any, i: any) => {
        if (item.link) {
          return (
            <Fragment key={i}>
              <Link to={item.link}>{item.title}</Link> <FiChevronRight />
            </Fragment>
          );
        } else {
          return <p key={i}>{item.title}</p>;
        }
      })}
    </div>
  );
};

export default BreadCrumb;
