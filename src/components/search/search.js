// import { useState } from "react"
// import { AsyncPaginate } from "react-select-async-paginate"
// import { url, geoApiOptions } from "../../api";

// const Search = ({ onSearchChange }) => {

//     const [search, setSearch] = useState(null);

//     const loadOptions = (inputValue) => {
//     return fetch(
//         `${url}/cities?minPopulation=1000000&namePrefix=${inputValue}}/`, 
//         geoApiOptions
//         )
//         .then((response) => response.json())
//         .then((response) => {
//             return {
//                 options: response.data.map((city) => {
//                     return {
//                         value: `${city.latitude} ${city.longitude}`,
//                         label: `${city.name}, ${city.countryCode}`,
//                     }
//                 })
//             }
//         })
//         .catch((err) => console.log(err));
// };

// const handleOnChange = (searchData) => {
//     setSearch(searchData);
//     onSearchChange(searchData);
// }


// return (

//     <AsyncPaginate
//         placeholder="search for city"
//         debounceTimeout={600}
//         value={search}
//         onChange={handleOnChange}
//         loadOptions={loadOptions}
//     />
// )
// }

// export default Search;

import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const url = "https://wft-geo-db.p.rapidapi.com/v1/geo";

  const loadOptions = async (inputValue) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'KEY',
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        'useQueryString': true,
      }
    };

    try {
      const response = await fetch(
        `${url}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        requestOptions
      );
      const data = await response.json();

      // Verify if data is defined before attempting to map it
      if (data && data.data) {
        // Transform data to the required format
        const options = data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        }));

        return {
          options: options,
          hasMore: false, // Set this to true if there are more options to load
        };
      } else {
        return {
          options: [],
          hasMore: false,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        options: [],
        hasMore: false,
      };
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for a city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
