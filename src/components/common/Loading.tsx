const Loading = () => {
  return (
    <div className="fixed top-1/3 left-1/2 -translate-x-1/2 flex items-center gap-2">
      <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-8 border-t-blue-600" />
      <p className="text-xl font-bold">LOADING...</p>
    </div>
  );
};

export default Loading;
