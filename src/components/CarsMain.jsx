import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

function CarsMain() {
  let [cars, setCars] = useState({});
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cars");

        // Log the response to check its structure
        // console.log('API Response:', response.data);

        const allCars = response.data.data;

        // Sort by creation date or any other relevant field if necessary
        // If the API already sorts the cars, you can directly slice the array
        // allCars.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // Slice to get only the most recent 6 cars
        const recentCars = allCars.slice(0, 6);

        // console.log(response.data.data);
        setCars(recentCars);
      } catch (error) {
        console.error("Error fetching the cars data:", error);
      }
    };

    fetchCars();
  }, []);

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
        <div className="container">
        <div className=" d-flex justify-content-between align-items-center px-5 ">
            
            <h1 className="text-center " style={{ fontSize: "4.2rem",fontFamily: "Poppins",fontWeight: 700, color: "#010103"}}>
              Recent <span style={{color: "#ff4d30"}} >Cars</span> 
            </h1>
            <div className="models-div__box__descr__name-price__btn">
              <Link
                onClick={() => window.scrollTo(0, 0)}
                to={`/cars`}
                >
                See All
                </Link>
            </div>
            
          </div>
          <div className="models-div">
            {cars.length > 0 ? ( // Check if cars array has elements
              cars.map((car) => (
                <div className="models-div__box" key={car.id}>
                  <div className="models-div__box__img">
                    <img src={`http://127.0.0.1:8000/public/photos/${car.car_img}`} alt={`${car.car_name}_img`} style={{objectFit:"contain"}} />
                    <div className="models-div__box__descr">
                      <div className="models-div__box__descr__name-price d-flex justify-content-between align-items-baseline">
                        <div className="models-div__box__descr__name-price__name">
                          <p>{car.car_name}</p>
                        </div>
                        <div className="models-div__box__descr__name-price__price">
                          <h4>&#x20b9;{formatValue(car.car_price)}</h4>
                        </div>
                      </div>
                      <div className="models-div__box__descr__name-price__details d-flex justify-content-between align-items-baseline">
                        <span>
                          <i className="fa-solid fa-car-side"></i> &nbsp;{" "}
                          {car.transmission_type}
                        </span>
                        <span style={{ textAlign: "right" }}>
                          {car.fuel_type} &nbsp;{" "}
                          <i className="fa-solid fa-car-side"></i>
                        </span>
                      </div>
                      <div className="models-div__box__descr__name-price__btn">
                        <Link
                          onClick={() => window.scrollTo(0, 0)}
                          to={`/cars/${car.id}`}
                        >
                          Explore More
                        </Link>
                      </div>
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

export default CarsMain;
