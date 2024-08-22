import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

function CarsMain() {
  const [cars, setCars] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cars");
        const allCars = response.data.data;
        const recentCars = allCars.slice(0, 6);
        setCars(recentCars);
      } catch (error) {
        console.error("Error fetching the cars data:", error);
      }
    };

    fetchCars();
  }, []);

  const formatPriceRange = (range) => {
    const [minPrice, maxPrice] = range.split('-').map(Number);
    
    const formatValue = (value) => {
      if (value < 1000) {
        return value; // No suffix needed for values below 1000
      }
      
      if (value >= 10000000) {
        return `${(value / 10000000).toFixed(1)}C`; // Crore
      } else if (value >= 100000) {
        return `${(value / 100000).toFixed(1)}L`; // Lakh
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`; // Thousand
      }
    };

    return `${formatValue(minPrice)} - ${formatValue(maxPrice)}`;
  };

  return (
    <>
      <section className="models-section">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center px-5">
            <h1 className="text-center" style={{ fontSize: "4.2rem", fontFamily: "Poppins", fontWeight: 700, color: "#010103" }}>
              Recent <span style={{ color: "#ff4d30" }}>Cars</span>
            </h1>
            <div className="models-div__box__descr__name-price__btn">
              <Link onClick={() => window.scrollTo(0, 0)} to={`/cars`}>
                See All
              </Link>
            </div>
          </div>
          <div className="models-div align-items-stretch">
            {cars.length > 0 ? (
              cars.map((car) => (
                <div className="models-div__box" key={car.id}>
                  <div className="models-div__box__img">
                    <img  src={`http://127.0.0.1:8000/public/photos/${car.car_img}`} alt={`${car.car_name}_img`} style={{ objectFit: "contain" }} />
                    <div className="models-div__box__descr">
                      <div className="models-div__box__descr__name-price d-flex justify-content-center flex-wrap">
                        <div className="models-div__box__descr__name-price__name">
                          <p className="fs-1 text-center">{car.brand} {car.car_name}</p>
                        </div>
                        
                      </div>
                      <div className="models-div__box__descr__name-price__price text-center">
                        <h4 className="fs-2 fw-bold" >&#x20b9;{formatPriceRange(car.car_price_range)}</h4>
                      </div>
                      
                      <div className="models-div__box__descr__name-price__details d-flex flex-column align-items-center justify-content-center row-gap-2 ">
                        <span className="d-flex align-items-center ">
                              <i
                                className="bx bx-cog mx-2 fs-1 "
                                style={{ color: "grey" }}
                              ></i>
                              {car.transmission_type}</span>
                        <span className="d-flex align-items-center"> <i className="bx bx-gas-pump mx-2 fs-1" style={{ color: "grey" }}></i>{car.fuel_type}&nbsp;</span>
                      </div>
                      <Link className="text-white text-decoration-none fw-bold" onClick={() => window.scrollTo(0, 0)} to={`/cars/${car.id}`}>
                        <div className="models-div__box__descr__name-price__btn">
                          Explore More
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center fs-1 fw-bold" style={{ gridColumn: "2 / 3" }}>
                <CircularProgress style={{ color: "black" }} />
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default CarsMain;
