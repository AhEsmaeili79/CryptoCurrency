export const LoadingCard = () => {
  return (
    <div className="bg-blue-primary lg:p-8 p-4 lg:rounded-[3rem] rounded-3xl flex flex-col items-center lg:gap-8 gap-4">
      <div className="lg:h-24 h-16 lg:w-24 w-16 rounded-full bg-gray-100" />
      <span className="block bg-gray-100 h-2 w-2/3 rounded-lg"></span>
      <span className="block bg-gray-100 h-2 w-2/3 rounded-lg"></span>
      <span className="block bg-gray-100 h-2 w-2/3 rounded-lg"></span>
    </div>
  );
};
