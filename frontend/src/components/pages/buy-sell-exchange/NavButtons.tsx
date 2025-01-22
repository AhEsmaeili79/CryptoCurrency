import React from "react";

interface NavButtonsProps {
  activeForm: "buyForm" | "sellForm" | "convertForm";
  setActiveForm: React.Dispatch<React.SetStateAction<"buyForm" | "sellForm" | "convertForm">>;
}

const NavButtons: React.FC<NavButtonsProps> = ({ activeForm, setActiveForm }) => {
  return (
    <div className="nav flex justify-around bg-blue-200 rounded-lg p-3 mb-6">
      <button
        className={`py-3 px-6 rounded-lg text-lg font-medium transition-transform ${
          activeForm === "buyForm"
            ? "bg-blue-600 text-white"
            : "text-blue-600 hover:bg-blue-300"
        }`}
        onClick={() => setActiveForm("buyForm")}
      >
        خرید
      </button>
      <button
        className={`py-3 px-6 rounded-lg text-lg font-medium transition-transform ${
          activeForm === "sellForm"
            ? "bg-blue-600 text-white"
            : "text-blue-600 hover:bg-blue-300"
        }`}
        onClick={() => setActiveForm("sellForm")}
      >
        فروش
      </button>
      <button
        className={`py-3 px-6 rounded-lg text-lg font-medium transition-transform ${
          activeForm === "convertForm"
            ? "bg-blue-600 text-white"
            : "text-blue-600 hover:bg-blue-300"
        }`}
        onClick={() => setActiveForm("convertForm")}
      >
        تبدیل
      </button>
    </div>
  );
};

export default NavButtons;
