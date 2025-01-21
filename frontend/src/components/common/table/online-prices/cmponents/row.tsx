import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { TableRowPropsType } from "./type";
import { useNavigate } from "react-router-dom";

const TableRow = (props: TableRowPropsType) => {
  const {icon, price, volume, priceChange1w, index , cryptoname, coins } = props;
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleBuySellClick = () => {
    navigate("/buy-sell", { state: { cryptoName: cryptoname, icon: icon, price:price, coins:coins } }); // Pass cryptoName as state
  };


  return (
    <div
      className={`md:col-span-5 col-span-3 grid md:grid-cols-5 grid-cols-3 ${
        index !== 0 ? "border-dashed border-t-2 border-t-blue-400" : ""
      }`}
    >
      <div className="flex justify-center items-center md:py-4 py-2">
        <img
          src={icon}
          alt="icon"
          className="md:w-16 w-10 md:h-16 h-10 rounded-full"
        />
      </div>
      <span className="text-blue-primary font-bold text-center block md:py-4 py-2 my-auto">
        {price} دلار
      </span>
      <span className="text-gray-900 font-bold text-center md:block hidden md:py-4 py-2 my-auto">
        {volume}
      </span>
      <span
        className={`${
          priceChange1w > 0 ? "text-green-primary" : "text-red-primary"
        } font-bold text-center md:block hidden md:py-4 py-2 my-auto`}
      >
        <span className="flex items-center justify-center gap-1">
          {priceChange1w}
          {priceChange1w > 0 ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
        </span>
      </span>
      <button
        onClick={handleBuySellClick} // Add the click handler
        className="m-auto text-white bg-blue-500 transition-all hover:bg-blue-700 rounded-xl py-2 px-3 text-sm"
      > خرید / فروش
      </button>
    </div>
  );
};

export default TableRow;
