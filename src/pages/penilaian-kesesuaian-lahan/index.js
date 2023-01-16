import Head from "next/head";
import { useState } from "react";
import HomeHeader from "../../components/HeaderNotSticky";
import NavigationDrawer from "../../components/NavigationDrawer";
import Footer from "../../components/Footer";
import FormikInput from "../../components/input/FormikInput";
import storage from "../../redux/storage";

function Index() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(true);
  const [modal, setModal] = useState(false);
  const auth = storage.get("auth", {
    token: "",
    user: {
      nama: "",
    },
  });
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClick = () => {
    setActive(!active);
  };

  const showModalParent = (modal) => {
    setModal(modal);
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
            <header className="flex items-center text-semibold text-gray-100 bg-primary-white ">
              <HomeHeader active={active} handleClick={handleClick} />
            </header>
            <div className="  overflow-y-auto paragraph bg-primary-dark">
              <main>
                <div className="container mx-auto my-16 ">
                  <div className="md:mt-0 md:col-span-2 flex-grow bg-white mx-40 p-8 rounded">
                    <h2 className=" text-center text-3xl font-extrabold text-gray-900">
                      Masukkan Data Syarat Tumbuh Bawang Putih
                    </h2>
                    <FormikInput showModalParent={showModalParent} />
                  </div>
                </div>
                <Footer background="bg-white" textColor="text-black" />
                <div
                  className={`${
                    open ? "hidden" : ""
                  } fixed  bg-black bg-opacity-30 fixed inset-0 z-10 flex items-center justify-center overflow-auto w-full h-full`}
                >
                  <div
                    className="fixed z-10 inset-0 overflow-y-auto"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                  >
                    <div className="flex items-end justify-center  pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                      <div className="inline-block w-1/2 mt-16 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all ">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div className="justify-center sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <h3
                                className="text-xl font-bold leading-6 font-medium text-gray-900"
                                id="modal-title"
                                align="center"
                              >
                                Kesesuaian Lahan Kamu berada pada kelas S1
                              </h3>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  Are you sure you want to deactivate your
                                  account? All of your data will be permanently
                                  removed. This action cannot be undone.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleOpen}
                          >
                            Selesai
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
