import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface PropsType {
  title: string;
  content: string;
}

export default function Accordion(props: PropsType) {
  const { title, content } = props;
  const [isActive, setIsActive] = useState<Boolean>(false);

  return (
    <div
      className={`accordion-item w-full bg-blue-50 py-6 md:px-8 px-4 rounded-xl h-fit transition-all mt-4`}
    >
      <div
        className="accordion-toggle flex justify-between items-center text-gray-500"
        onClick={() => setIsActive(!isActive)}
      >
        <span className="font-extraBold md:text-lg">{title}</span>
        <button>{isActive ? <FaChevronUp /> : <FaChevronDown />}</button>
      </div>

      <div
        className={`accordion-content overflow-hidden ${
          isActive ? "max-h-[1000px]" : "max-h-0"
        }`}
        style={{ transition: "max-height 0.5s ease-in-out" }}
      >
        <p className="text-gray-400 mt-4 bg-white rounded-xl p-4 lg:w-[90%] w-full text-justify">
          {content}
        </p>
      </div>
    </div>
  );
}
