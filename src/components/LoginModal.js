import { useRouter } from "next/router";
import storage from "../redux/storage";

const LoginModal = () => {
  const router = useRouter();
  return (
    <div className=" flex-grow bg-white p-8 rounded text-black">
      <div className="text-center text-xl font-bold	">Sesi anda telah habis</div>
      <div className="text-center text-md">
        Silahkan login kembali untuk mengakses konten terbatas
      </div>
      <div className="flex flex-row">
        <div className="mx-auto  flex items-center justify-center mt-8 bg-primary-red hover:bg-primary-redlight text-white rounded-md py-4 px-8">
          <button
            onClick={() => {
              storage.remove("auth");
              window.location.reload();
            }}
          >
            Be Guest
          </button>
        </div>
        <div className="mx-auto  flex items-center justify-center mt-8 bg-primary-coco hover:bg-primary-darkcoco text-white rounded-md py-4 px-8">
          <button
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
