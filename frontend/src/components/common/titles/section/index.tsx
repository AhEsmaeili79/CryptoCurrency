import React from "react";

interface PropsType {
  number: number;
  title: string;
  subTitle: string;
  children?: React.ReactNode;
}
export default function SectionsTitle(props: PropsType) {
  const { number, title, subTitle, children } = props;
  return (
    <div className="mb-8 flex justify-between">
      <div className="font-extraBold relative ml-auto">
        <h2 className="text-red-primary md:text-4xl text-2xl z-1 relative lg:mr-8 mr-10">
          {title}
        </h2>
        <span className="text-blue-100 text-7xl absolute top-0 right-0 z-0">
          {number}
        </span>
        <span className="text-gray-800 relative -mt-2 block">{subTitle}</span>
      </div>

      {children}
    </div>
  );
}
