import React, { useEffect, useState } from "react";
import { useFormik, Formik, Field } from "formik";
import CustomSelect from "./CustomSelect";
import * as Yup from "yup";

const FormikInput = () => {
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
  const [showModal, setShowModal] = useState(false);
  const [province, setProvince] = useState([
    {
      name: "empty",
    },
  ]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [kabupaten, setKabupaten] = useState([{ name: "empty" }]);
  const [kecamatan, setKecamatan] = useState([{ name: "empty" }]);
  const [kelurahan, setKelurahan] = useState([
    {
      name: "empty",
    },
  ]);
  const [selectedKabupaten, setSelectedKabupaten] = useState(null);
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);
  const [selectedKelurahan, setSelectedKelurahan] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchProvince();
  }, []);

  useEffect(() => {
    fetchKabupaten(selectedProvince);
  }, [selectedProvince]);

  useEffect(() => {
    fetchKecamatan(selectedKabupaten);
  }, [selectedKabupaten]);

  useEffect(() => {
    fetchKelurahan(selectedKecamatan);
  }, [selectedKecamatan]);

  const fetchProvince = async () => {
    const data = await fetch(
      "https://dev.farizdotid.com/api/daerahindonesia/provinsi"
    );
    const json = await data.json();
    setProvince(json.provinsi);
  };

  const fetchKabupaten = async (id) => {
    const data = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`
    );
    const json = await data.json();
    setKabupaten(json.kota_kabupaten);
  };

  const fetchKecamatan = async (id) => {
    const data = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`
    );
    const json = await data.json();
    setKecamatan(json.kecamatan);
  };

  const fetchKelurahan = async (id) => {
    const data = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${id}`
    );
    const json = await data.json();
    setKelurahan(json.kelurahan);
  };

  async function fetchData() {
    const response = await fetch(
      "https://garlic-backend.herokuapp.com/api/v1/syaratTumbuh"
    );
    const data = await response.json();
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
        label: `${d.jenis} (${
          d.intervalBawah == null ? " < " : `${d.intervalBawah}  -`
        }  ${d.intervalAtas} cmol)`,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });
    setKapasitasTukarKationOptions(kapasitasTukarKation);

    const kedalamanMineralTanah = [];
    data.kedalamanMineralTanah.map((d) => {
      kedalamanMineralTanah.push({
        label: `${d.jenis} (${
          d.intervalBawah == null
            ? " < "
            : d.intervalAtas == null
            ? ` > ${d.intervalBawah}`
            : d.intervalBawah
        }  ${d.intervalBawah != null && d.intervalAtas != null ? " - " : ""}  ${
          d.intervalAtas == null ? "" : d.intervalAtas
        } cm)`,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });
    setKedalamanMineralTanahOptions(kedalamanMineralTanah);

    const kejenuhanBasa = [];
    data.kejenuhanBasa.map((d) => {
      kejenuhanBasa.push({
        label: `${d.jenis} (${
          d.intervalBawah == null
            ? " < "
            : d.intervalAtas == null
            ? ` > ${d.intervalBawah}`
            : d.intervalBawah
        }  ${d.intervalBawah != null && d.intervalAtas != null ? " - " : ""}  ${
          d.intervalAtas == null ? "" : d.intervalAtas
        } %)`,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });
    setKejenuhanBasaOptions(kejenuhanBasa);

    const kemasamanTanah = [];
    data.kemasamanTanah.map((d) => {
      kemasamanTanah.push({
        label: `${d.jenis} (${
          d.intervalBawah == null
            ? " < "
            : d.intervalAtas == null
            ? ` > ${d.intervalBawah}`
            : d.intervalBawah
        }  ${d.intervalBawah != null && d.intervalAtas != null ? " - " : ""}  ${
          d.intervalAtas == null ? "" : d.intervalAtas
        } pH)`,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });
    setKemasamanTanahOptions(kemasamanTanah);

    const relief = [];
    data.relief.map((d) => {
      relief.push({
        label: `${d.jenis} (${
          d.intervalBawah == null
            ? " < "
            : d.intervalAtas == null
            ? ` > ${d.intervalBawah}`
            : d.intervalBawah
        }  ${d.intervalBawah != null && d.intervalAtas != null ? " - " : ""}  ${
          d.intervalAtas == null ? "" : d.intervalAtas
        } %)`,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });
    setReliefOptions(relief);

    const curahHujan = [];
    data.curahHujan.map((d) => {
      curahHujan.push({
        label: `${d.jenis} (${
          d.intervalBawah == null
            ? " < "
            : d.intervalAtas == null
            ? ` > ${d.intervalBawah}`
            : d.intervalBawah
        }  ${d.intervalBawah != null && d.intervalAtas != null ? " - " : ""}  ${
          d.intervalAtas == null ? "" : d.intervalAtas
        } mm/bulan)`,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });
    setCurahHujanOptions(curahHujan);

    // const radiasiPenyinaran = [];
    // data.radiasiPenyinaran.map((d) => {
    //   radiasiPenyinaran.push({
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
    // setLamaPenyinaranOptions(radiasiPenyinaran);

    const elevasi = [];
    data.elevasi.map((d) => {
      elevasi.push({
        label: `${d.jenis} (${
          d.intervalBawah == null
            ? " < "
            : d.intervalAtas == null
            ? ` > ${d.intervalBawah}`
            : d.intervalBawah
        }  ${d.intervalBawah != null && d.intervalAtas != null ? " - " : ""}  ${
          d.intervalAtas == null ? "" : d.intervalAtas
        } magl)`,
        value: d.jenis,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });

    setElevasiOptions(elevasi);

    const temperatur = [];
    data.temperatur.map((d) => {
      temperatur.push({
        label: ` (${
          d.intervalBawah == null
            ? " < "
            : d.intervalAtas == null
            ? ` > ${d.intervalBawah}`
            : d.intervalBawah
        }  ${d.intervalBawah != null && d.intervalAtas != null ? " - " : ""}  ${
          d.intervalAtas == null ? "" : d.intervalAtas
        } c/bulan)`,
        value: d.id,
        rekomendasi: d.rekomendasi,
        kelas: d.kelas,
      });
    });

    setTemperaturOptions(temperatur);
  }

  const formik = useFormik({
    initialValues: {
      provinsi: "",
      "kabupaten/kota": "",
      kecamatan: "",
      "kelurahan/desa": "",
      drainase: "",
      //mediaPerakaran: "",
      teksturTanah: "",
      //retensi: "",
      kapasitasTukarKation: "",
      kemasamanTanah: "",
      kedalamanMineralTanah: "",
      kejenuhanBasa: "",
      // faktorTidakDapat: "",
      // cuaca: "",
      temperatur: "",
      curahHujan: "",
      //radiasiPenyinaran: "",
      // faktorRelief: "",
      elevasi: "",
      relief: "",
    },

    onSubmit: (values) => {
      let empty = "";
      for (const v in values) {
        if (values[v] == "") {
          empty += ` ${v},`;
        }
      }

      let result = {
        provinsi: province.find((d) => d.id == values.provinsi).nama,
        "kabupaten/kota": kabupaten.find(
          (d) => d.id == values["kabupaten/kota"]
        ).nama,
        kecamatan: kecamatan.find((d) => d.id == values.kecamatan).nama,
        "kelurahan/desa": kelurahan.find(
          (d) => d.id == values["kelurahan/desa"]
        ).nama,
        drainase: values.drainase,
        //mediaPerakaran: values.mediaPerakaran,
        teksturTanah: values.teksturTanah,
        //retensi: values.retensi,
        kapasitasTukarKation: values.kapasitasTukarKation,
        kemasamanTanah: values.kemasamanTanah,
        kedalamanMineralTanah: values.kedalamanMineralTanah,
        kejenuhanBasa: values.kejenuhanBasa,
        // cuaca: values.cuaca,
        temperatur: values.temperatur,
        curahHujan: values.curahHujan,
        //radiasiPenyinaran: values.radiasiPenyinaran,
        // faktorRelief: values.faktorRelief,
        elevasi: values.elevasi,
        relief: values.relief,
      };

      if (empty === "") {
        postData(result);
      } else {
        setTimeout(() => {
          alert(`Kelas ${empty} Tidak Boleh Kosong`);
        }, 1000);
      }
    },
  });

  const handleChangeProvince = (e) => {
    formik.setFieldValue("provinsi", e.target.value);
    setSelectedProvince(e.target.value);
  };

  const handleChangeKabupaten = (e) => {
    formik.setFieldValue("kabupaten/kota", e.target.value);
    setSelectedKabupaten(e.target.value);
  };

  const handleChangeKecamatan = (e) => {
    formik.setFieldValue("kecamatan", e.target.value);
    setSelectedKecamatan(e.target.value);
  };

  const handleChangeKelurahan = (e) => {
    formik.setFieldValue("kelurahan/desa", e.target.value);
    setSelectedKelurahan(e.target.value);
  };

  function postData(body) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    fetch(
      "https://garlic-backend.herokuapp.com/api/v1/inputPengguna",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSyaratTumbuh(data);
        setShowModal(true);
      })
      .catch((error) => {
        setTimeout(() => {
          alert(error);
        }, 1000);
      });
  }

  const getColor = (nilai) => {
    if (1 <= nilai && nilai <= 1.5) {
      return "bg-red-600";
    } else if (1.5 < nilai && nilai <= 2.5) {
      return "bg-yellow-600";
    } else if (2.5 < nilai && nilai <= 3.5) {
      return "bg-yellow-300";
    } else if (3.5 < nilai && nilai <= 4) {
      return "bg-green-500";
    }
    return "bg-red-600";
  };

  const getKelas = (nilai) => {
    if (1 <= nilai && nilai <= 1.5) {
      return "N";
    } else if (1.5 < nilai && nilai <= 2.5) {
      return "S3";
    } else if (2.5 < nilai && nilai <= 3.5) {
      return "S2";
    } else if (3.5 < nilai && nilai <= 4) {
      return "S1";
    }
    return "N";
  };

  return (
    <div className="px-4 py-5  sm:p-6">
      <form onSubmit={formik.handleSubmit}>
        {/* Faktor Yang dapat dikendalikan */}
        <div className="grid grid-cols-6 gap-6 my-8 mx-2">
          <div className="mb-col-span-6 sm:col-span-3">
            <label htmlFor="Provinsi" className="m-2 font-bold text-black">
              Provinsi
            </label>
            <select
              id="country"
              name="country"
              onChange={handleChangeProvince}
              className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-darkcoco focus:border-primary-darkcoco sm:text-sm"
            >
              {province.map((p) => (
                <option value={p.id} key={p.id} className="text-black">
                  {p.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-col-span-6 sm:col-span-3">
            <label htmlFor="Kabupaten" className="m-2 font-bold text-black">
              Kabupaten
            </label>
            <select
              id="country"
              name="country"
              onChange={handleChangeKabupaten}
              className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-darkcoco focus:border-primary-darkcoco sm:text-sm"
            >
              {kabupaten.map((k) => (
                <option value={k.id} key={k.id}>
                  {k.nama}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-6 my-8 mx-2">
          <div className="mb-col-span-6 sm:col-span-3">
            <label htmlFor="kecamatan" className="m-2 font-bold text-black">
              Kecamatan
            </label>
            <select
              id="kecamatan"
              name="kecamatan"
              onChange={handleChangeKecamatan}
              className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-darkcoco focus:border-primary-darkcoco sm:text-sm"
            >
              {kecamatan.map((p) => (
                <option value={p.id} key={p.id} className="text-black">
                  {p.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-col-span-6 sm:col-span-3">
            <label htmlFor="kelurahan" className="m-2 font-bold text-black">
              Kelurahan/Desa
            </label>
            <select
              id="kelurahan"
              name="kelurahan"
              onChange={handleChangeKelurahan}
              className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-darkcoco focus:border-primary-darkcoco sm:text-sm"
            >
              {kelurahan.map((k) => (
                <option value={k.id} key={k.id}>
                  {k.nama}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-16">
          <div className="col-span-full flex space-x-4 text-lg mt-8 text-black">
            <b>
              Faktor yang tidak dapat dikendalikan dan tidak dapat dikoreksi
            </b>
          </div>
          <div className="col-span-6 sm:col-span-3 ">
            <label
              htmlFor="cuaca"
              className="block text-base font-medium text-gray-700 space-x-4 my-2"
            >
              <b>Cuaca</b>
            </label>
          </div>
          <div className="col-span-6 sm:col-span-3 my-2">
            <label
              htmlFor="temperatur"
              className="block text-sm font-medium text-gray-700 space-x-4 my-2"
            >
              <b>Temperatur</b>
            </label>
            <CustomSelect
              onChange={(value) =>
                formik.setFieldValue("temperatur", value.value)
              }
              value={formik.values.temperatur}
              options={temperaturOptions}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 my-2">
            <label
              htmlFor="curahHujan"
              className="block text-sm font-medium text-gray-700 space-x-4 my-2"
            >
              <b>Curah Hujan</b>
            </label>
            <CustomSelect
              onChange={(value) =>
                formik.setFieldValue("curahHujan", value.value)
              }
              value={formik.values.curahHujan}
              options={curahHujanOptions}
            />
          </div>
          {/* <div className="col-span-6 sm:col-span-3 my-2">
            <label
              htmlFor="radiasiPenyinaran"
              className="block text-sm font-medium text-gray-700 space-x-4 my-2"
            >
              <b>Radiasi Penyinaran</b>
            </label>
            <CustomSelect
              onChange={(value) =>
                formik.setFieldValue("radiasiPenyinaran", value.value)
              }
              value={formik.values.radiasiPenyinaran}
              options={lamaPenyinaranOptions}
            />
          </div> */}
          <div className="col-span-6 sm:col-span-3 mt-8">
            <label
              htmlFor="faktorRelief"
              className="block text-base font-medium text-gray-700 space-x-4 my-2"
            >
              <b>Faktor Relief</b>
            </label>
          </div>
          <div className="col-span-6 sm:col-span-3 my-2">
            <label
              htmlFor="elevasi"
              className="block text-sm font-medium text-gray-700 space-x-4 my-2"
            >
              <b>Elevasi</b>
            </label>
            <CustomSelect
              onChange={(value) => formik.setFieldValue("elevasi", value.value)}
              value={formik.values.elevasi}
              options={elevasiOptions}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 my-2">
            <label
              htmlFor="relief"
              className="block text-sm font-medium text-gray-700 space-x-4 my-2"
            >
              <b>Relief</b>
            </label>
            <CustomSelect
              onChange={(value) => formik.setFieldValue("relief", value.value)}
              value={formik.values.relief}
              options={reliefOptions}
            />
          </div>
        </div>
        {/* Faktor Yang dapat dikoreksi */}
        <div className="mb-16">
          <div className="col-span-full flex space-x-4 text-lg mt-8 text-black">
            <b>Faktor yang dapat dikoreksi</b>
          </div>
          <div className="col-span-6 sm:col-span-3 my-2">
            <label
              htmlFor="kedalamanMineralTanah"
              className="block text-sm font-medium text-gray-700 space-x-4 my-2"
            >
              <b>Kedalaman Mineral Tanah</b>
            </label>
            <CustomSelect
              onChange={(value) =>
                formik.setFieldValue("kedalamanMineralTanah", value.value)
              }
              value={formik.values.kedalamanMineralTanah}
              options={kedalamanMineralTanahOptions}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 my-2">
            <label
              htmlFor="kejenuhanBasa"
              className="block text-sm font-medium text-gray-700 space-x-4 my-2"
            >
              <b>Kejenuhan Basa</b>
            </label>
            <CustomSelect
              onChange={(value) =>
                formik.setFieldValue("kejenuhanBasa", value.value)
              }
              value={formik.values.kejenuhanBasa}
              options={kejenuhanBasaOptions}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 my-2">
            <label
              htmlFor="teksturTanah"
              className="block text-sm font-medium text-gray-700 space-x-4 my-2"
            >
              <b>Kemasaman Tanah</b>
            </label>
            <CustomSelect
              onChange={(value) =>
                formik.setFieldValue("kemasamanTanah", value.value)
              }
              value={formik.values.kemasamanTanah}
              options={kemasamanTanahOptions}
            />
          </div>
        </div>
        {/* Faktor yang tidak dapat dikendalikan dan tidak dapat dikoreksi */}
        <>
          <div className="col-span-full flex space-x-4 text-lg text-black">
            <b>Faktor yang dapat dikendalikan</b>
          </div>
          <div className="col-span-6 sm:col-span-3 mb-8">
            <label
              htmlFor="drainase"
              className="text-black block text-base font-medium text-gray-700 space-x-4"
            >
              <b>Drainase</b>
            </label>

            <CustomSelect
              onChange={(value) => {
                formik.setFieldValue("drainase", value.value);
              }}
              value={formik.values.drainase}
              options={drainaseOptions}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 my-2">
            <label
              htmlFor="drainase"
              className="block text-base font-medium text-gray-700 space-x-4 my-2"
            >
              <b>Media Perakaran</b>
            </label>
          </div>
          <div className="col-span-6 sm:col-span-3 my-2">
            <label
              htmlFor="teksturTanah"
              className="block text-sm font-medium text-gray-700 space-x-4 my-2"
            >
              <b>Tekstur Tanah</b>
            </label>
            <CustomSelect
              onChange={(value) =>
                formik.setFieldValue("teksturTanah", value.value)
              }
              value={formik.values.teksturTanah}
              options={teksturTanahOptions}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 mt-8">
            <label className="block text-base font-medium text-gray-700 space-x-4 my-2">
              <b>Retensi Hara</b>
            </label>
          </div>
          <div className="col-span-6 sm:col-span-3 my-2">
            <label
              htmlFor="kapasitasTukarKation"
              className="block text-sm font-medium text-gray-700 space-x-4 my-2"
            >
              <b>Kapasitas Tukar Kation </b>
            </label>
            <CustomSelect
              onChange={(value) =>
                formik.setFieldValue("kapasitasTukarKation", value.value)
              }
              value={formik.values.kapasitasTukarKation}
              options={kapasitasTukarKationOptions}
            />
          </div>
        </>

        <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <button
            type="submit"
            className="w-1/2 mt-8 justify-center place-items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-coco hover:bg-primary-darkcoco "
          >
            Submit
          </button>
        </div>
        {showModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none mt-16	">
              <div className=" w-auto my-6 mx-auto max-w-6xl 	mt-auto">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div
                    className={`${getColor(
                      syaratTumbuh.karakteristikTanah.classify.KelasSyaratTumbuh
                        .nilai
                    )} flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t`}
                  >
                    <h3 className="text-3xl font-semibold text-white">
                      Hasil dari peniliain data syarat tumbuh adalah{" "}
                      {getKelas(
                        syaratTumbuh.karakteristikTanah.classify
                          .KelasSyaratTumbuh.nilai
                      )}
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-white  h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="p-4 mt-2 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-4 lg:grid-cols-4 xl:gap-x-8">
                    <div className=" text-blueGray-500 text-lg leading-relaxed text-center">
                      Provinsi :<br />
                      {province.find((d) => d.id == selectedProvince).nama}
                    </div>
                    <div className=" text-blueGray-500 text-lg leading-relaxed text-center">
                      Kabupaten/Kota :<br />
                      {kabupaten.find((d) => d.id == selectedKabupaten).nama}
                    </div>
                    <div className=" text-blueGray-500 text-lg leading-relaxed text-center">
                      Kecamatan :<br />
                      {kecamatan.find((d) => d.id == selectedKecamatan).nama}
                    </div>
                    <div className=" text-blueGray-500 text-lg leading-relaxed text-center">
                      Kelurahan/Desa :<br />
                      {kelurahan.find((d) => d.id == selectedKelurahan).nama}
                    </div>
                  </div>

                  <div className="p-4 mt-2 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-4 lg:grid-cols-5 xl:gap-x-8">
                    <div className="group relative">
                      <div
                        className={`py-4 px-2 w-full min-h-80 ${getColor(
                          syaratTumbuh.karakteristikTanah.classify
                            .KelasFaktorYangDapatDikendalikan.nilai / 0.25
                        )} aspect-w-1 aspect-h-1 rounded-md overflow-hidden flex flex-col lg:h-48 lg:aspect-none`}
                      >
                        <p className="sm:text-sm lg:text-lg text-center	text-white">
                          Kelas Faktor Yang Dapat Dikendalikan
                        </p>
                        <p className="flex-grow "></p>
                        <p className="text-center	sm:text-2xl font-bold	 lg:text-5xl text-white">
                          {getKelas(
                            syaratTumbuh.karakteristikTanah.classify
                              .KelasFaktorYangDapatDikendalikan.nilai / 0.25
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="group relative">
                      <div
                        className={`py-4 px-2 w-full min-h-80 ${getColor(
                          syaratTumbuh.karakteristikTanah.classify
                            .KelasFaktorYangEfeknyaDapatDikoreksi.nilai / 0.25
                        )} aspect-w-1 aspect-h-1 rounded-md overflow-hidden  flex flex-col   lg:h-48 lg:aspect-none`}
                      >
                        <p className="sm:text-sm lg:text-lg text-center	text-white">
                          Kelas Faktor Yang Efeknya Dapat Dikendalikan
                        </p>
                        <p className="flex-grow "></p>
                        <p className="text-center	sm:text-2xl font-bold	 lg:text-5xl text-white">
                          {getKelas(
                            syaratTumbuh.karakteristikTanah.classify
                              .KelasFaktorYangEfeknyaDapatDikoreksi.nilai / 0.25
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="group relative">
                      <div
                        className={`py-4 px-2  w-full min-h-80 ${getColor(
                          syaratTumbuh.karakteristikTanah.classify
                            .KelasFaktorYangTidakDapatDikendalikanDanDikoreksi
                            .nilai / 0.5
                        )} aspect-w-1 aspect-h-1 rounded-md overflow-hidden  flex flex-col  lg:h-48 lg:aspect-none`}
                      >
                        <p className="sm:text-sm lg:text-lg text-center	text-white">
                          Kelas Faktor Yang Tidak Dapat Dikendalikan Dan
                          Dikoreksi
                        </p>
                        <p className="flex-grow "></p>
                        <p className="text-center	sm:text-2xl font-bold	 lg:text-5xl text-white">
                          {getKelas(
                            syaratTumbuh.karakteristikTanah.classify
                              .KelasFaktorYangTidakDapatDikendalikanDanDikoreksi
                              .nilai / 0.5
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="group relative">
                      <div
                        className={`py-4 px-2 w-full min-h-80 ${getColor(
                          syaratTumbuh.karakteristikTanah.classify
                            .KelasFaktorRelief.nilai / 0.2
                        )} aspect-w-1 aspect-h-1 rounded-md overflow-hidden  flex flex-col   lg:h-48 lg:aspect-none`}
                      >
                        <p className="sm:text-sm lg:text-lg text-center	text-white">
                          Kelas Faktor Relief
                        </p>
                        <p className="flex-grow "></p>
                        <p className="text-center	sm:text-2xl font-bold	 lg:text-5xl text-white">
                          {getKelas(
                            syaratTumbuh.karakteristikTanah.classify
                              .KelasFaktorRelief.nilai / 0.2
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="group relative">
                      <div
                        className={`py-4 px-2 w-full min-h-80 ${getColor(
                          syaratTumbuh.karakteristikTanah.classify
                            .KelasFaktorCuaca.nilai / 0.3
                        )} aspect-w-1 aspect-h-1 rounded-md overflow-hidden  flex flex-col   lg:h-48 lg:aspect-none`}
                      >
                        <p className="sm:text-sm lg:text-lg text-center	text-white">
                          Kelas Faktor Cuaca
                        </p>
                        <p className="flex-grow "></p>
                        <p className="text-center	sm:text-2xl font-bold	 lg:text-5xl text-white">
                          {getKelas(
                            syaratTumbuh.karakteristikTanah.classify
                              .KelasFaktorCuaca.nilai / 0.3
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-4 lg:grid-cols-5 xl:gap-x-8">
                    <div className="group relative">
                      <div
                        className={`py-4 px-2 w-full min-h-80 ${getColor(
                          syaratTumbuh.karakteristikTanah.KelasDrainase.kelas
                        )} aspect-w-1 aspect-h-1 rounded-md overflow-hidden flex flex-col lg:h-32 lg:aspect-none`}
                      >
                        <p className="sm:text-xs lg:text-base text-center	text-white">
                          Drainase
                        </p>
                        <p className="flex-grow "></p>
                        <p className="text-center	sm:text-lg font-bold	 lg:text-2xl text-white">
                          {getKelas(
                            syaratTumbuh.karakteristikTanah.KelasDrainase.kelas
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="group relative">
                      <div
                        className={`py-4 px-2 w-full min-h-80 ${getColor(
                          syaratTumbuh.karakteristikTanah
                            .KelasKapasitasTukarKation.kelas
                        )} aspect-w-1 aspect-h-1 rounded-md overflow-hidden flex flex-col lg:h-32 lg:aspect-none`}
                      >
                        <p className="sm:text-xs lg:text-base text-center	text-white">
                          Kapasitas Tukar Kation
                        </p>
                        <p className="flex-grow "></p>
                        <p className="text-center	sm:text-lg font-bold	 lg:text-2xl text-white">
                          {getKelas(
                            syaratTumbuh.karakteristikTanah
                              .KelasKapasitasTukarKation.kelas
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="group relative">
                      <div
                        className={`py-4 px-2 w-full min-h-80 ${getColor(
                          syaratTumbuh.karakteristikTanah.KelasTeksturTanah
                            .kelas
                        )} aspect-w-1 aspect-h-1 rounded-md overflow-hidden flex flex-col lg:h-32 lg:aspect-none`}
                      >
                        <p className="sm:text-xs lg:text-base text-center	text-white">
                          Tekstur Tanah
                        </p>
                        <p className="flex-grow "></p>
                        <p className="text-center	sm:text-lg font-bold	 lg:text-2xl text-white">
                          {getKelas(
                            syaratTumbuh.karakteristikTanah.KelasTeksturTanah
                              .kelas
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="group relative">
                      <div
                        className={`py-4 px-2 w-full min-h-80 ${getColor(
                          syaratTumbuh.karakteristikTanah.KelasKemasamanTanah
                            .kelas
                        )} aspect-w-1 aspect-h-1 rounded-md overflow-hidden flex flex-col lg:h-32 lg:aspect-none`}
                      >
                        <p className="sm:text-xs lg:text-base text-center	text-white">
                          Kemasaman Tanah
                        </p>
                        <p className="flex-grow "></p>
                        <p className="text-center	sm:text-lg font-bold	 lg:text-2xl text-white">
                          {getKelas(
                            syaratTumbuh.karakteristikTanah.KelasKemasamanTanah
                              .kelas
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="group relative">
                      <div
                        className={`py-4 px-2 w-full min-h-80 ${getColor(
                          syaratTumbuh.karakteristikTanah.KelasKejenuhanBasa
                            .kelas
                        )} aspect-w-1 aspect-h-1 rounded-md overflow-hidden flex flex-col lg:h-32 lg:aspect-none`}
                      >
                        <p className="sm:text-xs lg:text-base text-center	text-white">
                          Kejenuhan Basa
                        </p>
                        <p className="flex-grow "></p>
                        <p className="text-center	sm:text-lg font-bold	 lg:text-2xl text-white">
                          {getKelas(
                            syaratTumbuh.karakteristikTanah.KelasKejenuhanBasa
                              .kelas
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-4 lg:grid-cols-5 xl:gap-x-8">
                    <div className="group relative">
                      <div
                        className={`py-4 px-2 w-full min-h-80 ${getColor(
                          syaratTumbuh.karakteristikTanah
                            .KelasKedalamanMineralTanah.kelas
                        )} aspect-w-1 aspect-h-1 rounded-md overflow-hidden flex flex-col lg:h-32 lg:aspect-none`}
                      >
                        <p className="sm:text-xs lg:text-base text-center	text-white">
                          Kedalaman Mineral Tanah
                        </p>
                        <p className="flex-grow "></p>
                        <p className="text-center	sm:text-lg font-bold	 lg:text-2xl text-white">
                          {getKelas(
                            syaratTumbuh.karakteristikTanah
                              .KelasKedalamanMineralTanah.kelas
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="group relative">
                      <div
                        className={`py-4 px-2 w-full min-h-80 ${getColor(
                          syaratTumbuh.karakteristikTanah.KelasRelief.kelas
                        )} aspect-w-1 aspect-h-1 rounded-md overflow-hidden flex flex-col lg:h-32 lg:aspect-none`}
                      >
                        <p className="sm:text-xs lg:text-base text-center	text-white">
                          Relief
                        </p>
                        <p className="flex-grow "></p>
                        <p className="text-center	sm:text-lg font-bold	 lg:text-2xl text-white">
                          {getKelas(
                            syaratTumbuh.karakteristikTanah.KelasRelief.kelas
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="group relative">
                      <div
                        className={`py-4 px-2 w-full min-h-80 ${getColor(
                          syaratTumbuh.karakteristikTanah.KelasCurahHujan.kelas
                        )} aspect-w-1 aspect-h-1 rounded-md overflow-hidden flex flex-col lg:h-32 lg:aspect-none`}
                      >
                        <p className="sm:text-xs lg:text-base text-center	text-white">
                          Kelas Curah Hujan
                        </p>
                        <p className="flex-grow "></p>
                        <p className="text-center	sm:text-lg font-bold	 lg:text-2xl text-white">
                          {getKelas(
                            syaratTumbuh.karakteristikTanah.KelasCurahHujan
                              .kelas
                          )}
                        </p>
                      </div>
                    </div>
                    {/* <div className="group relative">
                      <div
                        className={`py-4 px-2 w-full min-h-80 ${getColor(
                          syaratTumbuh.karakteristikTanah.KelasRadiasiPenyinaran
                            .kelas
                        )} aspect-w-1 aspect-h-1 rounded-md overflow-hidden flex flex-col lg:h-32 lg:aspect-none`}
                      >
                        <p className="sm:text-xs lg:text-base text-center	text-white">
                          Kelas Radiasi Penyinaran
                        </p>
                        <p className="flex-grow "></p>
                        <p className="text-center	sm:text-lg font-bold	 lg:text-2xl text-white">
                          {getKelas(
                            syaratTumbuh.karakteristikTanah
                              .KelasRadiasiPenyinaran.kelas
                          )}
                        </p>
                      </div>
                    </div> */}
                    <div className="group relative">
                      <div
                        className={`py-4 px-2 w-full min-h-80 ${getColor(
                          syaratTumbuh.karakteristikTanah.KelasTemperatur.kelas
                        )} aspect-w-1 aspect-h-1 rounded-md overflow-hidden flex flex-col lg:h-32 lg:aspect-none`}
                      >
                        <p className="sm:text-xs lg:text-base text-center	text-white">
                          Kelas Temperatur
                        </p>
                        <p className="flex-grow "></p>
                        <p className="text-center	sm:text-lg font-bold	 lg:text-2xl text-white">
                          {getKelas(
                            syaratTumbuh.karakteristikTanah.KelasTemperatur
                              .kelas
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="group relative">
                      <div
                        className={`py-4 px-2 w-full min-h-80 ${getColor(
                          syaratTumbuh.karakteristikTanah.KelasElevasi.kelas
                        )} aspect-w-1 aspect-h-1 rounded-md overflow-hidden flex flex-col lg:h-32 lg:aspect-none`}
                      >
                        <p className="sm:text-xs lg:text-base text-center	text-white">
                          Kelas Elevasi
                        </p>
                        <p className="flex-grow "></p>
                        <p className="text-center	sm:text-lg font-bold	 lg:text-2xl text-white">
                          {getKelas(
                            syaratTumbuh.karakteristikTanah.KelasElevasi.kelas
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative p-6 flex-auto text-black">
                    <p> Rekomendasi : </p>
                    <br />
                    {syaratTumbuh.karakteristikTanah.KelasDrainase == null ? (
                      ""
                    ) : syaratTumbuh.karakteristikTanah.KelasDrainase
                        .rekomendasi == null ? (
                      ""
                    ) : (
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        {" Pada variabel Drainase membutuhkan rekomendasi " +
                          syaratTumbuh.karakteristikTanah.KelasDrainase
                            .rekomendasi}
                      </p>
                    )}
                    {syaratTumbuh.karakteristikTanah
                      .KelasKapasitasTukarKation == null ? (
                      ""
                    ) : syaratTumbuh.karakteristikTanah
                        .KelasKapasitasTukarKation.rekomendasi == null ? (
                      ""
                    ) : (
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        {" Pada variabel Kapasitas Tukar Kation membutuhkan rekomendasi " +
                          syaratTumbuh.karakteristikTanah
                            .KelasKapasitasTukarKation.rekomendasi}
                      </p>
                    )}
                    {syaratTumbuh.karakteristikTanah.KelasTeksturTanah ==
                    null ? (
                      ""
                    ) : syaratTumbuh.karakteristikTanah.KelasTeksturTanah
                        .rekomendasi == null ? (
                      ""
                    ) : (
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        {" Pada variabel Tekstur Tanah membutuhkan rekomendasi " +
                          syaratTumbuh.karakteristikTanah.KelasTeksturTanah
                            .rekomendasi}
                      </p>
                    )}
                    {syaratTumbuh.karakteristikTanah.KelasKemasamanTanah ==
                    null ? (
                      ""
                    ) : syaratTumbuh.karakteristikTanah.KelasKemasamanTanah
                        .rekomendasi == null ? (
                      ""
                    ) : (
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        {" Pada variabel Kemasaman membutuhkan rekomendasi " +
                          syaratTumbuh.karakteristikTanah.KelasKemasamanTanah
                            .rekomendasi}
                      </p>
                    )}
                    {syaratTumbuh.karakteristikTanah.KelasKejenuhanBasa ==
                    null ? (
                      ""
                    ) : syaratTumbuh.karakteristikTanah.KelasKejenuhanBasa
                        .rekomendasi == null ? (
                      ""
                    ) : (
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        {" Pada variabel Kejenuhan Basa membutuhkan rekomendasi " +
                          syaratTumbuh.karakteristikTanah.KelasKejenuhanBasa
                            .rekomendasi}
                      </p>
                    )}
                    {syaratTumbuh.karakteristikTanah
                      .KelasKedalamanMineralTanah == null ? (
                      ""
                    ) : syaratTumbuh.karakteristikTanah
                        .KelasKedalamanMineralTanah.rekomendasi == null ? (
                      ""
                    ) : (
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        {" Pada variabel Kedalaman Mineral Tanah membutuhkan rekomendasi " +
                          syaratTumbuh.karakteristikTanah
                            .KelasKedalamanMineralTanah.rekomendasi}
                      </p>
                    )}
                    {syaratTumbuh.karakteristikTanah.KelasRelief == null ? (
                      ""
                    ) : syaratTumbuh.karakteristikTanah.KelasRelief
                        .rekomendasi == null ? (
                      ""
                    ) : (
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        {" Pada variabel Relief membutuhkan rekomendasi " +
                          syaratTumbuh.karakteristikTanah.KelasRelief
                            .rekomendasi}
                      </p>
                    )}
                    {syaratTumbuh.karakteristikTanah.KelasRadiasiPenyinaran ==
                    null ? (
                      ""
                    ) : syaratTumbuh.karakteristikTanah.KelasRadiasiPenyinaran
                        .rekomendasi == null ? (
                      ""
                    ) : (
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        {" Pada variabel Radiasi Penyinaran membutuhkan rekomendasi " +
                          syaratTumbuh.karakteristikTanah.KelasRadiasiPenyinaran
                            .rekomendasi}
                      </p>
                    )}
                    {syaratTumbuh.karakteristikTanah.KelasTemperatur == null ? (
                      ""
                    ) : syaratTumbuh.karakteristikTanah.KelasTemperatur
                        .rekomendasi == null ? (
                      ""
                    ) : (
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        {" Pada variabel Temperatur membutuhkan rekomendasi " +
                          syaratTumbuh.karakteristikTanah.KelasTemperatur
                            .rekomendasi}
                      </p>
                    )}
                  </div>
                  {/*footer*/}
                  <div
                    className={`${getColor(
                      syaratTumbuh.karakteristikTanah.classify.KelasSyaratTumbuh
                        .kelas
                    )} flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b`}
                  >
                    <button
                      className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
      </form>
    </div>
  );
};

export default FormikInput;
