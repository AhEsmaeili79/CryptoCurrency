import { img } from "@data";

export default function CryptoContent() {
  return (
    <section className="lg:mt-24 mt-12">
      <div className="bg-gray-50 px-8 pt-12 pb-8 rounded-xl relative" style={{
        boxShadow: '4px 4px 22px 0px rgba(0, 0, 0, 0.15), -8px -10px 38px 0px #FFF, 7px 8px 16px -2px rgba(0, 0, 0, 0.04) inset, -4px -4px 16px 0px rgba(255, 255, 255, 0.76) inset'
      }}>
        <img src={img.logo_main} alt="logo" className="mx-auto absolute md:-top-8 -top-6 right-0 left-0 md:w-32 w-28"/>
        <p className="text-gray-400 font-semiBold leading-loose text-justify">
          همانطور که برای نگهداری اسکناس و یا پول های موجود در بانک به کیف پول
          یا حساب بانکی نیاز داریم، کریپتوکارنسی ها هم نیاز به کیف پول (والت)
          ارز دیجیتال دارند تا بشود در امنیت از آنها نگهداری کنید. اگر بانک از
          دارایی ما محافظت میکند، در رابطه با ارزهای دیجیتال فقط و فقط خودمان
          باید امنیت داراییمان را به دست گیریم. از جمله کیف پول های ارز دیجیتال
          که می‌توانید از آنها استفاده کنید، تراست والت و متامسک است. اگر در
          صرافی کریپتر حساب کاربری داشته باشید نیازی به کیف پول رمز ارزی دیگری
          نخواهید داشت زیرا دارایی شما در کیف پول های اختصاصی ما کاملا ایمن است.
        </p>
      </div>
    </section>
  );
}
