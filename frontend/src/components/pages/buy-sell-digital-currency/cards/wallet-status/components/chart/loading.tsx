export default function LoadingPieChart() {
  return (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-2 md:pt-0 pt-4 md:border-t-0 border-t border-dashed border-t-gray-200">
      <LoadingPie />
      <LoadingPie />
      <LoadingPie />
    </div>
  );
}

const LoadingPie = () => {
  return (
    <div className="animate-pulse flex flex-col justify-center items-center">
      <div className="rounded-full bg-slate-200 h-14 w-14"></div>
      <div className="h-2 bg-slate-200 rounded w-16 mt-4"></div>
    </div>
  );
};
