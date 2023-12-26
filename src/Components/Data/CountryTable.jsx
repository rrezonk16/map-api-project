import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import map_icon from "./map.svg";
import { motion } from "framer-motion";
import filterIcon from "./filter-32-512.png";

const CountryTable = () => {
  const [countries, setCountries] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [selectedOtherOptions, setSelectedOtherOptions] = useState([]);
  const [minPopulation, setMinPopulation] = useState(0);
  const [maxPopulation, setMaxPopulation] = useState(1300000000);

  const goToCountry = (Cname) => {
    window.location = `/country?code=${Cname}`;
  };
  const allContinents = [
    "Europe",
    "Asia",
    "North America",
    "South America",
    "Africa",
    "Oceania",
    "Antarctica",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-10%" },
  };
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesContinent =
      selectedContinents.length === 0 ||
      selectedContinents.includes(country.continents[0]);
    const matchesOtherOptions =
      selectedOtherOptions.length === 0 ||
      selectedOtherOptions.some((option) => country[option.toLowerCase()]);
    const matchesPopulation =
      country.population >= minPopulation &&
      country.population <= maxPopulation;

    return (
      matchesSearch &&
      matchesContinent &&
      matchesOtherOptions &&
      matchesPopulation
    );
  });

  const handleCheckboxChange = (value, setState) => {
    setState((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  return (
    <div className={`pl-8 py-12 pr-8`}>
      <h2 className="text-2xl font-bold mb-4">Countries Table</h2>

      <div className="overflow-x-auto flex flex-row">
        <motion.div
          className={` ${
            isFilterOpen ? " block " : " hidden"
          } lg:w-1/5 w-full border rounded-lg h-auto mr-4 px-5 pt-4 bg-gray-100 text-black`}
          animate={isFilterOpen ? "open" : "closed"}
          variants={variants}
        >
          <p>Search</p>
          <input
            type="text"
            name="Search"
            className="text-black rounded-xl outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <br />
          <br />
          <label> Continent </label>
          {allContinents.map((continent) => (
            <p key={continent}>
              <input
                type="checkbox"
                onChange={() =>
                  handleCheckboxChange(continent, setSelectedContinents)
                }
              />{" "}
              {continent}
            </p>
          ))}
          <br />
          <p>Population</p>
          <div className="flex">
            <div className="flex flex-col">
              <label htmlFor="minPopulation" className="text-sm text-gray-600">
                Min:
              </label>
              <input
                type="number"
                id="minPopulation"
                value={minPopulation}
                onChange={(e) => setMinPopulation(parseInt(e.target.value, 10))}
                className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-11/12"
              />
            </div>
            <span className="mt-7 pr-2 ">||</span>
            <div className="flex flex-col">
              <label htmlFor="maxPopulation" className="text-sm text-gray-600">
                Max:
              </label>
              <input
                type="number"
                id="maxPopulation"
                value={maxPopulation}
                onChange={(e) => setMaxPopulation(parseInt(e.target.value, 10))}
                className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-11/12"
              />
            </div>
          </div>

          <br />
          <p> Other </p>
          <p>
            <input
              type="checkbox"
              onChange={() =>
                handleCheckboxChange("Landlocked", setSelectedOtherOptions)
              }
            ></input>{" "}
            Landlocked
          </p>
          <br />
        </motion.div>
        <div className={` ${isFilterOpen ? " w-4/5 " : "w-full "}  `}>
          <Table hoverable className="text-black">
            <TableHead>
              <TableHeadCell>
                {" "}
                <button
                  onClick={() =>
                    setIsFilterOpen((isFilterOpen) => !isFilterOpen)
                  }
                >
                  <img src={filterIcon} alt="" className="w-6" />
                </button>{" "}
              </TableHeadCell>
              <TableHeadCell>Flag</TableHeadCell>
              <TableHeadCell className={` ${isFilterOpen ? " hidden " : ""}  `}>
                Code
              </TableHeadCell>

              <TableHeadCell>Common Name</TableHeadCell>
              <TableHeadCell>Official Name</TableHeadCell>
              <TableHeadCell>Capital</TableHeadCell>
              <TableHeadCell>Area</TableHeadCell>
              <TableHeadCell>Continents</TableHeadCell>
              <TableHeadCell>Currency</TableHeadCell>
              <TableHeadCell>Population</TableHeadCell>
              <TableHeadCell>Map</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {filteredCountries.map((country, index) => (
                <TableRow
                  key={index}
                  className="cursor-pointer hover:bg-gray-200 bg-white"
                  onClick={() => goToCountry(country.cca2)}
                >
                  <TableCell>{++index}</TableCell>

                  <TableCell className="bg-purple-900 text-center p-2">
                    {country.flags && country.flags.svg && (
                      <img
                        src={country.flags.svg}
                        alt="Flag"
                        className=" w-40"
                      />
                    )}
                  </TableCell>
                  <TableCell
                    className={` ${isFilterOpen ? " hidden " : "block "}  `}
                  >
                    {country.cca2}
                  </TableCell>
                  <TableCell>{country.name && country.name.common}</TableCell>
                  <TableCell>{country.name && country.name.official}</TableCell>
                  <TableCell>
                    {country.capital && country.capital.join(", ")}
                  </TableCell>
                  <TableCell>{country.area && `${country.area} km2`}</TableCell>
                  <TableCell>
                    {country.continents && country.continents.join(", ")}
                  </TableCell>
                  <TableCell>
                    {country.currencies &&
                      Object.keys(country.currencies).map(
                        (currencyCode, currencyIndex) => (
                          <div key={currencyIndex}>
                            {country.currencies[currencyCode].name} (
                            {country.currencies[currencyCode].symbol})
                          </div>
                        )
                      )}
                  </TableCell>
                  <TableCell>{country.population.toLocaleString()}</TableCell>
                  <TableCell>
                    <a href={country.maps.googleMaps}>
                      <img src={map_icon} alt="map link" className=" w-11" />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>{" "}
      </div>
    </div>
  );
};

export default CountryTable;
