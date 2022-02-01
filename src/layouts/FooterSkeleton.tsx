const FooterSkeleton = () => {
  const arr = new Array(6).fill(null);

  return (
    <div className="p-4 flex flex-col items-center justify-center gap-4">
      <ul className="flex gap-2">
        {arr.map((_, index) => (
          <li
            key={index}
            className="h-7 w-7 bg-slate-300 animate-pulse rounded-full"
          />
        ))}
      </ul>

      <div className="w-32 h-5 bg-slate-300 animate-pulse rounded-md"></div>
    </div>
  );
};

export default FooterSkeleton;
