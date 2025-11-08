import { useState } from "react";

interface PropTypes {
  setKeyword: Function;
  className?: string;
  isEnglish?: boolean;
}

const SearchComponent = ({ setKeyword, className, isEnglish }: PropTypes) => {
  const [ln, setLn] = useState("english");

  return (
    <div className={`relative ${className ? className : ""}`}>
      {!isEnglish ? (
        <span className="absolute cursor-pointer right-[15px] top-[50%] -translate-y-[50%]  z-50">
          {ln == "english" ? (
            <span onClick={() => setLn("bangla")}>বাংলা</span>
          ) : (
            <span onClick={() => setLn("english")}>English</span>
          )}
        </span>
      ) : null}

      <input
        type="text"
        placeholder="Search here"
        className="focus:shadow-none placeholder:text-[15px] border py-1 pl-3 pr-[60px] h-[38px]"
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
};

export default SearchComponent;
