import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
const EventToggle = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <li className="w-full py-2">
      <button
        onClick={() => setToggle(!toggle)}
        className="w-full flex items-center gap-4 justify-between"
      >
        <div className="text-base font-bold">{question}</div>
        <div className={`transition-all ${toggle && "rotate-180"}`}>
          <IoIosArrowDown />
        </div>
      </button>
      {toggle && <div className="text-base py-2">{answer}</div>}
    </li>
  );
};

export default EventToggle;
