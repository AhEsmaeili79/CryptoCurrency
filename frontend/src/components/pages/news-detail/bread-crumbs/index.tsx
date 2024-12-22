import { BsArrowLeft } from "react-icons/bs"

export default function BreadCrumbs({ title }: { title: string }) {
  return (
    <div className="bg-[#D3DCFD] flex items-center gap-2 px-6 py-3 rounded-xl">
      <span className="text-sm text-gray-600">اخبار</span>
      <BsArrowLeft className="text-gray-600"/>
      <span className="text-gray-800 font-semiBold">{title}</span>
    </div>
  );
}
