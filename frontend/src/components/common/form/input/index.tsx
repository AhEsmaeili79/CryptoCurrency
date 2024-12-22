import { CustomInputType } from "./type";

export default function CustomInput({
  register,
  errors,
  label,
  name,
  type,
  validationFormat,
}: CustomInputType) {
  return (
    <div>
      <input
        className="border border-gray-250 w-full p-2 rounded-xl outline-none placeholder:text-sm placeholder:text-gray-250"
        placeholder={label}
        type={type ? type : "text"}
        id={name}
        {...register(
          name,
          validationFormat
            ? validationFormat
            : {
                required: {
                  value: true,
                  message: `${label} الزامی است.`,
                },
              }
        )}
      />
      <span className="text-xs text-red-primary mt-1 font-semiBold">
        {errors[name]?.message}
      </span>
    </div>
  );
}
