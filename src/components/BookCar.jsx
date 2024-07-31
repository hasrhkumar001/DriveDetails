import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookCar() {
  const [fuelType, setFuelType] = useState('');
  const [engineCapacity, setEngineCapacity] = useState('');
  const [mileage, setMileage] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [brand, setBrand] = useState('');
  const [cars, setCars] = useState([]);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();


  const handleSearch = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!fuelType) newErrors.fuelType = 'Fuel type is required';
    if (!engineCapacity) newErrors.engineCapacity = 'Engine capacity is required';
    if (!mileage) newErrors.mileage = 'Mileage is required';
    if (!priceRange) newErrors.priceRange = 'Price range is required';
    if (!brand) newErrors.brand = 'Brand is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/cars', {
        params: {
          fuel_type: fuelType,
          engine_capacity: engineCapacity,
          car_mileage: mileage,
          car_price: priceRange,
          brand: brand,
        },
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      setCars(response.data.data); // Adjust based on your API response structure
      navigate('/search-results', { state: { data:response.data.data } });
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  return (
    <>
      <section id="booking-section" className="book-section " style={{paddingTop: "50px" }}>
        
        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Search a car</h2>

              <form className="box-form" onSubmit={handleSearch}>
                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-car"></i> &nbsp; Select Fuel Type <b>*</b>
                  </label>
                  <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
                    <option value="">Select Fuel type</option>
                    <option value="PETROL">Petrol</option>
                    <option value="DIESEL">Diesel</option>
                    <option value="ELECTRIC">Electric</option>
                  </select>
                  {errors.fuelType && <p className="error-message">{errors.fuelType}</p>}
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Select Engine/Motor Capacity <b>*</b>
                  </label>
                  <select value={engineCapacity} onChange={(e) => setEngineCapacity(e.target.value)}>
                    {fuelType === 'ELECTRIC' ? (
                      <>
                        <option value="">Select Battery Capacity</option>
                        <option value="0,30">Less than 30KWh</option>
                        <option value="30,50">30KWh - 50KWh</option>
                        <option value="50,70">50KWh - 70KWh</option>
                        <option value="70,1000000">Above 70KWh</option>
                      </>
                    ) : (
                      <>
                        <option value="">Select Engine Capacity</option>
                        <option value="0,1000">Less than 1000cc</option>
                        <option value="1001,2000">1001cc - 2000cc</option>
                        <option value="2001,3000">2001cc - 3000cc</option>
                        <option value="3001,1000000">Above 3000cc</option>
                      </>
                    )}
                  </select>
                  {errors.engineCapacity && <p className="error-message">{errors.engineCapacity}</p>}
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Select Mileage/Range <b>*</b>
                  </label>
                  <select value={mileage} onChange={(e) => setMileage(e.target.value)}>
                  {fuelType !== 'ELECTRIC' ? (
                    <>
                    <option value="">Select Mileage</option>
                    <option value="0,10">Less than 10kmpl</option>
                    <option value="10,15">10kmpl - 15kmpl</option>
                    <option value="15,20">15kmpl - 20kmpl</option>
                    <option value="20,25">20kmpl - 25kmpl</option>
                    <option value="25,1000">Above 25kmpl</option>
                    </>
                  ):(
                    <>
                    <option value="">Select Range</option>
                    <option value="0,200">Less than 200km</option>
                    <option value="200,300">200km - 300km</option>
                    <option value="300,400">300km - 400km</option>
                    <option value="400,500">400km - 500km</option>
                    <option value="500,600">500km - 600km</option>
                    <option value="600,10000">Above 600km</option>
                  
                  </>
                  )}
                  </select>
                  {errors.mileage && <p className="error-message">{errors.mileage}</p>}
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Select Price Range <b>*</b>
                  </label>
                  <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                    <option value="">Select Price Range</option>
                    <option value="0,1000000">Less than 10L</option>
                    <option value="1000000,2000000">10L - 20L</option>
                    <option value="2000000,3000000">20L - 30L</option>
                    <option value="3000000,4000000">30L - 40L</option>
                    <option value="4000000,5000000">40L - 50L</option>
                    <option value="5000000,6000000">50L - 60L</option>
                    <option value="6000000,7000000">60L - 70L</option>
                    <option value="7000000,8000000">70L - 80L</option>
                    <option value="8000000,9000000">80L - 90L</option>
                    <option value="9000000,10000000">90L - 1Cr</option>
                    <option value="10000000,100000000">Above 1Cr</option>
                  </select>
                  {errors.priceRange && <p className="error-message">{errors.priceRange}</p>}
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Select Car Brand <b>*</b>
                  </label>
                  <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option value="">Select Car brand</option>
                    <option value="AUDI">AUDI</option>
                    <option value="BMW">BMW</option>
                    <option value="BYD">BYD</option>
                    <option value="CHEVROLET">CHEVROLET</option>
                    <option value="FORD">FORD</option>
                    <option value="HONDA">HONDA</option>
                    <option value="HYUNDAI">HYUNDAI</option>
                    <option value="ISUZU">ISUZU</option>
                    <option value="JAGUAR">JAGUAR</option>
                    <option value="JEEP">JEEP</option>
                    <option value="KIA">KIA</option>
                    <option value="LAND ROVER">LAND ROVER</option>
                    <option value="MAHINDRA">MAHINDRA</option>
                    <option value="MITSUBISHI">MITSUBISHI</option>
                    <option value="MG">MG</option>
                    <option value="NISSAN">NISSAN</option>
                    <option value="ROLLS-ROYCE">ROLLS-ROYCE</option>
                    <option value="SUZUKI">SUZUKI</option>
                    <option value="SKODA">SKODA</option>
                    <option value="TATA">TATA</option>
                    <option value="TOYOTA">TOYOTA</option>
                    <option value="VOLKSWAGEN">VOLKSWAGEN</option>
                    <option value="VOLVO">VOLVO</option>
                  </select>
                  {errors.brand && <p className="error-message">{errors.brand}</p>}
                </div>

                <button type="submit" >Search</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookCar;
