import React, { useRef, useEffect, useState } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Legend from "@arcgis/core/widgets/Legend";
import Graphic from "@arcgis/core/Graphic";
import Zoom from "@arcgis/core/widgets/Zoom";
import styles from "../styles/EsriMap.module.css";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";
import Print from "@arcgis/core/widgets/Print";
import Header from "../components/Header";
import config from "@arcgis/core/config";

function FilterEsriMap() {
  const mapDiv = useRef(null);
  const [spt, setSpt] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showListMap, setShowListMap] = useState(false);
  const [selectedMap, setSelectedMap] = useState("");

  config.apiKey =
    "AAPKcfa8335875844ec3a947accb000d9aabChoKNebcrtEXxVF42aBHPA8zbkzPA4D3ipEhEn-JCOQkdyFN0kUL6Kcpxa9Z8toe";

  useEffect(() => {
    if (spt.length == 0) requestSpt();
  }, []);

  useEffect(() => {
    if (showFilter) {
      document.getElementById("logo-filter").style.display = "none";
      document.getElementById("logo-filter").style.opacity = 0;
      document.getElementById("logo-filter").style.transition =
        "all 1s ease-in";
      document.getElementById("filter-variabel").style.display = "block";
      document.getElementById("filter-variabel").style.opacity = 100;
      document.getElementById("filter-variabel").style.transition =
        "all 1s ease-in";
    } else {
      document.getElementById("logo-filter").style.display = "block";
      document.getElementById("logo-filter").style.opacity = 1000;
      document.getElementById("logo-filter").style.transition =
        "all 1s ease-in";
      document.getElementById("filter-variabel").style.display = "none";
      document.getElementById("filter-variabel").style.opacity = 0;
      document.getElementById("filter-variabel").style.transition =
        "all 1s ease-in";
    }
  }, [showFilter]);

  useEffect(() => {
    if (showListMap) {
      document.getElementById("logo-list-data-daerah").style.display = "none";
      document.getElementById("logo-list-data-daerah").style.opacity = 0;
      document.getElementById("logo-list-data-daerah").style.transition =
        "all 1s ease-in";
      document.getElementById("list-data-daerah").style.display = "block";
      document.getElementById("list-data-daerah").style.opacity = 100;
      document.getElementById("list-data-daerah").style.transition =
        "all 1s ease-in";
    } else {
      document.getElementById("logo-list-data-daerah").style.display = "block";
      document.getElementById("logo-list-data-daerah").style.opacity = 1000;
      document.getElementById("logo-list-data-daerah").style.transition =
        "all 1s ease-in";
      document.getElementById("list-data-daerah").style.display = "none";
      document.getElementById("list-data-daerah").style.opacity = 0;
      document.getElementById("list-data-daerah").style.transition =
        "all 1s ease-in";
    }
  }, [showListMap]);

  useEffect(() => {
    if (!isLoading) {
      if (mapDiv.current) {
        const map = new ArcGISMap({
          basemap: "arcgis-imagery",
        });

        const view = new MapView({
          map: map,
          container: mapDiv.current,
          ui: {
            components: ["attribution"],
          },
          extent: {
            xmin: 11467704.3,
            ymin: -1008101.35,
            xmax: 14285478.91,
            ymax: 608393.1,
            spatialReference: 102100,
          },
        });
        var zoom = new Zoom({
          view: view,
        });
        const legend = new Legend({
          view: view,
          container: document.createElement("div"),
        });
        let basemapGallery = new BasemapGallery({
          view: view,
          container: document.createElement("div"),
        });

        const print = new Print({
          view: view,
          printServiceUrl:
            "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
        });

        var bgExpandLegend = new Expand({
          view: view,
          content: legend.container,
          expandIconClass: "esri-icon-layer-list",
        });
        var bgExpandBasemap = new Expand({
          view: view,
          content: basemapGallery.container,
          expandIconClass: "esri-icon-basemap",
        });
        var bgExpandPrint = new Expand({
          view: view,
          content: print,
          expandIconClass: "esri-icon-printer",
        });
        const filterElement = document.getElementById("filter-variabel-place");
        const dataDaerahPlace = document.getElementById("data-daerah-place");

        document
          .getElementById("filter-radio-button")
          .addEventListener("calciteRadioButtonGroupChange", (e) => {
            map.removeAll();
            view.popup.close();
            getNormalMap(map, spt, e.detail);
          });

        if (spt.length > 0) {
          spt.map((s) => {
            document
              .getElementById(`data-daerah-${s["kabupaten/kota"]}`)
              .addEventListener("click", async () => {
                setSelectedMap(s["kabupaten/kota"]);
                document.getElementById(
                  `data-daerah-${s["kabupaten/kota"]}`
                ).style.backgroundColor = "#3e7c17";
                document.getElementById(
                  `data-daerah-${s["kabupaten/kota"]}`
                ).style.color = "#ffffff";
                view.goTo({
                  center: s.lokasi.geometry.coordinates,
                  zoom: 9,
                });
              });
          });
        }

        // Add widget to the top right corner of the view
        view.ui.add(dataDaerahPlace, "top-left");
        view.ui.add(filterElement, "top-right");
        view.ui.add(bgExpandLegend, "top-right");
        view.ui.add(bgExpandBasemap, "top-right");
        view.ui.add(bgExpandPrint, "top-right");
        view.ui.add(zoom, "top-right");
        if (!isLoading) {
          getNormalMap(map, spt, "");
        }
      }
    }
  }, [isLoading, spt]);

  useEffect(() => {
    if (!isLoading) {
      if (spt.length > 0) {
        spt.map((s) => {
          if (!(s["kabupaten/kota"] === selectedMap)) {
            document.getElementById(
              `data-daerah-${s["kabupaten/kota"]}`
            ).style.backgroundColor = "#ffffff";
            document.getElementById(
              `data-daerah-${s["kabupaten/kota"]}`
            ).style.color = "#000000";
          }
        });
      }
    }
  }, [spt, selectedMap, isLoading]);

  async function requestSpt() {
    setIsLoading(true);
    // const data = await fetch("https://garlic-backend.herokuapp.com/api/v1");
    // const dataJSON = await data.json();
    // setSpt(dataJSON);
    setIsLoading(false);
  }

  return (
    <div>
      <div id="data-daerah-place" className={styles.marginTop60}>
        <div id="list-data-daerah" className={styles.listMapBackground}>
          <div className={styles.listMapAlignRight}>
            <button
              className={styles.logo}
              onClick={() => {
                setShowListMap((showListMap) => !showListMap);
              }}
            >
              <i className="gg-close"></i>
            </button>
          </div>
          <div className={styles.textCenter}>List Peta </div>

          <div className={styles.listMap}>
            {spt.length > 0 ? (
              <div>
                {spt.map((s) => (
                  <button
                    id={`data-daerah-${s["kabupaten/kota"]}`}
                    className={styles.buttonSubmit}
                    key={s["kabupaten/kota"]}
                  >
                    {s["kabupaten/kota"]}
                  </button>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <button
          id="logo-list-data-daerah"
          className={styles.logo}
          onClick={() => {
            setShowListMap((showListMap) => !showListMap);
          }}
        >
          <i className="gg-display-grid"></i>
        </button>
      </div>
      <div id="filter-variabel-place">
        <div id="filter-variabel" className={styles.listMapBackground}>
          <div className={styles.listMapAlignRight}>
            <div id="emptyDiv"></div>
            <button
              className={styles.logo}
              onClick={() => {
                setShowFilter((showFilter) => !showFilter);
              }}
            >
              <i className="gg-close"></i>
            </button>
          </div>
          <div className={styles.listMap}>
            <label>
              <calcite-radio-button-group
                id="filter-radio-button"
                name="basic-group"
                layout="vertical"
              >
                <calcite-label layout="inline">
                  <calcite-radio-button value="" checked></calcite-radio-button>
                  Kesesuaian Lahan Bawang Putih
                </calcite-label>
                <div className={styles.marginBottom10}>
                  Kelas Kesesuaian Lahan berdasarkan
                </div>
                <div className={styles.marginBottom10}>
                  <b>Faktor yang tidak dapat dikendalikan</b>
                  <br />
                  <b>dan dikoreksi yaitu faktor cuaca:</b>
                </div>
                <div className={styles.marginBottom10}>1. Faktor cuaca</div>
                <calcite-label layout="inline">
                  <calcite-radio-button value="KelasTemperatur"></calcite-radio-button>
                  Temperatur
                </calcite-label>
                <calcite-label layout="inline">
                  <calcite-radio-button value="KelasCurahHujan"></calcite-radio-button>
                  <span>Curah Hujan</span>
                </calcite-label>

                <div className={styles.marginBottom10}>2. Faktor relief</div>

                <calcite-label layout="inline">
                  <calcite-radio-button value="KelasElevasi"></calcite-radio-button>
                  Elevasi
                </calcite-label>
                <calcite-label layout="inline">
                  <calcite-radio-button value="KelasRelief"></calcite-radio-button>
                  Relief
                </calcite-label>
                <div className={styles.marginBottom10}>
                  <b>Faktor yang efeknya dapat dikoreksi:</b>
                </div>
                <calcite-label layout="inline">
                  <calcite-radio-button value="KelasKejenuhanBasa"></calcite-radio-button>
                  Kejenuhan Basa
                </calcite-label>
                <calcite-label layout="inline">
                  <calcite-radio-button value="KelasKedalamanMineralTanah"></calcite-radio-button>
                  Kedalamanan Mineral Tanah
                </calcite-label>
                <calcite-label layout="inline">
                  <calcite-radio-button value="KelasKemasamanTanah"></calcite-radio-button>
                  Kemasaman Tanah
                </calcite-label>
                <div className={styles.marginBottom10}>
                  <b> Faktor yang dapat dikendalikan:</b>
                </div>
                <calcite-label layout="inline">
                  <calcite-radio-button value="KelasDrainase"></calcite-radio-button>
                  Drainase
                </calcite-label>
                <calcite-label layout="inline">
                  <calcite-radio-button value="KelasKapasitasTukarKation"></calcite-radio-button>
                  Kapasitas Tukar Kation
                </calcite-label>
                <calcite-label layout="inline">
                  <calcite-radio-button value="KelasTeksturTanah"></calcite-radio-button>
                  Tekstur Tanah
                </calcite-label>
              </calcite-radio-button-group>
            </label>
          </div>
        </div>
        <button
          id="logo-filter"
          className={styles.logo}
          onClick={() => {
            setShowFilter((showFilter) => !showFilter);
          }}
        >
          <i className="gg-play-list-search"></i>
        </button>
      </div>

      <div className={styles.mapDiv} ref={mapDiv}></div>

      {isLoading ? (
        <div className={styles.loader}>
          <div className={styles.child}>Load Data</div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

function kelasFaktor(a) {
  if (a === 1) return "N (Tidak Sesuai)";
  else if (a === 2) return "S3 (Sesuai Marjinal)";
  else if (a === 3) return "S2 (Cukup Sesuai)";
  return "S1 (Sangat Sesuai)";
}
const getNormalMap = (map, spt, filter) => {
  if (filter == "") {
    const dt = [];
    for (let s in spt) {
      console.log(spt);
      spt[s].data.map((d) => {
        const k = d.karakteristikTanah[0];
        const karakteristik = d;
        karakteristik.klasifikasiTanah = k.klasifikasiTanah;
        karakteristik.jenisTanah = k.jenisTanah;
        karakteristik.landform = k.landform;
        karakteristik.bahanInduk = k.bahanInduk;
        karakteristik.luas = k.luas.toFixed(2);
        karakteristik.persentaseLuas = k.persentaseLuas.toFixed(2);
        karakteristik.proporsi = k.proporsi == null ? "-" : k.proporsi.id;
        karakteristik.KelasKedalamanMineralTanah =
          k.KelasKedalamanMineralTanah == null
            ? "-"
            : k.KelasKedalamanMineralTanah.jenis;
        karakteristik.KelasDrainase =
          k.KelasDrainase == null ? "-" : k.KelasDrainase.jenis;
        karakteristik.KelasTeksturTanah =
          k.KelasTeksturTanah == null ? "-" : k.KelasTeksturTanah.jenis;
        karakteristik.KelasKemasamanTanah =
          k.KelasKemasamanTanah == null ? "-" : k.KelasKemasamanTanah.jenis;
        karakteristik.KelasKapasitasTukarKation =
          k.KelasKapasitasTukarKation == null
            ? "-"
            : k.KelasKapasitasTukarKation.jenis;
        karakteristik.KelasKejenuhanBasa =
          k.KelasKejenuhanBasa == null ? "-" : k.KelasKejenuhanBasa.jenis;
        karakteristik.KelasRelief =
          k.KelasRelief == null ? "-" : k.KelasRelief.jenis;
        karakteristik.KelasFaktorCuaca =
          k.KelasFaktorCuaca == null ? "-" : k.KelasFaktorCuaca.jenis;
        karakteristik.KelasFaktorRelief =
          k.KelasFaktorRelief == null ? "-" : k.KelasFaktorRelief.jenis;
        karakteristik.KelasFaktorYangDapatDikendalikan =
          k.KelasFaktorYangDapatDikendalikan == null
            ? "-"
            : k.KelasFaktorYangDapatDikendalikan.jenis;
        karakteristik.KelasFaktorYangEfeknyaDapatDikoreksi =
          k.KelasFaktorYangEfeknyaDapatDikoreksi == null
            ? "-"
            : k.KelasFaktorYangEfeknyaDapatDikoreksi.jenis;
        dt.push(karakteristik);
      });
    }

    let polygon;
    const graphicsNormal = dt.map((v) => {
      const k = v.karakteristikTanah[0];
      let kelasNumber = k.KelasSyaratTumbuh.kelas === 1;

      const rings = [];

      v.geom.coordinates.map((g) => rings.push(g[0]));
      if (kelasNumber) {
        let kelas = k.KelasSyaratTumbuh.keterangan;
        v.kelas = kelas;
        polygon = {
          type: "polygon",
          rings,
        };
      }
      return new Graphic({
        geometry: polygon,
        attributes: v,
      });
    });

    const uncoverageGraphics = dt.map((v) => {
      const rings = [];
      rings.push(v.geom.coordinates[0]);
      polygon = {
        type: "polygon",
        rings,
      };
      return new Graphic({
        geometry: polygon,
        attributes: v,
      });
    });

    const graphicsS3 = dt.map((v) => {
      const k = v.karakteristikTanah[0];
      let kelasNumber = k.KelasSyaratTumbuh.kelas === 2;
      const rings = [];
      v.geom.coordinates.map((b) => rings.push(b[0]));
      if (kelasNumber) {
        let kelas = k.KelasSyaratTumbuh.keterangan;

        v.kelas = kelas;
        polygon = {
          type: "polygon",
          rings,
        };
      }

      return new Graphic({
        geometry: polygon,
        attributes: v,
      });
    });

    const graphicsS2 = dt.map((v) => {
      const k = v.karakteristikTanah[0];
      let kelasNumber = k.KelasSyaratTumbuh.kelas === 3;

      const rings = [];
      v.geom.coordinates.map((b) => rings.push(b[0]));
      if (kelasNumber) {
        let kelas = k.KelasSyaratTumbuh.keterangan;
        v.kelas = kelas;
        polygon = {
          type: "polygon",
          rings,
        };
      }
      return new Graphic({
        geometry: polygon,
        attributes: v,
      });
    });

    const graphicsS1 = dt.map((v) => {
      const k = v.karakteristikTanah[0];
      let kelasNumber = k.KelasSyaratTumbuh.kelas === 4;

      const rings = [];
      v.geom.coordinates.map((b) => rings.push(b[0]));
      if (kelasNumber) {
        let kelas = k.KelasSyaratTumbuh.keterangan;
        v.kelas = kelas;
        polygon = {
          type: "polygon",
          rings,
        };
      }

      return new Graphic({
        geometry: polygon,
      });
    });

    const normalLayer = new FeatureLayer({
      fields: [
        {
          name: "ObjectID",
          alias: "ObjectID",
          type: "oid",
        },
        {
          name: "spt",
          alias: "spt",
          type: "string",
        },
        {
          name: "proporsi",
          alias: "proporsi",
          type: "string",
        },
        {
          name: "kelas",
          alias: "kelas",
          type: "string",
        },
        {
          name: "KelasKedalamanMineralTanah",
          alias: "KelasKedalamanMineralTanah",
          type: "string",
        },
        {
          name: "KelasDrainase",
          alias: "KelasDrainase",
          type: "string",
        },
        {
          name: "KelasTeksturTanah",
          alias: "KelasTeksturTanah",
          type: "string",
        },
        {
          name: "KelasKemasamanTanah",
          alias: "KelasKemasamanTanah",
          type: "string",
        },
        {
          name: "KelasKapasitasTukarKation",
          alias: "KelasKapasitasTukarKation",
          type: "string",
        },
        {
          name: "KelasKejenuhanBasa",
          alias: "KelasKejenuhanBasa",
          type: "string",
        },
        {
          name: "landform",
          alias: "landform",
          type: "string",
        },
        {
          name: "bahaninduk",
          alias: "bahaninduk",
          type: "string",
        },
        {
          name: "KelasFaktorRelief",
          alias: "KelasFaktorRelief",
          type: "string",
        },
        {
          name: "luas",
          alias: "luas",
          type: "string",
        },
        {
          name: "persentaseluas",
          alias: "persentaseluas",
          type: "string",
        },
        { name: "klasifikasiTanah", alias: "klasifikasiTanah", type: "string" },
      ],
      objectIdField: "ObjectID",
      geometryType: "polygon",
      source: graphicsNormal,
      renderer: {
        type: "simple",
        symbol: {
          color: "#ab0300",
          type: "simple-fill",
          style: "solid",
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        },
        label: "N: Tidak Sesuai ",
      },
      popupTemplate: {
        title: "No SPT : {spt} (Proporsi {proporsi} )",
        content:
          "<h1>Kelas :  {kelas}</h1>" +
          "<br><b>Kedalam Mineral Tanah : </b> {KelasKedalamanMineralTanah}" +
          "<br><b>Drainase: </b> {KelasDrainase}" +
          "<br><b>Tekstur Tanah:</b> {KelasTeksturTanah}" +
          "<br><b>Kemasaman Tanah: </b> {KelasKemasamanTanah}" +
          "<br><b>Kapasitas Tukar Kation: </b> {KelasKapasitasTukarKation}" +
          "<br><b>Kejenuhan Basa: </b> {KelasKejenuhanBasa}" +
          "<br><b>Land Form: </b> {landform}" +
          "<br><b>Bahan Induk: </b> {bahaninduk}" +
          "<br><b>Relief: </b> {KelasFaktorRelief}" +
          "<br><b>Luas: </b> {luas}" +
          "<br><b>Persentase Luas: </b> {persentaseluas}",
      },
    });

    const s1Layer = new FeatureLayer({
      title: "Layer Kesesuain Lahan",
      fields: [
        {
          name: "ObjectID",
          alias: "ObjectID",
          type: "oid",
        },
        {
          name: "spt",
          alias: "spt",
          type: "string",
        },
        {
          name: "proporsi",
          alias: "proporsi",
          type: "string",
        },
        {
          name: "kelas",
          alias: "kelas",
          type: "string",
        },
        {
          name: "KelasKedalamanMineralTanah",
          alias: "KelasKedalamanMineralTanah",
          type: "string",
        },
        {
          name: "KelasDrainase",
          alias: "KelasDrainase",
          type: "string",
        },
        {
          name: "KelasTeksturTanah",
          alias: "KelasTeksturTanah",
          type: "string",
        },
        {
          name: "KelasKemasamanTanah",
          alias: "KelasKemasamanTanah",
          type: "string",
        },
        {
          name: "KelasKapasitasTukarKation",
          alias: "KelasKapasitasTukarKation",
          type: "string",
        },
        {
          name: "KelasKejenuhanBasa",
          alias: "KelasKejenuhanBasa",
          type: "string",
        },
        {
          name: "landform",
          alias: "landform",
          type: "string",
        },
        {
          name: "bahaninduk",
          alias: "bahaninduk",
          type: "string",
        },
        {
          name: "KelasFaktorRelief",
          alias: "KelasFaktorRelief",
          type: "string",
        },
        {
          name: "luas",
          alias: "luas",
          type: "string",
        },
        {
          name: "persentaseluas",
          alias: "persentaseluas",
          type: "string",
        },
        { name: "klasifikasiTanah", alias: "klasifikasiTanah", type: "string" },
      ],
      objectIdField: "ObjectID",
      geometryType: "polygon",
      source: graphicsS1,
      renderer: {
        type: "simple",
        symbol: {
          color: "#00FF7F",
          type: "simple-fill",
          style: "solid",
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        },
        label: "S1: Sangat Sesuai",
      },
      popupTemplate: {
        title: "No SPT : {spt} (Proporsi {proporsi} )",
        content:
          "<h1>Kelas :  {kelas}</h1>" +
          "<br><b>Kedalam Mineral Tanah : </b> {KelasKedalamanMineralTanah}" +
          "<br><b>Drainase: </b> {KelasDrainase}" +
          "<br><b>Tekstur Tanah:</b> {KelasTeksturTanah}" +
          "<br><b>Kemasaman Tanah: </b> {KelasKemasamanTanah}" +
          "<br><b>Kapasitas Tukar Kation: </b> {KelasKapasitasTukarKation}" +
          "<br><b>Kejenuhan Basa: </b> {KelasKejenuhanBasa}" +
          "<br><b>Land Form: </b> {landform}" +
          "<br><b>Bahan Induk: </b> {bahaninduk}" +
          "<br><b>Relief: </b> {KelasFaktorRelief}" +
          "<br><b>Luas: </b> {luas}" +
          "<br><b>Persentase Luas: </b> {persentaseluas}",
      },
    });

    const s2Layer = new FeatureLayer({
      fields: [
        {
          name: "ObjectID",
          alias: "ObjectID",
          type: "oid",
        },
        {
          name: "spt",
          alias: "spt",
          type: "string",
        },
        {
          name: "proporsi",
          alias: "proporsi",
          type: "string",
        },
        {
          name: "kelas",
          alias: "kelas",
          type: "string",
        },
        {
          name: "KelasKedalamanMineralTanah",
          alias: "KelasKedalamanMineralTanah",
          type: "string",
        },
        {
          name: "KelasDrainase",
          alias: "KelasDrainase",
          type: "string",
        },
        {
          name: "KelasTeksturTanah",
          alias: "KelasTeksturTanah",
          type: "string",
        },
        {
          name: "KelasKemasamanTanah",
          alias: "KelasKemasamanTanah",
          type: "string",
        },
        {
          name: "KelasKapasitasTukarKation",
          alias: "KelasKapasitasTukarKation",
          type: "string",
        },
        {
          name: "KelasKejenuhanBasa",
          alias: "KelasKejenuhanBasa",
          type: "string",
        },
        {
          name: "landform",
          alias: "landform",
          type: "string",
        },
        {
          name: "bahaninduk",
          alias: "bahaninduk",
          type: "string",
        },
        {
          name: "KelasFaktorRelief",
          alias: "KelasFaktorRelief",
          type: "string",
        },
        {
          name: "luas",
          alias: "luas",
          type: "string",
        },
        {
          name: "persentaseluas",
          alias: "persentaseluas",
          type: "string",
        },
        { name: "klasifikasiTanah", alias: "klasifikasiTanah", type: "string" },
      ],
      objectIdField: "ObjectID",
      geometryType: "polygon",
      source: graphicsS2,
      renderer: {
        type: "simple",
        symbol: {
          color: "#FFE600",
          type: "simple-fill",
          style: "solid",
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        },
        label: "S2: Cukup Sesuai",
      },
      popupTemplate: {
        title: "No SPT : {spt} (Proporsi {proporsi} )",
        content:
          "<h1>Kelas :  {kelas}</h1>" +
          "<br><b>Kedalam Mineral Tanah : </b> {KelasKedalamanMineralTanah}" +
          "<br><b>Drainase: </b> {KelasDrainase}" +
          "<br><b>Tekstur Tanah:</b> {KelasTeksturTanah}" +
          "<br><b>Kemasaman Tanah: </b> {KelasKemasamanTanah}" +
          "<br><b>Kapasitas Tukar Kation: </b> {KelasKapasitasTukarKation}" +
          "<br><b>Kejenuhan Basa: </b> {KelasKejenuhanBasa}" +
          "<br><b>Land Form: </b> {landform}" +
          "<br><b>Bahan Induk: </b> {bahaninduk}" +
          "<br><b>Relief: </b> {KelasFaktorRelief}" +
          "<br><b>Luas: </b> {luas}" +
          "<br><b>Persentase Luas: </b> {persentaseluas}",
      },
    });

    const s3Layer = new FeatureLayer({
      fields: [
        {
          name: "ObjectID",
          alias: "ObjectID",
          type: "oid",
        },
        {
          name: "spt",
          alias: "spt",
          type: "string",
        },
        {
          name: "proporsi",
          alias: "proporsi",
          type: "string",
        },
        {
          name: "kelas",
          alias: "kelas",
          type: "string",
        },
        {
          name: "KelasKedalamanMineralTanah",
          alias: "KelasKedalamanMineralTanah",
          type: "string",
        },
        {
          name: "KelasDrainase",
          alias: "KelasDrainase",
          type: "string",
        },
        {
          name: "KelasTeksturTanah",
          alias: "KelasTeksturTanah",
          type: "string",
        },
        {
          name: "KelasKemasamanTanah",
          alias: "KelasKemasamanTanah",
          type: "string",
        },
        {
          name: "KelasKapasitasTukarKation",
          alias: "KelasKapasitasTukarKation",
          type: "string",
        },
        {
          name: "KelasKejenuhanBasa",
          alias: "KelasKejenuhanBasa",
          type: "string",
        },
        {
          name: "landform",
          alias: "landform",
          type: "string",
        },
        {
          name: "bahaninduk",
          alias: "bahaninduk",
          type: "string",
        },
        {
          name: "KelasFaktorRelief",
          alias: "KelasFaktorRelief",
          type: "string",
        },
        {
          name: "luas",
          alias: "luas",
          type: "string",
        },
        {
          name: "persentaseluas",
          alias: "persentaseluas",
          type: "string",
        },
        { name: "klasifikasiTanah", alias: "klasifikasiTanah", type: "string" },
      ],
      objectIdField: "ObjectID",
      geometryType: "polygon",
      source: graphicsS3,
      renderer: {
        type: "simple",
        symbol: {
          color: "#ff8400",
          type: "simple-fill",
          style: "solid",
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        },
        label: "S3: Sesuai Marginal",
      },
      popupTemplate: {
        title: "No SPT : {spt} (Proporsi {proporsi} )",
        content:
          "<h1>Kelas :  {kelas}</h1>" +
          "<br><b>Kedalam Mineral Tanah : </b> {KelasKedalamanMineralTanah}" +
          "<br><b>Drainase: </b> {KelasDrainase}" +
          "<br><b>Tekstur Tanah:</b> {KelasTeksturTanah}" +
          "<br><b>Kemasaman Tanah: </b> {KelasKemasamanTanah}" +
          "<br><b>Kapasitas Tukar Kation: </b> {KelasKapasitasTukarKation}" +
          "<br><b>Kejenuhan Basa: </b> {KelasKejenuhanBasa}" +
          "<br><b>Land Form: </b> {landform}" +
          "<br><b>Bahan Induk: </b> {bahaninduk}" +
          "<br><b>Relief: </b> {KelasFaktorRelief}" +
          "<br><b>Luas: </b> {luas}" +
          "<br><b>Persentase Luas: </b> {persentaseluas}",
      },
    });

    map.add(normalLayer);
    map.add(s3Layer);
    map.add(s2Layer);
    map.add(s1Layer);
  } else {
    const dt = [];
    for (let s in spt) {
      spt[s].data.map((d) => {
        console.log(d);
        const k = d.karakteristikTanah[0];
        if (k[filter] != null) {
          const karakteristik = d;
          karakteristik.kelas = k[filter].kelas;
          karakteristik.jenis = k[filter].jenis;
          karakteristik.rekomendasi =
            k[filter].rekomendasi == null ? "-" : k[filter].rekomendasi;
          dt.push(karakteristik);
        }
      });
    }
    let polygon;

    const graphicsNormal = dt.map((v) => {
      v.dataKelas = v.kelas == undefined ? "-" : kelasFaktor(v.kelas);
      v.filter = filter;
      const rings = [];
      v.geom.coordinates.map((b) => rings.push(b[0]));
      if (v.kelas === 1) {
        polygon = {
          type: "polygon",
          rings,
        };
      }

      return new Graphic({
        geometry: polygon,
        attributes: v,
      });
    });

    const graphicsS3 = dt.map((v) => {
      const rings = [];
      v.geom.coordinates.map((b) => rings.push(b[0]));
      if (v.kelas === 2) {
        polygon = {
          type: "polygon",
          rings,
        };
      }

      return new Graphic({
        geometry: polygon,
        attributes: v,
      });
    });

    const graphicsS2 = dt.map((v) => {
      const rings = [];
      v.geom.coordinates.map((b) => rings.push(b[0]));
      if (v.kelas === 3) {
        polygon = {
          type: "polygon",
          rings,
        };
      }
      return new Graphic({
        geometry: polygon,
        attributes: v,
      });
    });

    const graphicsS1 = dt.map((v) => {
      const rings = [];
      v.geom.coordinates.map((b) => rings.push(b[0]));
      if (v.kelas === 4) {
        polygon = {
          type: "polygon",
          rings,
        };
      }

      return new Graphic({
        geometry: polygon,
        attributes: v,
      });
    });

    const normalLayer = new FeatureLayer({
      fields: [
        {
          name: "ObjectID",
          alias: "ObjectID",
          type: "oid",
        },
        {
          name: "spt",
          alias: "spt",
          type: "string",
        },
        {
          name: "proporsi",
          alias: "proporsi",
          type: "string",
        },
        {
          name: "dataKelas",
          alias: "dataKelas",
          type: "string",
        },
        {
          name: "kelas",
          alias: "kelas",
          type: "string",
        },
        {
          name: "jenis",
          alias: "jenis",
          type: "string",
        },
        {
          name: "filter",
          alias: "filter",
          type: "string",
        },
        {
          name: "rekomendasi",
          alias: "rekomendasi",
          type: "string",
        },
      ],
      objectIdField: "ObjectID",
      geometryType: "polygon",
      source: graphicsNormal,
      renderer: {
        type: "simple",
        symbol: {
          color: "#ab0300",
          type: "simple-fill",
          style: "solid",
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        },
        label: "N",
      },
      popupTemplate: {
        title: "No SPT : {spt} (Proporsi {proporsi} )",
        content:
          "<h1> {filter}</h1>" +
          "<br><b>Kelas:</b> {dataKelas}" +
          "<br><b>Jenis : </b> {jenis}" +
          "<br><b>Rekomendasi: </b> {rekomendasi}",
      },
    });

    const s1Layer = new FeatureLayer({
      title: "Layer Kesesuain Lahan",
      fields: [
        {
          name: "ObjectID",
          alias: "ObjectID",
          type: "oid",
        },
        {
          name: "spt",
          alias: "spt",
          type: "string",
        },
        {
          name: "proporsi",
          alias: "proporsi",
          type: "string",
        },
        {
          name: "dataKelas",
          alias: "dataKelas",
          type: "string",
        },
        {
          name: "kelas",
          alias: "kelas",
          type: "string",
        },
        {
          name: "jenis",
          alias: "jenis",
          type: "string",
        },
        {
          name: "filter",
          alias: "filter",
          type: "string",
        },
        {
          name: "rekomendasi",
          alias: "rekomendasi",
          type: "string",
        },
      ],
      objectIdField: "ObjectID",
      geometryType: "polygon",
      source: graphicsS1,
      renderer: {
        type: "simple",
        symbol: {
          color: "#00FF7F",
          type: "simple-fill",
          style: "solid",
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        },
        label: "S1",
      },
      popupTemplate: {
        title: "No SPT : {spt} (Proporsi {proporsi} )",
        content:
          "<h1>{filter}</h1>" +
          "<br><b>Kelas:</b> {dataKelas}" +
          "<br><b>Jenis : </b> {jenis}" +
          "<br><b>Rekomendasi: </b> {rekomendasi}",
      },
    });

    const s2Layer = new FeatureLayer({
      fields: [
        {
          name: "ObjectID",
          alias: "ObjectID",
          type: "oid",
        },
        {
          name: "spt",
          alias: "spt",
          type: "string",
        },
        {
          name: "proporsi",
          alias: "proporsi",
          type: "string",
        },
        {
          name: "dataKelas",
          alias: "dataKelas",
          type: "string",
        },
        {
          name: "kelas",
          alias: "kelas",
          type: "string",
        },
        {
          name: "jenis",
          alias: "jenis",
          type: "string",
        },
        {
          name: "filter",
          alias: "filter",
          type: "string",
        },
        {
          name: "rekomendasi",
          alias: "rekomendasi",
          type: "string",
        },
      ],
      objectIdField: "ObjectID",
      geometryType: "polygon",
      source: graphicsS2,
      renderer: {
        type: "simple",
        symbol: {
          color: "#FFE600",
          type: "simple-fill",
          style: "solid",
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        },
        label: "S2",
      },
      popupTemplate: {
        title: "No SPT : {spt} (Proporsi {proporsi} )",
        content:
          "<h1> {filter}</h1>" +
          "<br><b>Kelas:</b> {dataKelas}" +
          "<br><b>Jenis : </b> {jenis}" +
          "<br><b>Rekomendasi: </b> {rekomendasi}",
      },
    });

    const s3Layer = new FeatureLayer({
      fields: [
        {
          name: "ObjectID",
          alias: "ObjectID",
          type: "oid",
        },
        {
          name: "spt",
          alias: "spt",
          type: "string",
        },
        {
          name: "proporsi",
          alias: "proporsi",
          type: "string",
        },
        {
          name: "dataKelas",
          alias: "dataKelas",
          type: "string",
        },
        {
          name: "kelas",
          alias: "kelas",
          type: "string",
        },
        {
          name: "jenis",
          alias: "jenis",
          type: "string",
        },
        {
          name: "filter",
          alias: "filter",
          type: "string",
        },
        {
          name: "rekomendasi",
          alias: "rekomendasi",
          type: "string",
        },
      ],
      objectIdField: "ObjectID",
      geometryType: "polygon",
      source: graphicsS3,
      renderer: {
        type: "simple",
        symbol: {
          color: "#ff8400",
          type: "simple-fill",
          style: "solid",
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        },
        label: "S3",
      },
      popupTemplate: {
        title: "No SPT : {spt} (Proporsi {proporsi} )",
        content:
          "<h1> {filter}</h1>" +
          "<br><b>Kelas:</b> {dataKelas}" +
          "<br><b>Jenis : </b> {jenis}" +
          "<br><b>Rekomendasi: </b> {rekomendasi}",
      },
    });
    map.add(normalLayer);
    map.add(s3Layer);
    map.add(s2Layer);
    map.add(s1Layer);
  }
};

export default FilterEsriMap;
