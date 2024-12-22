import {
    FaArrowDownLong,
    FaArrowUpLong,
    FaKickstarterK,
    FaPowerOff,
} from "react-icons/fa6";

export default function LiveDemo() {
  return (
    <div className="mt-4 card-shadow bg-white rounded-2xl px-4 py-6 grid md:grid-cols-4 grid-cols-2 gap-4">
      {/* شروع */}
      <div className="flex items-center justify-center gap-2">
        <FaKickstarterK color="#466DF7" size={40} />
        <div>
          <span className="block text-center text-lg">شروع</span>
          <span className="text-blue-primary font-semiBold text-2xl block text-center mt-2">
            18432.320
          </span>
        </div>
      </div>

      {/* بالاترین */}
      <div className="flex items-center justify-center gap-2">
        <FaArrowUpLong color="#18CE2A" size={40} />
        <div>
          <span className="block text-center text-lg">بالاترین</span>
          <span className="text-green-primary font-semiBold text-2xl block text-center mt-2">
            18432.320
          </span>
        </div>
      </div>

      {/* پایین ترین */}
      <div className="flex items-center justify-center gap-2">
        <FaArrowDownLong color="#F75B46" size={40} />
        <div>
          <span className="block text-center text-lg">پایین ترین</span>
          <span className="text-red-primary font-semiBold text-2xl block text-center mt-2">
            18432.320
          </span>
        </div>
      </div>

      {/* بسته شده */}
      <div className="flex items-center justify-center gap-2">
        <FaPowerOff color="#466DF7" size={40} />
        <div>
          <span className="block text-center text-lg">بسته شده</span>
          <span className="text-blue-primary font-semiBold text-2xl block text-center mt-2">
            18432.320
          </span>
        </div>
      </div>
    </div>
  );
}
