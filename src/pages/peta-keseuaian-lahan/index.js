import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import HomeHeader from "../../components/HomeHeader";
import NavigationDrawer from "../../components/NavigationDrawer";
import styles from "../../styles/EsriMap.module.css";
import storage from "../../redux/storage";

const EsriMapWithNoSSR = dynamic(
  () => import("../../components/FilterEsriMap"),
  {
    ssr: false,
  }
);

function Index() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  const auth = storage.get("auth", {
    token: "",
    user: {
      nama: "",
    },
  });
  return (
    <div className="flex font-display flex-col h-screen bg-white">
      <Head>
        <title>INA Agro-GARLIC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="  overflow-y-auto paragraph">
          <main>
            <div className="flex-grow bg-white">
              <EsriMapWithNoSSR />
            </div>
        </main>
      </div>
    </div>
  );
}

export default Index;
