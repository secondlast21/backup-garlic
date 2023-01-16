import { useState, useEffect } from "react";
import ContentLeft from "../components/ContentLeft";
import ContentRight from "../components/ContentRight";
import HomeHeader from "../components/HomeHeader";
import NavigationDrawer from "../components/NavigationDrawer";
import Footer from "../components/Footer";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import storage from "../redux/storage";
import LoginModal from "../components/LoginModal";

export default function Home() {
  const [active, setActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const auth = storage.get("auth", {
    token: "",
    user: {
      nama: "",
    },
  });

  const handleClick = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (auth.token !== "") {
      recheckToken();
    }
  }, []);

  const recheckToken = async () => {
    const requestOptionsProfile = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
    };
    const responseProfile = await fetch(
      "https://garlic-backend.herokuapp.com/api/v1/akun",
      requestOptionsProfile
    );
    console.log(responseProfile);
    if (!responseProfile.ok) {
      setIsOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-screen font-display bg-white">
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
          <NavigationDrawer
            token={auth.token}
            nama={auth.user.nama}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        </aside>
        <div className="flex flex-1 flex-col ">
          <header className="flex items-center text-semibold text-gray-100 bg-primary-white ">
            <HomeHeader active={active} handleClick={handleClick} />
          </header>
          <div className="flex-1 flex-col   overflow-y-auto paragraph">
            <main className="flex-grow bg-white">
              <ContentRight />
              <ContentLeft />
            </main>
            <Footer background="bg-primary-dark" textColor="text-white" />
          </div>
          {isOpen && (
            <div className="w-full h-full bg-gray-900 bg-opacity-80 top-0 fixed sticky-0">
              <div className="2xl:container  2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center">
                <div className="max-w-md w-full space-y-8 ">
                  <LoginModal />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
