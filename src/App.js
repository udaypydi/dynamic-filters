import React, { useEffect, useState } from "react";
import "./App.css";
import Filters from "./filters";

const json = {
  success: true,
  data: [
    {
      name: "filter1",
      value: "filter1"
    },
    {
      name: "filter2",
      value: "filter2"
    },
    {
      name: "ac1",
      value: "ac1"
    }
  ]
};

export default function App() {
  // const [options, setOptions] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     "http://b2filtersaapi.bamboobox.in/filter/get-filter?tenantId=9ac08989-b7f1-59d8-a29e-2b938c1a2c31&&ui=unified_profile"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setOptions(json?.data);
  //     });
  // }, []);


  return (
    <div className="App">
      <Filters
        getFilterData={(data) => {
          console.log('get filter data in app.js', data);
        }}
        customStyle={{ width: 200, background: "#fff" }}
        options={json?.data}
        attributesValueURL={'http://b2metadataapi.bamboobox.in/attribute-setup/get-combobox-data'}
      />
    </div>
  );
}
