import React, { ReactNode, CSSProperties } from 'react';

// Define the props interface
interface CardProps {
  title: string;
  Icon?: React.ElementType;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  data: any;
}

const SummaryCard: React.FC<CardProps> = ({
  title,
  Icon,
  children,
  style,
  className,
  data,
}) => {
  return (
    <div
      className={`flex justify-between gap-4  py-[50px] pl-[30px] pr-[20px] rounded-[10px]  ${className}`}
      style={style}
    >
      <div>
        <h5 className="font-normal leading-[30px] text-white">{title}</h5>
        <h2 className="text-white leading-[63px]">{data?.count}</h2>
        {children}
      </div>
      <div className="w-[90px] h-[90px] bg-white flex items-center justify-center rounded-full shrink-0	">
        {Icon && (
          <div className="card-icon">
            <Icon className="text-5xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
