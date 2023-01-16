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
          <div>Media Perakaran</div>
          <div className="flex-grow"></div>
          <div>{isExpand ? <HiChevronUp /> : <HiChevronDown />}</div>
        </div>
      </div>
      <div className={` ${isExpand ? "block" : "hidden"}  px-4 `}>
        <div className="my-3  mx-3 hover:text-black cursor-pointer px-4 ">
          <Link href={`/filter/tekstur-tanah`}>
            {title == "Tekstur Tanah" ? (
              <b className="underline"> Tekstur Tanah </b>
            ) : (
              <a>Tekstur Tanah </a>
            )}
          </Link>
        </div>
        <div className="my-3  mx-3 hover:text-black cursor-pointer px-4 ">
          <Link href={`/filter/kedalaman-mineral-tanah`}>
            {title == "Kedalaman Mineral Tanah" ? (
              <b className="underline"> Kedalaman Mineral Tanah </b>
            ) : (
              <a>Kedalaman Mineral Tanah </a>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}
