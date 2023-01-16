import Image from "next/image";
export default function Header() {
  return (
    <div className={`flex cursor-pointer`}>
      <img src="../logo_ipb.png" className="w-16 h-16 relative" alt="" />
      <div>
        <div className="text-2xl mx-5 mt-2  text-white">INA Agro-GARLIC</div>
        <div className="mx-5  text-white text-xs">
          Agroecological Assessment of Land Suitability for Garlic
        </div>
      </div>
    </div>
  );
}
