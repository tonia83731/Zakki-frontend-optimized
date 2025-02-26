import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import { FaCheck, FaMagnifyingGlass } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa6";
import { IoMdOptions } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

type SearchProps = {
  defaultValue: string;
  searchValue: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyDown: () => void;
  onSearchClick: () => void;
  onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchClear: () => void;
};

export default function Search({
  defaultValue,
  searchValue,
  onSearchChange,
  onSearchClick,
  onSearchKeyDown,
  onFilterChange,
  onSearchClear,
}: SearchProps) {
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(false);
  const programFilterData = [
    {
      id: 1,
      name: `${t("filter_new")}`,
      value: "New",
      isChecked: true,
    },
    {
      id: 2,
      name: `${t("filter_old")}`,
      value: "Old",
      isChecked: false,
    },
  ];
  const filterListItem = programFilterData.map((item) => {
    return (
      <div
        key={item.id}
        className="flex flex-col items-center hover:bg-black/20 py-1 cursor-pointer"
      >
        <input
          type="radio"
          name="filter"
          id={item.value}
          value={item.value}
          defaultChecked={item.value === defaultValue}
          onChange={(e) => {
            onFilterChange(e);
            setToggle(false);
          }}
          className="hidden"
        />
        <label
          htmlFor={item.value}
          className="text-base font-normal hover:font-semibold flex items-center gap-2"
        >
          {item.value === defaultValue ? (
            <span>
              <FaCheck className="text-primary" />
            </span>
          ) : (
            ""
          )}
          <p>{item.name}</p>
        </label>
      </div>
    );
  });
  return (
    <div className="grid grid-cols-4 gap-4 h-10 mb-8">
      <div className="col-span-3 relative shadow-md sm:col-start-2 sm:col-span-2">
        <input
          type="text"
          placeholder="Enter keyword..."
          value={searchValue}
          onChange={onSearchChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearchKeyDown?.();
            }
          }}
          className="w-full h-10 px-3 border border-gray-300 rounded-md text-neutral-700 text-sm focus:border-green-400"
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {searchValue.length > 0 && (
            <button className="h-full" onClick={onSearchClear}>
              <RxCross2 className="text-sm text-gray-600 hover:text-gray-900" />
            </button>
          )}
          <button className="h-full" type="submit" onClick={onSearchClick}>
            <FaMagnifyingGlass className="text-lg text-gray-600 hover:text-gray-900" />
          </button>
          <p className="text-gray-400">|</p>
          <button className="h-full pr-4">
            <FaMicrophone className="text-lg text-gray-600 hover:text-gray-900" />
          </button>
        </div>
      </div>

      <div className="sm:col-span-1 relative">
        <button
          onClick={() => setToggle(!toggle)}
          className="w-full h-full flex items-center justify-center border border-gray-300 rounded-md shadow-md text-lg text-gray-800 font-bold cursor-pointer"
        >
          <IoMdOptions className="text-xl mr-2" />
        </button>
        {toggle && (
          <div className="absolute top-full translate-y-[10px] right-0 z-[100] min-w-[200px] w-full bg-white text-dark shadow-md rounded-t-xl">
            {filterListItem}
          </div>
        )}
      </div>
    </div>
  );
}
