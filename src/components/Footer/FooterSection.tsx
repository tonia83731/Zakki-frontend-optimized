import { SubTitle } from "../common/Title";

export default function FooterSection({
  title,
  data,
}: {
  title: string;
  data: {
    id: number;
    href: string;
    name: string;
  }[];
}) {
  return (
    <section className="flex flex-col gap-2 md:gap-4">
      <SubTitle color="text-white">{title}</SubTitle>
      <ul className="text-sm flex flex-col gap-1">
        {data.map((item) => {
          return (
            <li className="" key={item.id}>
              <a href={item.href} className="hover:font-medium">
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
