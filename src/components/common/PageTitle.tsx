export function PageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-6 mb-12 text-center">
      <div className="w-1/2 md:w-1/3 max-w-[300px] mx-auto py-4 border-b-4 border-warning font-poppins font-bold text-xl text-[#0A0A0A]">
        {title}
      </div>
      <div className="font-semibold text-base">{subtitle}</div>
    </div>
  );
}
