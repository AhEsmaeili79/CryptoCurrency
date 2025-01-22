import React from "react";
import Select from "react-select";

interface ConvertFormProps {
  coins: Coin[];
  amount: number | undefined;
  setAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
  targetCrypto: string;
  setTargetCrypto: React.Dispatch<React.SetStateAction<string>>;
  handleExchange: () => Promise<void>;
}

const ConvertForm: React.FC<ConvertFormProps> = ({
  cryptoName,
  coins,
  amount,
  setAmount,
  targetCrypto,
  setTargetCrypto,
  handleExchange,
}) => {
  const customStyles = {
    menu: (provided: any) => ({
      ...provided,
      maxHeight: 200,
      overflowY: "auto",
    }),
  };

  return (
    <div className="form p-6 border border-gray-300 rounded-lg shadow-lg bg-gray-50">
      <h2 className="font-bold text-xl text-blue-600 mb-4">تبدیل {cryptoName}</h2>
      <input
        type="number"
        placeholder="مقدار موجودی جهت تبادل را وارد کنید"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-4 mb-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
      <Select
        value={coins.find((coin) => coin.id === targetCrypto)
          ? { value: targetCrypto, label: targetCrypto }
          : null}
        onChange={(selectedOption) => setTargetCrypto(selectedOption?.value || "")}
        options={coins.map((coin) => ({
          value: coin.id,
          label: coin.id,
        }))}
        placeholder="Search or select a cryptocurrency"
        className="mb-4"
        isSearchable
        styles={customStyles}
        menuPlacement="auto"
        noOptionsMessage={() => "No matching coins found"}
      />
      <button
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={handleExchange}
      >
        تبادل
      </button>
    </div>
  );
};

export default ConvertForm;
