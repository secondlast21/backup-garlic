import Image from "next/image";
export default function Footer({ background, textColor }) {
  return (
    <div className={` ${background} shadow-inner`}>
      <div className="container mx-auto ">
        <div className="flex flex-wrap  py-8">
          <img src="/logo_ipb.png" className="w-20 h-20 m-4" alt="" />
          <div className="flex flex-col m-4 font-display ">
            <h1 className={textColor}>
              INA Agro-GARLIC - Agroecological Assessment of Land Suitability
              for Garlic
            </h1>
            <h1 className={textColor}> Departemen Ilmu Komputer FMIPA IPB</h1>
            <h1 className={textColor}> Tahun 2021</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
