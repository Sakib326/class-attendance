const Line = ({ className }: any) => {
  return (
    <div
      className={`w-full h-[1px] bg-[#E5E7EB] my-4 ${
        className ? className : ""
      }`}
    ></div>
  );
};

export default Line;
