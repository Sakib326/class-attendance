import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import Line from "../line";
import SearchComponent from "../search";

interface Props {
  breadcrumbsData?: any;
  title: string;
  btnTitle?: string;
  btnLink?: string;
  setKeyword?: any;
  extraLeftSide?: any;
  extraRightSide?: any;
}

const PageHeader = ({
  breadcrumbsData,
  title,
  btnTitle,
  btnLink,
  setKeyword,
  extraLeftSide,
  extraRightSide,
}: Props) => {
  return (
    <div>
      {breadcrumbsData && breadcrumbsData?.length > 0 ? (
        <div className="flex items-center gap-2 mb-3">
          {breadcrumbsData?.map((item: any, i: number) => {
            if (item?.link) {
              return (
                <Link
                  key={i}
                  to={item?.link || "#"}
                  className="flex items-center gap-1 transition-all"
                >
                  <span>{item?.title}</span>
                  <FiChevronRight />
                </Link>
              );
            } else {
              return <p key={i}>{item?.title}</p>;
            }
          })}
        </div>
      ) : null}

      <div className="grid grid-cols-[1fr_1fr] gap-5 items-center w-full">
        <div className="flex items-center gap-3">
          <h4 className="text-primary">{title}</h4>
          {extraLeftSide ? extraLeftSide : null}
        </div>

        <div className="flex items-center ml-auto gap-3 w-full">
          <div
            className={`w-full ${
              setKeyword && btnTitle
                ? "grid grid-cols-[1fr_auto] items-center gap-3"
                : "flex items-center justify-end"
            } `}
          >
            {setKeyword ? (
              <SearchComponent className="w-full" setKeyword={setKeyword} />
            ) : null}
            {btnTitle ? (
              <Link to={btnLink || "#"} className="btn btn-primary">
                {btnTitle}
              </Link>
            ) : null}
          </div>
          {extraRightSide ? extraRightSide : null}
        </div>
      </div>
      <Line />
    </div>
  );
};

export default PageHeader;
