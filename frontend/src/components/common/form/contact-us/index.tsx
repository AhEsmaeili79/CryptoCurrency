import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CustomInput from "../input";
import CustomTextArea from "../text-area";
import { FormValuesType } from "./type";

export default function ContactUsForm() {
  const form = useForm<FormValuesType>();

  const { register, handleSubmit, formState, reset } = form;

  const { errors } = formState;

  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = () => {
    toast.promise(
      emailjs.sendForm(
        "service_5i1c2iw",
        "template_yezbu8f",
        formRef.current ?? "",
        "5hJ0ABe_CQQPkmO31"
      ),
      {
        loading: "شکیبا باشید ...",
        success: () => {
          reset();
          return <b>ایمیل شما با موفقیت ارسال شد.</b>;
        },
        error: (
          <p>
            <b className="block">متاسفانه خطایی رخ داده است! </b>
            دوباره تلاش کنید
          </p>
        ),
      }
    );
  };

  return (
    <div className="mt-12 bg-white rounded-2xl card-shadow p-8">
      <h4 className="text-center mb-4 font-bold text-gray-800 text-lg">
        خوشحال میشم نظرات و پیشنهاداتتون رو برام بنویسید تا بتونم تو پروژه‌های
        بعدیم ازشون استفاده کنم.
      </h4>
      <form onSubmit={handleSubmit(sendEmail)} ref={formRef} noValidate>
        <div className="flex flex-col gap-2">
          <CustomInput
            register={register}
            errors={errors}
            label="نام و نام خانوادگی"
            name="username"
          />
          <CustomInput
            register={register}
            errors={errors}
            label="موضوع"
            name="subject"
          />
          <CustomInput
            register={register}
            errors={errors}
            label="ایمیل"
            name="email"
            type="email"
            validationFormat={{
              required: {
                value: true,
                message: "ایمیل الزامی است.",
              },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "ایمیل نادرست است.",
              },
              validate: {
                notAdmin: (fieldValue: string) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "لطفا ایمیل دیگری وارد نمایید."
                  );
                },
                notBlackListed: (fieldValue: string) => {
                  return (
                    !fieldValue.endsWith("badddmain.com") ||
                    "دامنه وارد شده صحیح نیست."
                  );
                },
              },
            }}
          />
          <CustomTextArea
            register={register}
            errors={errors}
            label="توضیحات"
            name="description"
          />

          <button
            type="submit"
            className="bg-blue-primary text-white px-16 mx-auto py-2 rounded-lg "
          >
            ارسال نظر
          </button>
        </div>
      </form>
    </div>
  );
}
