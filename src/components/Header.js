import Image from "next/image";
import Link from "next/link";

export default function Header({ handleClick }) {
  return (
    <div className="flex">
      <button className="p-1 mx-4" onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <img
        src="logo_ipb.png"
        className="w-16 h-16 relative cursor-pointer"
        alt=""
      />
      <div>
        <div className="text-2xl mx-5 mt-2  text-black font-bold">
          INA Agro-GARLIC
        </div>
        <div className="mx-5  text-black text-xs">
          Agroecological Assessment of Land Suitability for Garlic
        </div>
      </div>
    </div>
  );
}
