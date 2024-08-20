import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

function CarComparison() {
  const [cars, setCars] = useState([]);
  const [carModels1, setCarModels1] = useState([]);
  const [carModels2, setCarModels2] = useState([]);
  const [selectedCar1, setSelectedCar1] = useState(null);
  const [selectedCar1Model, setSelectedCar1Model] = useState(null);
  const [selectedCar2, setSelectedCar2] = useState(null);
  const [selectedCar2Model, setSelectedCar2Model] = useState(null);
  const token = localStorage.getItem("authToken");

  // Fetch the list of cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cars", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        setCars(response.data.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setCars([]); // Set to an empty array on error
      }
    };

    fetchCars();
  }, [token]);

  // Fetch car models for the first car
  const handleSelectCar1 = async (event) => {
    const carId = event.target.value;
    const car = cars.find((car) => car.id === parseInt(carId));
    setSelectedCar1(car);
    setSelectedCar1Model(null);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/car-models/car/${carId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            car_id: `${carId}`,
          },
        }
      );

      setCarModels1(response.data);
      
    } catch (error) {
      console.error("Error fetching car models:", error);
      setCarModels1([]);
    }
  };

  // Update information based on the selected model for the first car
  const handleSelectCar1Model = (event) => {
    const modelId = event.target.value;
    const carModel = carModels1.find((model) => model.id === parseInt(modelId));
    setSelectedCar1Model(carModel);
  };

  // Fetch car models for the second car
  const handleSelectCar2 = async (event) => {
    const carId = event.target.value;
    const car = cars.find((car) => car.id === parseInt(carId));
    setSelectedCar2(car);
    setSelectedCar2Model(null);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/car-models/car/${carId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            car_id: `${carId}`,
          },
        }
      );
      setCarModels2(response.data);
    } catch (error) {
      console.error("Error fetching car models:", error);
      setCarModels2([]);
    }
  };

  // Update information based on the selected model for the second car
  const handleSelectCar2Model = (event) => {
    const modelId = event.target.value;
    const carModel = carModels2.find((model) => model.id === parseInt(modelId));
    setSelectedCar2Model(carModel);
  };
  const formatMileage = (mileage, fuelType) => {
    if (fuelType === "PETROL" || fuelType === "DIESEL") {
      return `${mileage}Kmpl`;
    } else if (fuelType === "ELECTRIC") {
      return `${mileage}Km`;
    }
    return mileage;
  };

  const formatEngineCapacity = (engineCapacity, fuelType) => {
    if (fuelType === "PETROL" || fuelType === "DIESEL") {
      return `${engineCapacity}cc`;
    } else if (fuelType === "ELECTRIC") {
      return `${engineCapacity}KWh`;
    }
    return engineCapacity;
  };

  return (
    <div className="container mb-5">
      <h1
        className="text-center"
        style={{
          fontSize: "4.2rem",
          fontFamily: "Poppins",
          fontWeight: 700,
          color: "#010103",
          textAlign: "left",
          marginTop: "90px",
          marginBottom: "50px",
        }}
      >
        Compare <span style={{ color: "#ff4d30" }}>Cars</span>
      </h1>

      <div className="">
        <div className="car-select">
          <div className="d-flex justify-between align-items-baseline ">
            <h2
              style={{
                fontSize: "2rem",
                fontFamily: "Poppins",
                width: "22%",
                paddingRight: "10px",
              }}
            >
              Select Cars
            </h2>
            <select
              onChange={handleSelectCar1}
              style={{
                padding: "10px",
                marginBottom: "5px",
                fontSize: "14px",
                border: "1px solid #dfdfdf",
                width: "100%",
                marginRight: "10px",
              }}
            >
              <option value="">Select Car 1</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.brand} {car.car_name}
                </option>
              ))}
            </select>
            <select
              onChange={handleSelectCar2}
              style={{
                padding: "10px",
                marginBottom: "5px",
                fontSize: "14px",
                border: "1px solid #dfdfdf",
                width: "100%",
                marginLeft: "10px",
              }}
            >
              <option value="">Select Car 2</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                 {car.brand} {car.car_name}
                </option>
              ))}
            </select>
          </div>

          {selectedCar1 && selectedCar2 && (
            <div>
              <div className="d-flex justify-between">
                <select
                  onChange={handleSelectCar1Model}
                  style={{
                    padding: "10px",
                    marginBottom: "5px",
                    fontSize: "14px",
                    border: "1px solid #dfdfdf",
                    width: "100%",
                    marginRight: "10px",
                    marginLeft: "127px",
                  }}
                >
                <option value="">Select Car Model</option>
                  {carModels1.length > 0 ? (
                    carModels1.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.model_name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No models available</option>
                  )}
                </select>
                <select
                  onChange={handleSelectCar2Model}
                  style={{
                    padding: "10px",
                    marginBottom: "5px",
                    fontSize: "14px",
                    border: "1px solid #dfdfdf",
                    width: "100%",
                    marginLeft: "10px",
                  }}
                >
                  <option value="">Select Car Model</option>
                  {carModels2.length > 0 ? (
                    carModels2.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.model_name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No models available</option>
                  )}
                </select>
              </div>

              {selectedCar1Model && selectedCar2Model && (
                <div>
                  <table id="compareTable">
                    <tr>
                      <th></th>
                      <td>
                        <img
                          src={`http://127.0.0.1:8000/public/photos/${selectedCar1Model.car.car_img}`}
                          alt={selectedCar1Model.car.car_img}
                        />
                      </td>
                      <td>
                        {" "}
                        <img
                          src={`http://127.0.0.1:8000/public/photos/${selectedCar2Model.car.car_img}`}
                          alt={selectedCar2Model.car.car_img}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Price</th>
                      <td>
                        <Typography variant="h5" className="mt-4 " paragraph>
                          &#x20b9;{selectedCar1Model.car_price}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="h5" className="mt-4 " paragraph>
                          &#x20b9;{selectedCar2Model.car_price}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <th>Transmiss- ion type</th>
                      <td>
                        <Typography variant="h5" paragraph>
                          {selectedCar1Model.transmission_type}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="h5" paragraph>
                          {selectedCar2Model.transmission_type}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <th>Mileage</th>
                      <td>
                        <Typography variant="h5" paragraph>
                          {formatMileage(
                            selectedCar1Model.car_mileage,
                            selectedCar1Model.fuel_type
                          )}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="h5" paragraph>
                          {formatMileage(
                            selectedCar2Model.car_mileage,
                            selectedCar2Model.fuel_type
                          )}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <th>Fuel type</th>
                      <td>
                        <Typography variant="h5" paragraph>
                          {selectedCar1Model.fuel_type}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="h5" paragraph>
                          {selectedCar2Model.fuel_type}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <th>Engine</th>
                      <td>
                        <Typography variant="h5" paragraph>
                          {formatEngineCapacity(
                            selectedCar1Model.engine_capacity,
                            selectedCar1Model.fuel_type
                          )}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="h5" paragraph>
                          {formatEngineCapacity(
                            selectedCar2Model.engine_capacity,
                            selectedCar2Model.fuel_type
                          )}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>
                        <Typography
                          variant="h5"
                          className="text-secondary"
                          style={{ textAlign: "justify" }}
                          paragraph
                        >
                          {selectedCar1Model.car_desc}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="h5"
                          className="text-secondary"
                          style={{ textAlign: "justify" }}
                          paragraph
                        >
                          {selectedCar2Model.car_desc}
                        </Typography>
                      </td>
                    </tr>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CarComparison;
