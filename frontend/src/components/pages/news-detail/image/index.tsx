export default function ImagePreview({ img }: { img: string }) {
  return (
    <div className="w-full">
      <img
        src={img}
        alt="news detail image"
        className="w-full object-contain h-64"
      />
    </div>
  );
}
