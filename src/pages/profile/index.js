import Head from "next/head";
import { useState } from "react";
import HomeHeader from "../../components/HeaderNotSticky";
import NavigationDrawer from "../../components/NavigationDrawer";
import Footer from "../../components/Footer";
import FormikInput from "../../components/input/FormikInput";
import storage from "../../redux/storage";
import { useDispatch } from "react-redux";
import { clearAuth } from "../../redux/actions/authAction";
import { useRouter } from "next/router";

function Index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const auth = storage.get("auth", {
    token: "",
    user: {
      nama: "",
      email: "",
      nomorTelepon: "",
      alamat: "",
      kebutuhan: "",
      jenisUnitIPB: "",
    },
  });

  const handleClick = () => {
    setActive(!active);
  };

  const handleLogout = () => {
    dispatch(clearAuth());
    router.replace("/login");
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-white">
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
            <div className="flex-grow  overflow-y-auto paragraph bg-primary-dark ">
              <main>
                <div className="container mx-auto my-16 ">
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="flex">
                      <div className="flex-grow px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Profil Pengguna
                        </h3>
                      </div>
                      <div className="flex-none px-4 py-5 sm:px-6 cursor-auto">
                        <button className=" leading-6 font-medium text-gray-900 hover:underline">
                          Edit Profil
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Nama Lengkap
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {auth.user.nama}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Email
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {auth.user.email}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Nomor Telepon
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {auth.user.nomorTelepon}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Alamat
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {auth.user.alamat}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Kebutuhan
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {auth.user.kebutuhan}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Jenis Unit IPB
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {auth.user.jenisUnitIPB}
                          </dd>
                        </div>
                      </dl>
                      <div className="flex m-4">
                        <div className="flex-grow"> </div>
                        <div className="flex-none">
                          <button
                            type="submit"
                            onClick={handleLogout}
                            className={`bg-primary-coco flex-none hover:bg-primary-darkcoco text-white group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md`}
                          >
                            Logout
                          </button>
                        </div>
                      </div>
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
