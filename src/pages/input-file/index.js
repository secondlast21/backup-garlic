import Head from "next/head";
import { useState } from "react";
import HomeHeader from "../../components/HomeHeader";
import NavigationDrawer from "../../components/NavigationDrawer";
import Footer from "../../components/Footer";
import FormikUploadFile from "../../components/inputFile/FormikUploadFile";
import storage from "../../redux/storage";

function Index() {
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
            <header className="flex items-center text-semibold text-gray-100 bg-primary-white ">
              <HomeHeader active={active} handleClick={handleClick} />
            </header>
            <div className="flex-grow  overflow-y-auto paragraph bg-primary-dark">
              <main>
                <div className="container mx-auto my-16">
                  <div className=" md:mt-0 md:col-span-2 flex-grow bg-white  mx-40 p-8 rounded">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 ">
                      Upload File SPT
                    </h2>
                    <FormikUploadFile />
                  </div>
                </div>
                <Footer background="bg-white" textColor="text-black" />
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
