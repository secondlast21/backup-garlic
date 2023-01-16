import Head from "next/head";
import { useState } from "react";
import HomeHeader from "../../components/HomeHeader";
import NavigationDrawer from "../../components/NavigationDrawer";
import Footer from "../../components/Footer";
import Pengembang from "../../components/ProfiePengembang";
import storage from "../../redux/storage";

export default function About() {
  const [active, setActive] = useState(false);
  const auth = storage.get("auth", {
    token: "",
    user: {
      nama: "",
    },
  });
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <>
      <div className="flex flex-col font-display h-screen bg-white">
        <Head>
          <title>INA Agro-GARLIC</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex flex-1 overflow-hidden">
          <aside
            className={`flex-shrink-0 w-64 h-full flex  flex-col border-r transition-all duration-300 ${
              !active ? "-ml-64" : ""
            } `}
          >
            <NavigationDrawer token={auth.token} nama={auth.user.nama} />
          </aside>
          <div className="flex flex-1 flex-col ">
            <div className="shadow-xl">
              <header className="flex items-center text-semibold text-gray-100 bg-primary-white ">
                <HomeHeader active={active} handleClick={handleClick} />
              </header>
            </div>
            <div className="flex-grow  overflow-y-auto paragraph">
              <main>
                <div className="flex-grow bg-white">
                  {/* About Garlic */}
                  <div className="p-4 mt-24">
                    <img src="/garlics.png" className="mx-auto w-128" alt="" />
                    <div className="mx-16 mt-16 mb-8 text-5xl font-bold text-center text-black">
                      Apa itu INA Agro-GARLIC
                    </div>
                    <div className="flex flex-wrap">
                      <div className="mx-16 w-12/12 sm:7/12 md:7/12 text-lg text-center font-semibold  text-black">
                        INA Agro-GARLIC (Agroecological Assessment of Land
                        Suitability for Garlic) adalah Sistem Informasi
                        Geografis Kesesuaian Agroekologi untuk Bawang Putih pada
                        kawasan prioritas pengembangan lahan bawang putih di
                        Indonesia.
                        <br />
                        <br />
                      </div>
                      <div className="mx-16 w-12/12 sm:7/12 md:7/12 text-lg text-justify text-black">
                        <b>
                          Struktur klasifikasi kesesuaian lahan mengikuti
                          kerangka FAO (1976) yaitu{" "}
                        </b>
                        <br />
                        <b>Kelas S1, Sangat Sesuai</b>: Lahan tidak mempunyai
                        faktor pembatas yang berarti atau nyata terhadap
                        penggunaan secara berkelanjutan, atau faktor pembatas
                        yang bersifat minor dan tidak akan mereduksi
                        produktivitas lahan secara nyata
                        <br />
                        <br />
                        <b>Kelas S2, Cukup Sesuai</b>: Lahan mempunyai faktor
                        pembatas, dan faktor pembatas ini akan berpengaruh
                        terhadap produktivitasnya, memerlukan tambahan masukan
                        (input). Pembatas tersebut biasanya dapat diatasi oleh
                        petani sendiri.
                        <br />
                        <br />
                        <b>Kelas S3, Sesuai Marginal</b>: Lahan mempunyai faktor
                        pembatas yang berat, dan faktor pembatas ini akan
                        berpengaruh terhadap produktivitasnya, memerlukan
                        tambahan masukan yang lebih banyak daripada lahan yang
                        tergolong S2. Untuk mengatasi faktor pembatas pada S3
                        memerlukan modal tinggi, sehingga perlu adanya bantuan
                        atau campur tangan (intervensi) pemerintah atau pihak
                        swasta. Tanpa bantuan tersebut petani tidak mampu
                        mengatasinya
                        <br />
                        <br />
                        <b>Kelas N, Tidak Sesuai</b>: Lahan yang tidak sesuai
                        (N) karena mempunyai faktor pembatas yang sangat berat
                        dan/atau sulit diatasi.
                      </div>
                    </div>
                  </div>
                  <div className="p-4 mb-4 mt-4">
                    <div className="mx-16 mt-16 mb-8 text-3xl font-bold  text-black">
                      Syarat tumbuh bawang putih
                    </div>
                    <div className="flex flex-wrap">
                      <div className="mx-16  text-lg text-justify text-black">
                        Syarat tumbuh bawang putih yang dianalisis dikelompokan
                        ke dalam tiga kategori yaitu: <br />
                        <div className="font-semibold">
                          1. Faktor yang tidak dapat dikendalikan dan dikoreksi
                          yang terdiri dari
                        </div>
                        a. Faktor cuaca <br />
                        &emsp;&emsp;i. Temperatur (c), rata-rata (per bulan){" "}
                        <br />
                        &emsp;&emsp;ii. Curah Hujan (mm), (total per bulan){" "}
                        <br />
                        &emsp;&emsp;iii. Lama Penyinaran <br />
                        &emsp;&emsp;iv. Radiasi Penyinaran <br />
                        b. Faktor relief <br />
                        &emsp;&emsp; i. Elevasi (magl) <br />
                        &emsp;&emsp;ii. Relief(%) <br></br>
                        <div className="font-semibold">
                          2. Faktor yang efeknya dapat dikoreksi, yang terdiri
                        </div>
                        dari <br />
                        a. Kejenuhan Basa (%) <br />
                        b. Kedalaman Mineral Tanah (cm) <br />
                        c. Kemasaman Tanah (pH) <br /> <br />
                        <div className="font-semibold">
                          3. Faktor yang dapat dikendalikan, yang terdiri dari
                        </div>
                        a. Drainase <br />
                        b. Kapasitas Tukar Kation (cmol) <br />
                        c. Tekstur Tanah <br />
                        <br />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 mb-4 text-black">
                    *Informasi diatas bersumber dari Balai Besar Sumberdaya
                    Lahan Pertanian
                  </div>
                  {/* Profil Pengembang */}
                  <div className="  py-4 px-4">
                    <div className="mx-16 mt-16 mb-8 text-4xl font-bold text-black text-center">
                      Tim Peneliti
                    </div>
                    <div>
                      <div className="pb-16 mx-16">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex justify-center text-6xl ">
                            <Pengembang
                              name="Prof. Dr. Imas Sukaesih Sitanggang, S.Si, M.Kom"
                              role="Peneliti"
                              image="bu_imas.jpeg"
                            />
                          </div>
                          <div className="flex justify-center text-6xl  ">
                            <Pengembang
                              name="Prof. Dr. Ir. Sobir, M.Si"
                              role="Peneliti"
                              image="prof_sobir.jpeg"
                            />
                          </div>
                          <div className="flex justify-center text-6xl">
                            <Pengembang
                              name="Dr. Eng. Annisa, S.Kom., M.Kom"
                              role="Peneliti"
                              image="bu_annisa.png"
                            />
                          </div>

                          {/* <Pengembang
                            name="Prof. Dr. Imas Sukaesih Sitanggang, S.Si, M.Kom"
                            role="Peneliti"
                            image="bu_imas.jpeg"
                          />
                          <Pengembang
                            name="Prof. Dr. Ir. Sobir, M.Si"
                            role="Peneliti"
                            image="prof_sobir.jpeg"
                          />
                          <Pengembang
                            name="Dr. Eng. Annisa, S.Kom., M.Kom"
                            role="Peneliti"
                            image="bu_annisa.png"
                          /> */}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex justify-center text-6xl ">
                            <Pengembang
                              name="Muhammad Asyhar Agmalaro, S.Si, M.Kom"
                              role="Peneliti"
                              image="pa_asyhar.png"
                            />
                          </div>
                          <div className="flex justify-center text-6xl  ">
                            <Pengembang
                              name="Muhammad Fauzan Ramadhan"
                              role="Peneliti"
                              image="ojan.png"
                            />
                          </div>
                          <div className="flex justify-center text-6xl">
                            <Pengembang
                              name="Reza Achmad Naufal"
                              role="Peneliti"
                              image="reja.png"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
              <Footer background="bg-primary-dark" textColor="text-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
