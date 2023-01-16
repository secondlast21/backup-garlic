/* eslint-disable react/jsx-key */
import Head from "next/head";
import { useState, useEffect } from "react";
import HomeHeader from "../../components/HomeHeader";
import NavigationDrawer from "../../components/NavigationDrawer";
import Footer from "../../components/Footer";
import Pengembang from "../../components/ProfiePengembang";
import storage from "../../redux/storage";

export default function Glosarium() {
  const [active, setActive] = useState(false);
  const [drainaseOptions, setDrainaseOptions] = useState([]);
  const [teksturTanahOptions, setTeksturTanahOptions] = useState([]);
  const [kapasitasTukarKationOptions, setKapasitasTukarKationOptions] =
    useState([]);
  const [kedalamanMineralTanahOptions, setKedalamanMineralTanahOptions] =
    useState([]);
  const [kejenuhanBasaOptions, setKejenuhanBasaOptions] = useState([]);
  const [kemasamanTanahOptions, setKemasamanTanahOptions] = useState([]);
  const [reliefOptions, setReliefOptions] = useState([]);
  const [curahHujanOptions, setCurahHujanOptions] = useState([]);
  const [lamaPenyinaranOptions, setLamaPenyinaranOptions] = useState([]);
  const [elevasiOptions, setElevasiOptions] = useState([]);
  const [temperaturOptions, setTemperaturOptions] = useState([]);
  const [syaratTumbuh, setSyaratTumbuh] = useState([]);
  const [proporsiOptions, setProporsi] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(
      "https://garlic-backend.herokuapp.com/api/v1/syaratTumbuh"
    );
    const data = await response.json();
    const proporsi = [];
    data.proporsi.map((p) => {
      proporsi.push({
        label: `${p.proporsi}  (${p.persentase})`,
        value: p.id,
      });
    });
    setProporsi(proporsi);

    const drainase = [];
    data.drainase.map((d) => {
      drainase.push({
        label: d.jenis,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });
    setDrainaseOptions(drainase);
    const teksturTanah = [];
    data.teksturTanah.map((d) => {
      teksturTanah.push({
        label: d.jenis,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });
    setTeksturTanahOptions(teksturTanah);

    const kapasitasTukarKation = [];
    data.kapasitasTukarKation.map((d) => {
      kapasitasTukarKation.push({
        label: `${d.jenis} [${
          d.intervalBawah == null ? " < " : `${d.intervalBawah}  -`
        }  ${d.intervalAtas} cmol]`,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });
    setKapasitasTukarKationOptions(kapasitasTukarKation);

    const kedalamanMineralTanah = [];
    data.kedalamanMineralTanah.map((d) => {
      kedalamanMineralTanah.push({
        label: `${d.jenis} [${
          d.intervalBawah == null
            ? " < "
            : d.intervalAtas == null
            ? ` > ${d.intervalBawah}`
            : d.intervalBawah
        }  ${d.intervalBawah != null && d.intervalAtas != null ? " - " : ""}  ${
          d.intervalAtas == null ? "" : d.intervalAtas
        } cm]`,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });
    setKedalamanMineralTanahOptions(kedalamanMineralTanah);

    const kejenuhanBasa = [];
    data.kejenuhanBasa.map((d) => {
      kejenuhanBasa.push({
        label: `${d.jenis} [(]${
          d.intervalBawah == null
            ? " < "
            : d.intervalAtas == null
            ? ` > ${d.intervalBawah}`
            : d.intervalBawah
        }  ${d.intervalBawah != null && d.intervalAtas != null ? " - " : ""}  ${
          d.intervalAtas == null ? "" : d.intervalAtas
        } %]`,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });
    setKejenuhanBasaOptions(kejenuhanBasa);

    const kemasamanTanah = [];
    data.kemasamanTanah.map((d) => {
      kemasamanTanah.push({
        label: `${d.jenis} [${
          d.intervalBawah == null
            ? " < "
            : d.intervalAtas == null
            ? ` > ${d.intervalBawah}`
            : d.intervalBawah
        }  ${d.intervalBawah != null && d.intervalAtas != null ? " - " : ""}  ${
          d.intervalAtas == null ? "" : d.intervalAtas
        } pH]`,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });
    setKemasamanTanahOptions(kemasamanTanah);

    const relief = [];
    data.relief.map((d) => {
      relief.push({
        label: `${d.jenis} [${
          d.intervalBawah == null
            ? " < "
            : d.intervalAtas == null
            ? ` > ${d.intervalBawah}`
            : d.intervalBawah
        }  ${d.intervalBawah != null && d.intervalAtas != null ? " - " : ""}  ${
          d.intervalAtas == null ? "" : d.intervalAtas
        } %]`,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });
    setReliefOptions(relief);

    const curahHujan = [];
    data.curahHujan.map((d) => {
      curahHujan.push({
        label: `${d.jenis} [${
          d.intervalBawah == null
            ? " < "
            : d.intervalAtas == null
            ? ` > ${d.intervalBawah}`
            : d.intervalBawah
        }  ${d.intervalBawah != null && d.intervalAtas != null ? " - " : ""}  ${
          d.intervalAtas == null ? "" : d.intervalAtas
        } mm/bulan]`,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });
    setCurahHujanOptions(curahHujan);

    // const lamaPenyinaran = [];
    // data.lamaPenyinaran.map((d) => {
    //   lamaPenyinaran.push({
    //     label: `${d.jenis} (${
    //       d.intervalBawah == null
    //         ? " < "
    //         : d.intervalAtas == null
    //         ? ` > ${d.intervalBawah}`
    //         : d.intervalBawah
    //     }  ${d.intervalBawah != null && d.intervalAtas != null ? " - " : ""}  ${
    //       d.intervalAtas == null ? "" : d.intervalAtas
    //     } jam/hari)`,
    //     value: d.jenis,
    //     rekomendasi: d.rekomendasi,
    //     kelas: d.kelas,
    //   });
    // });
    // setLamaPenyinaranOptions(lamaPenyinaran);

    const elevasi = [];
    data.elevasi.map((d) => {
      elevasi.push({
        label: `${d.jenis} [${
          d.intervalBawah == null
            ? " < "
            : d.intervalAtas == null
            ? ` > ${d.intervalBawah}`
            : d.intervalBawah
        }  ${d.intervalBawah != null && d.intervalAtas != null ? " - " : ""}  ${
          d.intervalAtas == null ? "" : d.intervalAtas
        } magl]`,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });

    setElevasiOptions(elevasi);

    const temperatur = [];
    data.temperatur.map((d) => {
      temperatur.push({
        label: ` [${
          d.intervalBawah == null
            ? " < "
            : d.intervalAtas == null
            ? ` > ${d.intervalBawah}`
            : d.intervalBawah
        }  ${d.intervalBawah != null && d.intervalAtas != null ? " - " : ""}  ${
          d.intervalAtas == null ? "" : d.intervalAtas
        } c/bulan]`,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });

    setTemperaturOptions(temperatur);
  }

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
      <div className="flex font-display flex-col h-screen bg-white">
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
                  <div className="px-16 p-4 mt-16 text-2xl font-bold text-black bg-white  ">
                    Keterangan nilai parameter pada penilaian kesesuian lahan
                  </div>
                  <div className="p-4 ">
                    <div className="flex ">
                      <div className="mx-16 w-full text-lg  text-black ">
                        <div className="grid grid-cols-6 gap-16">
                          <div className="flex flex-col col-span-2 b">
                            <b>
                              Faktor yang tidak dapat dikendalikan dan dikoreksi
                            </b>
                            <b>Faktor cuaca</b>
                            <p>Temperatur</p>
                            <table className="table-fixed">
                              <thead>
                                <tr className="m-16">
                                  <th>Nilai Parameter</th>
                                  <th>Kelas</th>
                                </tr>
                              </thead>
                              <tbody>
                                {temperaturOptions.map((d) => (
                                  <tr>
                                    <td className="text-center">{d.label}</td>
                                    <td className="text-center">{d.kelas}</td>
                                  </tr>
                                ))}
                              </tbody>
                              <p className="mt-8">Curah Hujan</p>
                              <thead>
                                <tr>
                                  <th>Nilai Parameter</th>
                                  <th>Kelas</th>
                                </tr>
                              </thead>
                              <tbody>
                                {curahHujanOptions.map((d) => (
                                  <tr>
                                    <td className="text-center">{d.label}</td>
                                    <td className="text-center">{d.kelas}</td>
                                  </tr>
                                ))}
                              </tbody>
                              <p className="mt-8 font-bold"> Faktor Relief</p>
                              <p>Elevasi</p>
                              <thead>
                                <tr>
                                  <th>Nilai Parameter</th>
                                  <th>Kelas</th>
                                </tr>
                              </thead>
                              <tbody>
                                {elevasiOptions.map((d) => (
                                  <tr>
                                    <td className="text-center">{d.label}</td>
                                    <td className="text-center">{d.kelas}</td>
                                  </tr>
                                ))}
                              </tbody>
                              <p className="mt-8">Relief</p>
                              <thead>
                                <tr>
                                  <th>Nilai Parameter</th>
                                  <th>Kelas</th>
                                </tr>
                              </thead>
                              <tbody>
                                {reliefOptions.map((d) => (
                                  <tr>
                                    <td className="text-center">{d.label}</td>
                                    <td className="text-center">{d.kelas}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="flex flex-col col-span-2">
                            <b>Faktor yang efeknya dapat dikoreksi</b>
                            <b>Kejenuhan Basa</b>
                            <table className="table-fixed">
                              <thead>
                                <tr className="m-16">
                                  <th>Nilai Parameter</th>
                                  <th>Kelas</th>
                                </tr>
                              </thead>
                              <tbody>
                                {kejenuhanBasaOptions.map((d) => (
                                  <tr>
                                    <td className="text-center">{d.label}</td>
                                    <td className="text-center">{d.kelas}</td>
                                  </tr>
                                ))}
                              </tbody>
                              <p className="mt-8 font-bold">
                                Kedalaman Mineral Tanah
                              </p>
                              <thead>
                                <tr>
                                  <th>Nilai Parameter</th>
                                  <th>Kelas</th>
                                </tr>
                              </thead>
                              <tbody>
                                {kedalamanMineralTanahOptions.map((d) => (
                                  <tr>
                                    <td className="text-center">{d.label}</td>
                                    <td className="text-center">{d.kelas}</td>
                                  </tr>
                                ))}
                              </tbody>
                              <p className="mt-8 font-bold">Kemasaman Tanah</p>
                              <thead>
                                <tr>
                                  <th>Nilai Parameter</th>
                                  <th>Kelas</th>
                                </tr>
                              </thead>
                              <tbody>
                                {kemasamanTanahOptions.map((d) => (
                                  <tr>
                                    <td className="text-center">{d.label}</td>
                                    <td className="text-center">{d.kelas}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="flex flex-col col-span-2">
                            <b>Faktor yang dapat dikendalikan</b>
                            <b>Drainase</b>
                            <table className="table-fixed">
                              <thead>
                                <tr className="m-16">
                                  <th>Nilai Parameter</th>
                                  <th>Kelas</th>
                                </tr>
                              </thead>
                              <tbody>
                                {drainaseOptions.map((d) => (
                                  <tr>
                                    <td className="text-center">{d.label}</td>
                                    <td className="text-center">{d.kelas}</td>
                                  </tr>
                                ))}
                              </tbody>
                              <p className="mt-8 font-bold">
                                Kapasitas Tukar Kation
                              </p>
                              <thead>
                                <tr>
                                  <th>Nilai Parameter</th>
                                  <th>Kelas</th>
                                </tr>
                              </thead>
                              <tbody>
                                {kapasitasTukarKationOptions.map((d) => (
                                  <tr>
                                    <td className="text-center">{d.label}</td>
                                    <td className="text-center">{d.kelas}</td>
                                  </tr>
                                ))}
                              </tbody>
                              <p className="mt-8 font-bold"> Tekstur Tanah</p>
                              <thead>
                                <tr>
                                  <th>Nilai Parameter</th>
                                  <th>Kelas</th>
                                </tr>
                              </thead>
                              <tbody>
                                {teksturTanahOptions.map((d) => (
                                  <tr>
                                    <td className="text-center">{d.label}</td>
                                    <td className="text-center">{d.kelas}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-16 p-4 mt-8 text-2xl font-bold text-black bg-white ">
                    Keterangan Proporsi Tanah
                  </div>
                  <div className="p-4 mb-32">
                    <div className="flex flex-wrap">
                      <div className="mx-16 w-12/12 sm:7/12 md:7/12 text-lg text-justify text-black">
                        <ul className="list-disc mx-8 mb-32">
                          {proporsiOptions.map((d) => (
                            // eslint-disable-next-line react/jsx-key
                            <li>
                              {d.value} {d.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="p-4 mb-4 text-black">
                      *Informasi diatas bersumber dari Balai Besar Sumberdaya
                      Lahan Pertanian
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
