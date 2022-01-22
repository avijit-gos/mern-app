import React, { useState } from "react";
import HomeResult from "./HomeResult";

function Home(props) {
  const {
    countries,
    countryHandle,
    selectCountry,
    cities,
    cityHandler,
    selectCity,
    setSelectCity,
    setSelectCountry,
    setCities,
  } = props;

  const [company_name, setCompany_name] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setPhoto(e.target.files[0]);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("company_name", company_name);
    formdata.append("address", address);
    formdata.append("country", selectCountry);
    formdata.append("city", selectCity);
    formdata.append("description", description);
    formdata.append("userID", localStorage.getItem("userId"));
    formdata.append("photo", photo);
    formdata.append("token", localStorage.getItem("token"));

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `http://localhost:3010/update/${localStorage.getItem("userId")}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        setCompany_name("");
        setDescription("");
        setPhoto("");
        setAddress("");
        setSelectCity("");
        setSelectCountry("");
        setCities("");
      })
      .catch((error) => console.log("error", error));
  };

  const cancelSubmit = () => {
    setCompany_name("");
    setDescription("");
    setPhoto(null);
    setAddress("");
    setSelectCity("");
    setSelectCountry("");
  };

  return (
    <div className="signup_container">
      <div className="signup_form_box">
        <form onSubmit={formSubmit}>
          <label>Company Name</label>
          <br />
          <input
            type="text"
            name="company_name"
            className="input_field"
            required={true}
            value={company_name}
            onChange={(e) => setCompany_name(e.target.value)}
          />
          <br />
          <label>Address</label>
          <br />
          <input
            type="text"
            name="address"
            value={address}
            className="input_field"
            required={true}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
          <label>Description</label>
          <br />
          <textarea
            type="text"
            name="description"
            value={description}
            className="input_field"
            required={true}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <br />
          <label>Select Country</label>
          <br />
          <select
            onChange={countryHandle}
            className="input_field"
            required={true}
          >
            <option>Select your country</option>
            {countries.map((country) => (
              <option value={country} key={country}>
                {country}
              </option>
            ))}
          </select>{" "}
          <br />
          <label>Select City</label>
          <br />
          <select
            onChange={cityHandler}
            className="input_field"
            required={true}
          >
            <option>Select your city</option>
            {cities.map((city) => (
              <option value={city} key={city}>
                {city}
              </option>
            ))}
          </select>
          <br />
          <label>Upload Photo</label>
          <br />
          <input
            type="file"
            name="photo"
            onChange={handleFile}
            required={true}
          />
          <br />
          <div className="btn_signup">
            <button className="signup">Save</button>
            <button className="cancel" onClick={cancelSubmit}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <HomeResult />
    </div>
  );
}

export default Home;
