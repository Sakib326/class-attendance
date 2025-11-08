import styles from "./skeleton.module.scss";

interface propsTypes {
  width?: number | any;
  height?: number | any;
  className?: any;
  style?: any;
  variant?: string;
}

const Skeleton = ({
  width,
  height,
  className,
  style,
  variant = "rectangular",
  ...props
}: propsTypes) => {
  return (
    <div
      className={`${styles.skeleton} ${className ? className : ""}`}
      style={{
        width: width,
        height: height,
        ...(variant == "circle" && { borderRadius: "50%" }),
        ...style,
      }}
      {...props}
    ></div>
  );
};

export default Skeleton;
