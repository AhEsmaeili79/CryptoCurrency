import ContactUsForm from "@common/form/contact-us";
import AboutUs from "@pagesComp/contact-us/about-us";
import ContactUsBanner from "@pagesComp/contact-us/banner";

export default function ContactUsPage() {
  return (
    <>
      <ContactUsBanner />
      <div className="inner-container mx-auto md:px-0 px-2">
        <AboutUs />
        <ContactUsForm />
      </div>
    </>
  );
}
