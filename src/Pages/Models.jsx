import HeroPages from "../components/HeroPages";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { style } from "@mui/system";

function Models() {
  <HeroPages name="Vehicle Models" />;
  let [cars, setCars] = useState({});
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cars", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });

        // Log the response to check its structure
        // console.log('API Response:', response.data);

        // console.log(response.data.data);
        setCars(response.data.data);
      } catch (error) {
        console.error("Error fetching the cars data:", error);
      }
    };

    fetchCars();
  }, [token]);
  if (!cars) {
    return <p>Loading...</p>;
  }

  const formatValue = (value) => {
    if (value < 1000) {
      return value; // No suffix needed for values below 1000
    }

    const length = value.toString().length;

    if (length > 3 && length <= 5) {
      return `${(value / 1000).toFixed(1)}K`; // Add 'K' for values above 3 digits and below 5 digits
    } else if (length > 5 && length <= 7) {
      return `${(value / 100000).toFixed(1)}L`; // Add 'L' for values above 5 digits and below 7 digits
    } else if (length > 7) {
      return `${(value / 10000000).toFixed(1)}C`; // Add 'C' for values above 7 digits
    }

    return value;
  };

  return (
    <>
    
      <section className="models-section">
      <HeroPages name="Vehicles" />
        <div className="container">
        <div className=" d-flex justify-content-between align-items-center px-5 ">
        <h1
          className="text-center "
          style={{
            fontSize: "4.2rem",
            fontFamily: "Poppins",
            fontWeight: 700,
            color: "#010103",
            textAlign:"left",
            marginTop: "90px"
          }}
        >
          
         {cars.length > 0 ? (cars.length):0} Cars <span style={{ color: "#ff4d30" }}>Found</span>
        </h1>
        <div></div>
        </div>
          <div className="models-div  align-items-stretch ">
            {cars.length > 0 ? ( // Check if cars array has elements
              cars.map((car) => (
                <div className="models-div__box" key={car.id}>
                  <div className="models-div__box__img">
                    <img
                      src={`http://127.0.0.1:8000/public/photos/${car.car_img}`}
                      alt={`${car.car_name}_img` }
                      style={{objectFit:"contain"}}
                    />
                    <div className="models-div__box__descr">
                      <div className="models-div__box__descr__name-price d-flex justify-content-between align-items-baseline">
                        <div className="models-div__box__descr__name-price__name ">
                          <p className="fs-1">{car.brand} {car.car_name}</p>
                        </div>
                        <div className="models-div__box__descr__name-price__price ">
                          <h4 className="fs-1 fw-bold">&#x20b9;{formatValue(car.car_price)}</h4>
                        </div>
                      </div>
                      <div className="models-div__box__descr__name-price__details d-flex justify-content-between align-items-baseline">
                        <span>&nbsp; {car.transmission_type}</span>
                        <span style={{ textAlign: "right" }}>
                          {car.fuel_type} &nbsp;{" "}
                          <i className="fa-solid fa-car-side"></i>
                        </span>
                      </div>
                      <Link className="text-white text-decoration-none fw-bold"
                          onClick={() => window.scrollTo(0, 0)}
                          to={`/cars/${car.id}`}
                        >
                      <div className="models-div__box__descr__name-price__btn">
                        
                          Explore More
                          </div>
                        </Link>
                      
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p
                className="text-center fs-1 fw-bold"
                style={{ gridColumn: " 2 / 3" }}
              >
                {" "}
                <CircularProgress style={{ color : "black"}}/>
                
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Models;
