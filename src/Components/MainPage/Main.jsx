import React from "react";
import atlas from "./atlas.jpg";

const Main = () => {
  return (
    <div className="flex flex-col lg:flex-row max-h-screen">
      <div className="flex flex-col lg:w-1/2 p-8 justify-center">
        <h1 className="text-4xl lg:text-7xl">
          Welcome to <span className="atlas">ATLAS</span>
        </h1>
        <p className="mt-4 text-base lg:text-lg">
          In Greek mythology, Atlas, a powerful Titan, was condemned to hold up
          the heavens for eternity after leading the Titans in a rebellion
          against the Olympian gods. This iconic image has made Atlas a symbol
          of strength and endurance, later associated with the globe. Depicted
          carrying the world, Atlas represents the weight of the celestial
          sphere and the entire world. Metaphorically, the image signifies
          endurance, strength, and the burden of responsibility. The name
          "Atlas" is now linked to collections of maps, emphasizing the idea of
          bearing the weight of the world's geographic knowledge.
        </p>
        <div className="mt-4">
          <a href="/countries">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-2xl lg:text-4xl rounded-lg pt-2 pb-1 px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Continue
              <svg
                className="rtl:rotate-180 w-4 h-4 lg:w-6 lg:h-6 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </a>
        </div>
      </div>

      {/* Right side with the image */}
      <div className="flex items-end justify-end lg:w-1/2">
        <img src={atlas} alt="atlas" className="h-screen max-w-full" />
      </div>
    </div>
  );
};

export default Main;
