import "tailwindcss/tailwind.css";

import Head from "next/head";
import { store } from "./../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;600&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://js.arcgis.com/4.14/esri/css/main.css"
          />
          <script
            type="module"
            src="https://js.arcgis.com/calcite-components/1.0.0-beta.76/calcite.esm.js"
          ></script>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://js.arcgis.com/calcite-components/1.0.0-beta.76/calcite.css"
          />
          <script src="https://js.arcgis.com/4.20/"></script>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
          <link
            href="https://fonts.googleapis.com/css?family=Poppins"
            rel="stylesheet"
          />
          <link href="https://css.gg/display-grid.css" rel="stylesheet" />
          <link href="https://css.gg/close.css" rel="stylesheet"></link>
          <link href="https://css.gg/play-list-search.css" rel="stylesheet" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/creativetimofficial/tailwind-starter-kit/tailwind.css"
          />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
