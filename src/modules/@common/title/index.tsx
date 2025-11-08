interface propTypes {
  title?: string;
  className?: string;
}

const Title = ({ title, className }: propTypes) => {
  return (
    <h3 className={`${className ? className : ""}`}>
      <span className="text-primary">{title}</span>
    </h3>
  );
};

export default Title;
