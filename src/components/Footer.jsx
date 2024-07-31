function Footer() {
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
                <a
                  href="mailto: 
                abc@gmail.com"
                >
                  <i className="fa-solid fa-envelope"></i>
                  &nbsp; drivedetails@gmail.com
                </a>
              </li>

              <li>
                <a
                  style={{ fontSize: "14px" }}
                  target="_blank"
                  rel="noreferrer"
                  href="#"
                >
                  Design by Harsh Kumar
                </a>
              </li>
            </ul>

            <ul className="footer-content__2">
              <li>Popular Brands</li>
              <li>Tata</li>
              <li>Mahindra</li>
              <li>Hyundai</li>
              <li>kia</li>
            </ul>

            <ul className="footer-content__2">
              <li>Popular fuels</li>
              <li>Petrol</li>
              <li>Diesel</li>
              <li>Electric</li>
            </ul>

            <ul className="footer-content__2">
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
