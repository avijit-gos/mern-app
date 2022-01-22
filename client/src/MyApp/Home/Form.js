import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Home";
import { useHistory } from "react-router-dom";

function Form() {
  const history = useHistory();

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectCountry, setSelectCountry] = useState("");
  const [selectCity, setSelectCity] = useState("");

  useEffect(() => {
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "API_KEY");

    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    fetch("/countries", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setCountries(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  }, []);

  const countryHandle = (e) => {
    setSelectCountry(e.target.value);

    axios
      .get(`/cities/${e.target.value}`)
      .then((res) => {
        setCities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cityHandler = (e) => {
    setSelectCity(e.target.value);
  };

  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div>
      <div className="logout_btn">
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>
      <Home
        countries={countries}
        countryHandle={countryHandle}
        selectCountry={selectCountry}
        cities={cities}
        cityHandler={cityHandler}
        selectCity={selectCity}
        setSelectCity={setSelectCity}
        setSelectCountry={setSelectCountry}
        setCities={setCities}
      />
    </div>
  );
}

export default Form;
