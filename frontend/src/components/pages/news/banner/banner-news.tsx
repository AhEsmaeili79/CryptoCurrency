import { img } from '@data';

export default function BannerNews() {
  return (
    <div
      className="header__banner"
      style={{
        background: "linear-gradient(115deg, #2E48CD 12.25%, #1F237E 92.53%)",
      }}
    >
      <div className="inner-container mx-auto flex md:flex-row flex-col-reverse md:justify-between items-center md:px-0 px-2">
        <img src={img.new_banner_img} alt="wallet" className="lg:w-fit w-[30rem] mx-auto mt-20"/>
      </div>
      <button className="absolute lg:-bottom-14 md:-bottom-10 -bottom-9 mx-auto left-0 right-0 w-fit px-8 py-2">
      <img src={img.arrow_down} alt="wallet" className="lg:w-fit md:w-16 w-12"/>

      </button>
    </div>
  );
}
