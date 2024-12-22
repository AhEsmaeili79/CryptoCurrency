import { getCoinsPriceExchange } from "@api/get-coins-price-exchange";
import { useExchangeStore } from "@store/exchange";
import { RiSettings5Fill } from "react-icons/ri";
import { TbSwitchVertical } from "react-icons/tb";
import ConvertTo from "./components/convert-to";
import PaymentAmount from "./components/payment-amount";
import Result from "./components/result";
import { CalculatorPropsType } from "./type";
import toast from "react-hot-toast";

export default function Calculator({ customClassName }: CalculatorPropsType) {
  const params = useExchangeStore((state) => state.params);
  const setResult = useExchangeStore((state) => state.setResult);

  const submitHandler = () => {
    getCoinsPriceExchange(params)
      .then((res) => setResult(res.price))
      .catch(() => {
        setResult(0);
        toast.error("متاسفانه خطایی رخ داده است.");
      });
  };

  return (
    <div
      className={`${
        customClassName
          ? customClassName
          : "border-2 backdrop-blur-xl border-blue-300 rounded-3xl px-4 py-6 lg:w-7/12 md:w-9/12 w-full mx-auto flex flex-col relative z-1"
      }`}
      style={{
        background: customClassName
          ? ""
          : "linear-gradient(318deg, #DFE6FF -0.59%, #E7ECFF 21.43%, rgba(235, 239, 255, 0.00) 110.69%)",
      }}
    >
      <div className="flex justify-between text-blue-primary items-center gap-16">
        <h4 className="font-bold text-xl ml-auto">مبادله</h4>
        <RiSettings5Fill size={30} />
      </div>

      {/* Start مبلغ پرداختی */}
      <PaymentAmount />
      {/* End مبلغ پرداختی */}

      {/* Start Switch button */}
      <button className="my-2 mx-auto w-fit">
        <TbSwitchVertical className="text-green-primary" size={30} />
      </button>
      {/* End Switch button */}

      {/* Start تبدیل به */}
      <ConvertTo />
      {/* End تبدیل به */}

      <Result />

      <button
        className="bg-red-700 text-white rounded-xl py-2 font-bold mt-4 w-full"
        onClick={submitHandler}
      >
        تبادل کن
      </button>
    </div>
  );
}
