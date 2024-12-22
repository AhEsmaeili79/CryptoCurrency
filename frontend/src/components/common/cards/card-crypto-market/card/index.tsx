export const CryptoCard = (props: any) => {
    const { icon, name, price, priceChange1h, priceChange1d } = props;
    return (
      <div className="bg-blue-primary lg:p-8 p-4 lg:rounded-[3rem] rounded-3xl flex flex-col items-center lg:gap-4 gap-2">
        <img
          src={icon}
          className="lg:h-24 h-16 lg:w-24 w-16 rounded-full"
          alt="icon"
        />
        <span className="text-orange-primary gap-4 font-bold text-lg block">
          {name}
        </span>
        <span className="text-white block lg:text-xl text-lg lg:font-bold">
          {price} دلار
        </span>
        <span className="text-green-primary block lg:font-bold lg:text-base text-sm ltr">
          {priceChange1h} ({priceChange1d})
        </span>
      </div>
    );
  };
  