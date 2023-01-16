import Image from "next/image";
export default function Header() {
  return (
    <div className={`flex flex-col cursor-pointer`}>
      <div>
        <div className="text-2xl mx-auto mt-2  text-white">INA Agro-GARLIC</div>
        <div className="mx-auto text-white text-xs">
          Agroecological Assessment of Land Suitability For Garlic
        </div>
      </div>
    </div>
  );
}
