


function BookCar() {
  return (
    <>
      <section id="booking-section" className="book-section">
        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Search a car</h2>

              <p className="error-message">
                All fields required! <i className="fa-solid fa-xmark"></i>
              </p>

              <p className="booking-done">
                Check your email to confirm an order.{" "}
                <i className="fa-solid fa-xmark"></i>
              </p>

              <form className="box-form">
                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-car"></i> &nbsp; Select Fuel Type{" "}
                    <b>*</b>
                  </label>
                  <select>
                    <option>Select Fuel type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Select
                    Engine/Motor Capacity <b>*</b>
                  </label>
                  <select>
                    <option>Select Engine/Motor Capacity</option>
                    <option>Less than 1000cc</option>
                    <option>1001cc - 2000cc</option>
                    <option>2001cc - 3000cc</option>
                    <option>Above 3000cc </option>
                    <option>Less than 30KWh</option>
                    <option>30KWh - 50KWh</option>
                    <option>50KWh - 70KWh</option>
                    <option>50KWh - 70KWh</option>
                    <option>Above 70KWh</option>
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Select
                    Mileage <b>*</b>
                  </label>
                  <select>
                    <option>Select Mileage/Range</option>
                    <option>Less than 10kmpl</option>
                    <option>10kmpl - 15kmpl</option>
                    <option>15kmpl - 20kmpl</option>
                    <option>20kmpl - 25kmpl</option>
                    <option>Above 25kmpl</option>
                    <option>Less than 200km</option>
                    <option>200km - 300km</option>
                    <option>300km - 400km</option>
                    <option>400km - 500km</option>
                    <option>500km - 600km</option>
                    <option>Above 600km</option>
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Select
                    Price Range <b>*</b>
                  </label>
                  <select>
                    <option>Select Price Range</option>
                    <option>Less than 10L</option>
                    <option>10L - 20L</option>
                    <option>20L - 30L</option>
                    <option>30L - 40L</option>
                    <option>40L - 50L</option>
                    <option>50L - 60L</option>
                    <option>60L - 70L</option>
                    <option>70L - 80L</option>
                    <option>80L - 90L</option>
                    <option>90L - 1Cr</option>
                    <option>Above 1Cr</option>
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Select
                    Car Brand <b>*</b>
                  </label>
                  <select>
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
                    <option value="TOYOTA">TATA</option>
                    <option value="TOYOTA">TOYOTA</option>
                    <option value="VOLKSWAGEN">VOLKSWAGEN</option>
                    <option value="VOLVO">VOLVO</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>

                <button type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookCar;
