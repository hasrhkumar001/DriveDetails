import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Footer() {
  const navigate = useNavigate();

  const handleSearch = async (type, value) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/cars?${type}=${value}`);
      navigate('/search-results', { state: { data: response.data.data } });
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-content">
            <ul className="footer-content__1">
              <li>
                <span>Drive</span>Details
              </li>
              <li>
                Discover comprehensive information about cars, right at your fingertips.
              </li>
              <li>
                <a href="tel:123456789">
                  <i className="fa-solid fa-phone"></i> &nbsp; (123) -456-789
                </a>
              </li>

              <li>
                <a href="mailto: abc@gmail.com">
                  <i className="fa-solid fa-envelope"></i>
                  &nbsp; drivedetails@gmail.com
                </a>
              </li>

              <li className="fs-5">
                
                  Designed by Harsh Kumar
                
              </li>
            </ul>

            <ul className="footer-content__2 footerlink">
              <li>Popular Brands</li>
              <li><span onClick={() => handleSearch('brand', 'Tata')}>Tata</span></li>
              <li><span onClick={() => handleSearch('brand', 'Mahindra')}>Mahindra</span></li>
              <li><span onClick={() => handleSearch('brand', 'Hyundai')}>Hyundai</span></li>
              <li><span onClick={() => handleSearch('brand', 'Kia')}>Kia</span></li>
            </ul>

            <ul className="footer-content__2 footerlink">
              <li>Popular Fuels</li>
              <li><span onClick={() => handleSearch('fuel_type', 'Petrol')}>Petrol</span></li>
              <li><span onClick={() => handleSearch('fuel_type', 'Diesel')}>Diesel</span></li>
              <li><span onClick={() => handleSearch('fuel_type', 'Electric')}>Electric</span></li>
            </ul>

            <ul className="footer-content__2 ">
              <li>Share Your Feedback</li>
              <li>
                <p>We value your insights to help us improve our service.</p>
              </li>
              <li>
                <input type="email" placeholder="Enter Email Address"></input>
              </li>
              <li>
                <button className="submit-email">Submit</button>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
