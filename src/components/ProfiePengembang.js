import Image from "next/image";

export default function Pengembang({ name, role, image }) {
  return (
    <>
      <div className="mt-16 py-16   h-128 w-96  rounded-xl ">
        <div className="w-sm">
          <img
            src={image}
            className="w-64 h-64 mx-auto shadow-xl rounded-full bg-primary-krem object-scale-down"
            alt=""
          />
          <div className="mt-16 text-black text-center">
            <h1 className="text-xl font-bold">{name}</h1>
            <p className="mt-4 text-xl text-black">{role}</p>
          </div>
        </div>
      </div>
    </>
  );
}
