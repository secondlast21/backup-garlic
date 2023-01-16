import Link from "next/link";

export default function ContentLeft() {
  return (
    <>
      <div className="flex flex-wrap py-40 mx-auto">
        <img src="/new_garlic_2.png" className="mx-auto  h-128 w-128" alt="" />
        <div className="container mx-auto pb-40 w-7/12 text-justify  font-display">
          <div className="text-5xl m-5 font-semibold text-black">About</div>
          <div className="text-5xl m-5 font-bold text-green-normal">
            Bawang Putih
          </div>
          <div className="m-5 text-black">
            Bawang putih (Allium sativum L.) merupakan komoditas hortikultura
            yang penting bagi masyarakat Indonesia mengingat ragam dan jumlah
            pemanfaatannya. Selain dapat dimanfaatkan sebagai bahan penyedap
            makanan hampir di setiap masakan, komoditas ini juga berperan
            sebagai obat bagi beberapa jenis penyakit. Umbi bawang putih dapat
            digunakan untuk membantu menurunkan tekanan darah tinggi, mengobati
            gangguan pernafasan, sakit kepala, wasir, susah buang air besar,
            memar atau luka sayat, cacingan, insomnia, kolesterol, influenza,
            gangguan saluran kencing, dan lain-lain. Keadaan ini membawa dampak
            terhadap tingginya nilai ekonomis bawang putih di mata masyarakat
            Indonesia. Sumber: Panduan Budidaya Bawang Putih, Kementerian
            Pertanian Badan Penelitian dan Pengembangan Pertanian Balai
            Pengkajian Teknologi Pertanian Jawa Timur, Tahun 2018.
          </div>
          <div className="flex">
            <div className="m-5 font-display underline cursor-pointer py-5 w-72 bg-coco-brigth text-center text-white rounded-xl hover:bg-primary-darkcoco hover:text-white">
              <Link href="/about">{`More Info`}</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
