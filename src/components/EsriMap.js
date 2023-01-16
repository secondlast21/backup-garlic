import React, { useRef, useEffect, useState, useMemo } from "react";
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

function EsriMap() {
  const mapDiv = useRef(null);
  const [spt, setSpt] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showListMap, setShowListMap] = useState(false);
  const [selectedMap, setSelectedMap] = useState("");

  useEffect(() => {
    if (spt.length == 0) requestSpt();
  }, []);

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
        /**
         * Initialize application
         */
        const map = new ArcGISMap({
          basemap: "gray-vector",
        });

        const view = new MapView({
          map: map,
          container: mapDiv.current,
          ui: {
            components: ["attribution"],
          },
          extent: {
            // autocasts as new Extent()
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

        var print = new Print({
          view: view,
          // specify your own print service
          printServiceUrl:
            "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
          container: document.createElement("div"),
        });

        // Add widget to the top right corner of the view
        var bgExpandPrint = new Expand({
          view: view,
          content: print.container,
          expandIconClass: "esri-icon-printer",
        });

        legend.hideLayersNotInCurrentView = true;
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

        const dataDaerahPlace = document.getElementById("data-daerah-place");
        if (spt.length > 0) {
          spt.map((s) => {
            //console.log(s);
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
        view.ui.add(dataDaerahPlace, "top-left");
        // Add widget to the top right corner of the view
        view.ui.add(bgExpandLegend, "top-right");
        view.ui.add(bgExpandBasemap, "top-right");
        view.ui.add(bgExpandPrint, "top-right");
        // view.ui.add(document.getElementById("actions"), "bottom-left");
        getNormalMap(map, spt);
      }
    }
  }, [spt, isLoading]);

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
    // const data = await fetch("https://garlic-backend.herokuapp.com");
    // const dataJSON = await data.json();
    // setSpt(dataJSON);
    setIsLoading(false);
  }

  return (
    <div>
      <div className={styles.mapDiv} ref={mapDiv}></div>
      {isLoading ? (
        <div className={styles.loader}>
          <div className={styles.child}>Load Data</div>
        </div>
      ) : (
        <div id="data-daerah-place">
          <div id="list-data-daerah" className={styles.listMapBackground}>
            <div className={styles.listMapAlignRight}>
              <button
                className={styles.margin10}
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
                      Daerah {s["kabupaten/kota"]}
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
      )}
    </div>
  );
}

function kelasFaktor(a, b) {
  if (a < 2 && b < 2) return "Kelas S1, Sangat Sesuai";
  else if (a < 3 && b < 3) return "Kelas S2, Cukup Sesuai";
  else if (a == 3 || b == 3) return "Kelas S3, Sesuai Marginal";
  return "Kelas N, Tidak Sesuai";
}

const getNormalMap = (map, spt) => {
  const dt = [];
  for (let s in spt) {
    spt[s].data.map((d) => {
      //     console.log(d);
      if (d.karakteristikTanah.length > 0) {
        d.karakteristikTanah.map((k) => {
          const karakteristik = d;
          karakteristik.klasifikasiTanah = k.klasifikasiTanah;
          karakteristik.jenisTanah = k.jenisTanah;
          karakteristik.landform = k.landform;
          karakteristik.bahanInduk = k.bahanInduk;
          karakteristik.luas = k.luas;
          karakteristik.persentaseLuas = k.persentaseLuas;
          karakteristik.proporsi = k.proporsi.id;
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
      } else {
        const karakteristik = d;
        karakteristik.klasifikasiTanah = d.karakteristikTanah.klasifikasiTanah;
        karakteristik.jenisTanah = d.karakteristikTanah.jenisTanah;
        karakteristik.landform = d.karakteristikTanah.landform;
        karakteristik.bahanInduk = d.karakteristikTanah.bahanInduk;
        karakteristik.luas = d.karakteristikTanah.luas;
        karakteristik.persentaseLuas = d.karakteristikTanah.persentaseLuas;
        karakteristik.proporsi = d.karakteristikTanah.proporsi.id;
        karakteristik.KelasKedalamanMineralTanah =
          d.karakteristikTanah.KelasKedalamanMineralTanah == null
            ? "-"
            : d.karakteristikTanah.KelasKedalamanMineralTanah.jenis;
        karakteristik.KelasDrainase =
          d.karakteristikTanah.KelasDrainase == null
            ? "-"
            : d.karakteristikTanah.KelasDrainase.jenis;
        karakteristik.KelasTeksturTanah =
          d.karakteristikTanah.KelasTeksturTanah == null
            ? "-"
            : d.karakteristikTanah.KelasTeksturTanah.jenis;
        karakteristik.KelasKemasamanTanah =
          d.karakteristikTanah.KelasKemasamanTanah == null
            ? "-"
            : d.karakteristikTanah.KelasKemasamanTanah.jenis;
        karakteristik.KelasKapasitasTukarKation =
          d.karakteristikTanah.KelasKapasitasTukarKation == null
            ? "-"
            : d.karakteristikTanah.KelasKapasitasTukarKation.jenis;
        karakteristik.KelasKejenuhanBasa =
          d.karakteristikTanah.KelasKejenuhanBasa == null
            ? "-"
            : d.karakteristikTanah.KelasKejenuhanBasa.jenis;
        karakteristik.KelasRelief =
          d.karakteristikTanah.KelasRelief == null
            ? "-"
            : d.karakteristikTanah.KelasRelief.jenis;
        karakteristik.KelasFaktorCuaca =
          d.karakteristikTanah.KelasFaktorCuaca == null
            ? "-"
            : d.karakteristikTanah.KelasFaktorCuaca.jenis;
        karakteristik.KelasFaktorRelief =
          d.karakteristikTanah.KelasFaktorRelief == null
            ? "-"
            : d.karakteristikTanah.KelasFaktorRelief.jenis;
        karakteristik.KelasFaktorYangDapatDikendalikan =
          d.karakteristikTanah.KelasFaktorYangDapatDikendalikan == null
            ? "-"
            : d.karakteristikTanah.KelasFaktorYangDapatDikendalikan.jenis;
        karakteristik.KelasFaktorYangEfeknyaDapatDikoreksi =
          d.karakteristikTanah.KelasFaktorYangEfeknyaDapatDikoreksi == null
            ? "-"
            : d.karakteristikTanah.KelasFaktorYangEfeknyaDapatDikoreksi.jenis;
        dt.push(karakteristik);
      }
      dt.push(d);
    });
  }

  let polygon;
  const graphicsNormal = dt.map((v) => {
    const spt = v.spt;
    const kelasList = [];
    v.karakteristikTanah.map((k) => {
      kelasList.push(
        kelasFaktor(
          k.KelasFaktorYangDapatDikendalikan.kelas,
          k.KelasFaktorYangEfeknyaDapatDikoreksi.kelas
        )
      );
      k.kelas = kelasFaktor(
        k.KelasFaktorYangDapatDikendalikan.kelas,
        k.KelasFaktorYangEfeknyaDapatDikoreksi.kelas
      );
      k.spt = spt;
    });

    let kelas = kelasList.reduce((total, k) => {
      return kelasFaktor(total, k);
    });
    v.kelas = kelas;
    polygon = {
      type: "polygon",
      rings: v.geom.coordinates[0][0],
    };
    return new Graphic({
      geometry: polygon,
      attributes: v,
    });
  });

  const graphicsS3 = dt.map((v) => {
    const kelasList = [];
    v.karakteristikTanah.map((k) => {
      kelasList.push(
        k.KelasFaktorYangDapatDikendalikan.kelas == 3 ||
          k.KelasFaktorYangEfeknyaDapatDikoreksi.kelas == 3
      );
    });

    let kelas = kelasList.reduce((total, k) => {
      return total || k;
    });
    if (kelas) {
      polygon = {
        type: "polygon",
        rings: v.geom.coordinates[0][0],
      };
    }

    return new Graphic({
      geometry: polygon,
      // attributes: v,
    });
  });

  const graphicsS2 = dt.map((v) => {
    const kelasList = [];
    v.karakteristikTanah.map((k) => {
      kelasList.push(
        k.KelasFaktorYangDapatDikendalikan.kelas < 3 &&
          k.KelasFaktorYangEfeknyaDapatDikoreksi.kelas < 3
      );
    });

    let kelas = kelasList.reduce((total, k) => {
      return total || k;
    });

    if (kelas) {
      polygon = {
        type: "polygon",
        rings: v.geom.coordinates[0][0],
      };
    }
    return new Graphic({
      geometry: polygon,
      //attributes: v,
    });
  });

  const graphicsS1 = dt.map((v) => {
    const kelasList = [];
    v.karakteristikTanah.map((k) => {
      kelasList.push(
        k.KelasFaktorYangDapatDikendalikan.kelas < 2 &&
          k.KelasFaktorYangEfeknyaDapatDikoreksi.kelas < 2
      );
    });

    let kelas = kelasList.reduce((total, k) => {
      return total || k;
    });
    //console.log(kelasList);
    if (kelas) {
      polygon = {
        type: "polygon",
        rings: v.geom.coordinates[0][0],
      };
    }

    return new Graphic({
      geometry: polygon,
      //attributes: v,
    });
  });

  // console.log(graphicsNormal);
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
        name: "relief",
        alias: "relief",
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
        color: "#F70400",
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
        "<br><b>Kedalam Mineral Tanah : </b> {KelasKedalamanMineralTanah}" +
        "<br><b>Drainase: </b> {KelasDrainase}" +
        "<br><b>Tekstur Tanah:</b> {KelasTeksturTanah}" +
        "<br><b>Kemasaman Tanah: </b> {KelasKemasamanTanah}" +
        "<br><b>Kapasitas Tukar Kation: </b> {KelasKapasitasTukarKation}" +
        "<br><b>Kejenuhan Basa: </b> {KelasKejenuhanBasa}" +
        "<br><b>Land Form: </b> {landform}" +
        "<br><b>Bahan Induk: </b> {bahaninduk}" +
        "<br><b>Relief: </b> {relief}" +
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
  });

  const s2Layer = new FeatureLayer({
    fields: [
      {
        name: "ObjectID",
        alias: "ObjectID",
        type: "oid",
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
  });

  const s3Layer = new FeatureLayer({
    fields: [
      {
        name: "ObjectID",
        alias: "ObjectID",
        type: "oid",
      },
    ],
    objectIdField: "ObjectID",
    geometryType: "polygon",
    source: graphicsS3,
    renderer: {
      type: "simple",
      symbol: {
        color: "#FF4400",
        type: "simple-fill",
        style: "solid",
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      },
      label: "S3",
    },
  });
  map.add(normalLayer);
  map.add(s3Layer);
  map.add(s2Layer);
  map.add(s1Layer);
};

export default EsriMap;
