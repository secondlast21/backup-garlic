import Header from "../components/Header";

export default function HomeHeader({ active, handleClick }) {
  return (
    <div className="sticky top-0 absolute  w-full shadow-xl">
      <div className="md:hidden lg:hidden bg-primary-white">
        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
              stroke="black"
            ></path>
          </svg>
        </label>
      </div>
      <div
        className={`bg-primary-white w-full hidden md:block lg:block  flex flex-col `}
      >
        <div className=" p-5">
          <Header handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
