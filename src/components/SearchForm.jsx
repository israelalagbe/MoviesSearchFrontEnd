import React from 'react';

import { ReactSearchAutocomplete } from "react-search-autocomplete";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function SearchForm({searchText, setSearchText}) {

  const items = [
    {
      id: 0,
      name: "Cobol",
    },
    {
      id: 1,
      name: "JavaScript"
    },
    {
      id: 2,
      name: "Basic"
    },
    {
      id: 3,
      name: "PHP"
    },
    {
      id: 4,
      name: "Java"
    },
  ];

  const handleOnSearch = (string, cached) => {
    console.log(string, cached);
  }

  const handleOnSelect = item => {
    setSearchText(item)
    console.log(item);
  }

  const handleOnFocus = () => {
    console.log("Focused");
  }


  return (
    <ReactSearchAutocomplete
            
            placeholder="Search Movies"
            items={items}
            onSearch={setSearchText}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
          />
  );
}