import Head from "next/head";
import React, { useEffect, useState } from "react";
import HomeHeader from "../../components/HeaderNotSticky";
import NavigationDrawer from "../../components/NavigationDrawer";
import Footer from "../../components/Footer";
import storage from "../../redux/storage";
import Table from "../../components/Table";

function Index() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [daerah, setDaerah] = useState([]);
  const auth = storage.get("auth", {
    token: "",
    user: {
      nama: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const response = await fetch(
      "https://garlic-backend.herokuapp.com/api/v1/download/listDaerah"
    );
    const data = await response.json();
    for (const d in data) {
      data[d].link = data[d]["kabupaten/kota"];
    }
    if (data) {
      setLoading(false);
      setDaerah(data);
    }
  }

  const handleDownload = (value) => {
    fetch(
      "https://garlic-backend.herokuapp.com/api/v1/download/karakteristikDaerah?kabupaten/kota=" +
        value
    )
      .then((response) => response.text())
      .then((data) => {
        window.location.href = data;
      });
  };

  const handleDownloadShapeFile = (value) => {
    fetch(
      `https://garlic-backend.herokuapp.com/api/v1/download/shapefile/Bearer ${auth.token}?kabupaten/kota=${value}`
    )
      .then((response) => response.text())
      .then((data) => {
        window.location.href = `https://garlic-backend.herokuapp.com/api/v1/download/shapefile/Bearer ${auth.token}?kabupaten/kota=${value}`;
      });
  };

  const handleClick = () => {
    setActive(!active);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Nama Daerah",
        isRight: false,
        accessor: "kabupaten/kota",
      },
      {
        Header: () => {
          return <div className="text-right ">Download</div>;
        },
        isRight: true,
        accessor: "link",
        Cell: ({ value }) => {
          return (
            <div className="text-right ">
              <button onClick={() => handleDownload(value)} className="btn m-1">
                CSV
              </button>
              <button
                onClick={() => handleDownloadShapeFile(value)}
                className="btn m-1"
              >
                SHP
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const data = React.useMemo(() => daerah, [daerah]);

  return (
    <>
      <div className="flex flex-col font-display h-screen bg-white text-black">
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
            <header className="flex items-center text-semibold text-gray-100 bg-primary-white ">
              <HomeHeader active={active} handleClick={handleClick} />
            </header>
            <div className="flex-grow  overflow-y-auto paragraph bg-primary-dark">
              <main>
                <div className=" container mx-auto my-16 ">
                  <div className=" flex-grow bg-white mx-40 p-8 rounded">
                    <div className="mt-6">
                      {loading && <div>loading</div>}
                      {!loading && (
                        <div>
                          <div className="text-center	text-3xl">
                            Data Daerah BBSDLP
                          </div>
                          <Table columns={columns} data={data} />
                          <div className="text-primary-red	">
                            Data yang digunakan bersumber dari Badan BSDLP dan
                            belum diolah
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </main>
            </div>
            <Footer background="bg-white" textColor="text-black" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
