import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import Link from "next/link";
export default function NavigationDrawerChild({ handleClick, expand, title }) {
  const [isExpand, setExpand] = useState(expand ? expand : false);
  const expanded = () => {
    setExpand(!isExpand);
  };

  return (
    <>
      <div
        className="my-3 mx-3 hover:text-black cursor-pointer px-4 "
        onClick={expanded}
      >
        <div className="flex flex-row">
          <div>Retensi Hara</div>
          <div className="flex-grow"></div>
          <div>{isExpand ? <HiChevronUp /> : <HiChevronDown />}</div>
        </div>
      </div>
      <div className={` ${isExpand ? "block" : "hidden"}  px-4 `}>
        <div className="my-3  mx-3 hover:text-black cursor-pointer px-4 ">
          <Link href={`/filter/kejenuhan-basa`}>
            {title == "Kejenuhan Basa" ? (
              <b className="underline"> Kejenuhan Basa </b>
            ) : (
              <a>Kejenuhan Basa </a>
            )}
          </Link>
        </div>
        <div className="my-3  mx-3 hover:text-black cursor-pointer px-4 ">
          <Link href={`/filter/kapasitas-tukar-kation`}>
            {title == "Kapasitas Tukar Kation" ? (
              <b className="underline"> Kapasitas Tukar Kation </b>
            ) : (
              <a>Kapasitas Tukar Kation </a>
            )}
          </Link>
        </div>
        <div className="my-3  mx-3 hover:text-black cursor-pointer px-4 ">
          <Link href={`/filter/kemasaman-tanah`}>
            {title == "Kemasaman Tanah" ? (
              <b className="underline"> Kemasaman Tanah </b>
            ) : (
              <a>Kemasaman Tanah </a>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}
