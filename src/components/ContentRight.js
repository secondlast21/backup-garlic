import Link from "next/link";

export default function ContentRight() {
  return (
    <>
      <div className="flex flex-wrap pt-40 ">
        <div className="container mx-auto pb-40 w-7/12">
          <div className="text-7xl m-5 font-display font-semibold text-black">
            About INA
          </div>
          <div className="text-7xl m-5 font-display font-bold text-green-normal">
            Agro-GARLIC
          </div>
          <div className="m-5 font-display text-black text-justify	">
            {`INA Agro-GARLIC (Agroecological Assessment of Land Suitability for Garlic) adalah Sistem Informasi Geografis Kesesuaian Agroekologi untuk Bawang Putih pada kawasan prioritas pengembangan lahan bawang putih di Indonesia.
            Struktur klasifikasi kesesuaian lahan mengikuti kerangka FAO (1976)`}
          </div>
          <div className="m-5 font-display underline cursor-pointer py-5 w-72 bg-coco-brigth text-center text-white rounded-xl hover:bg-primary-darkcoco hover:text-white">
            <Link href="/about">{`More Info`}</Link>
          </div>
        </div>
        <img
          src={`./new_garlic.png`}
          className="h-128 w-128 right-0 mx-auto bg-white"
          alt=""
        />
      </div>
    </>
  );
}
