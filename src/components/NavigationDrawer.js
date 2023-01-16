import Link from "next/link";
import Header from "./HeaderDrawer";
import HeaderFilter from "./HeaderFilter";
import { HiUserCircle } from "react-icons/hi";
import { useRouter } from "next/router";

export default function NavigationDrawer({
  title,
  token,
  nama,
  setIsOpen,
  isOpen,
}) {
  const router = useRouter();
  console.log(token);
  const handleClick = () => {
    router.replace("/profile");
  };

  const AuthFeature = () => {
    return (
      <>
        <div className="my-3 hover:text-black cursor-pointer px-4 ">
          <Link href="/download-file">
            <a>Download File</a>
          </Link>
        </div>
        <div className="my-3 hover:text-black cursor-pointer px-4 ">
          <Link href="/input-file">
            <a>Input File</a>
          </Link>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="flex flex-col  h-screen bg-primary-normal text-white">
        <div className="p-4">
          {title != null ? <HeaderFilter /> : <Header />}
        </div>
        <div className="my-3 hover:text-black cursor-pointer px-4">
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
        <div className="my-3 hover:text-black cursor-pointer px-4 ">
          <Link href="/about">
            <a>About</a>
          </Link>
        </div>
        <div className="my-3 hover:text-black cursor-pointer px-4 ">
          <Link href="/peta-keseuaian-lahan">
            <a>Peta Keseuaian Lahan</a>
          </Link>
        </div>

        <div className="my-3 hover:text-black cursor-pointer px-4 ">
          <Link href="/penilaian-kesesuaian-lahan">
            <a>Penilaian Kesesuaian Lahan </a>
          </Link>
        </div>
        <div className="my-3 hover:text-black cursor-pointer px-4 ">
          <Link href="/glosarium">
            <a>Glosarium </a>
          </Link>
        </div>
        {!(token === "" || token === undefined) && <AuthFeature />}

        <div className="flex-grow"></div>
        {token === "" || token === undefined ? (
          <button
            className="w-auto	 py-4  mx-4 mb-4 hover:text-gray-500 hover:bg-primary-darkcoco cursor-pointer bg-primary-coco rounded-xl"
            // onClick={() => {
            //   setIsOpen(!isOpen);
            // }}
          >
            <Link href="/login">
              <div className="text-center">Login</div>
            </Link>
          </button>
        ) : (
          <button
            className="w-auto	 py-4  mx-4 mb-4 hover:text-gray-500 hover:bg-primary-darkcoco cursor-pointer bg-primary-coco rounded-xl"
            onClick={handleClick}
          >
            <div>
              <div className="flex mx-4 my-2">
                <HiUserCircle className="w-8 h-8" />
                <div className="text-center mx-4 mt-1 truncate ">{nama}</div>
              </div>
            </div>
          </button>
        )}
      </div>
    </>
  );
}
