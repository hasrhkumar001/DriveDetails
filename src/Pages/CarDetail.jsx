// src/CarDetail.js

import { useParams } from 'react-router-dom';
import HeroPages from "../components/HeroPages";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, List, ListItem } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Review from '../components/Review';
import CarModelDropdown from '../components/CarModelDropdown';

const CarDetail = () => {
    let [cars, setCars] = useState({});
    const { id } = useParams();
    const token = localStorage.getItem("authToken");
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    
    useEffect(() => {
      const fetchCars = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/cars/${id}`);
            setLoading(false);
          
          
  
          // Log the response to check its structure
          // console.log('API Response:', response.data);
  
          const allCars = response.data.data;
  
          
          setCars(allCars);
        } catch (error) {
          console.error("Error fetching the cars data:", error);
          setLoading(false);
        }
      };
  
      fetchCars();
      fetchReviews();
     
      
    }, [id]);

    
    
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cars/${id}/reviews`);
        
        calculateAverageRating(response.data);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
  
    const calculateAverageRating = (reviews) => {
      if (reviews.length === 0) {
        setAverageRating(0);
      } else {
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        const average = total / reviews.length;
        setAverageRating(average.toFixed(1)); // round to 1 decimal place
      }
    };
  

    const formatPriceRange = (priceRange) => {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
  
      const formatValue = (value) => {
        if (value < 1000) return value;
        if (value >= 1000 && value < 100000) return `${(value / 1000).toFixed(1)}K`;
        if (value >= 100000 && value < 10000000) return `${(value / 100000).toFixed(1)}L`;
        if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
      };
  
      return `${formatValue(minPrice)} - ${formatValue(maxPrice)}`;
    };

    const formatMileage = (mileage, fuelType) => {
      const fuelTypesArray = fuelType.split(','); // Split the string into an array
    
      // Check if any of the specified fuel types are present
      if (fuelTypesArray.includes('PETROL') || fuelTypesArray.includes('DIESEL') || fuelTypesArray.includes('HYBRID')) {
          return `${mileage} Kmpl`;
        }else if (fuelTypesArray.includes('ELECTRIC')) {
          return `${mileage}Km`;
        }
        return mileage;
      };
    
      const formatEngineCapacity = (engineCapacity, fuelType) => {
        const fuelTypesArray = fuelType.split(','); // Split the string into an array
    
        // Check if any of the specified fuel types are present
        if (fuelTypesArray.includes('PETROL') || fuelTypesArray.includes('DIESEL') || fuelTypesArray.includes('HYBRID')) {
            return `${engineCapacity}cc`;
        } else if (fuelTypesArray.includes('ELECTRIC')) {
            return `${engineCapacity}KWh`;
        }
    
        return engineCapacity;
      };
    
      const handleModelSelect = (selectedModel) => {
        setCars(selectedModel);
    };

    return (
        <Container sx={{ mt: 5 }}>
          {loading ?  (
              <p
                className="text-center fs-1 fw-bold "
                style={{ gridColumn: " 2 / 3" }}
              >
                {" "}
                <CircularProgress style={{ color : "black"}}/>
                
              </p>
            ) : (
            <Grid container spacing={3} className="d-flex align-items-center">
                <Grid item md={6}>
                    
                        <CardMedia
                            component="img"
                            
                            image={`http://127.0.0.1:8000/public/photos/${cars.car ? cars.car.car_img : cars.car_img}`}
                            
                        />
                        
                   
                </Grid>
                <Grid item md={6}>
                    <Card className='shadow'>
                        <CardContent style={{fontFamily: "Poppins"}}>
                            <Typography variant="h2" component="div" style={{ fontWeight :"700"}} className='d-flex align-items-end justify-content-between mb-3'>
                              <div>{`${cars.car ? cars.car.brand : cars.brand_name}`} <span style={{color: "#ff4d30"}} >{`${cars.car ? cars.car.car_name : cars.car_name}`}</span></div>  <Typography variant="h4" color="text.secondary" gutterBottom>
                              <CarModelDropdown  carId={cars.id} onSelectModel={handleModelSelect} />
                            </Typography>
                            {/* Display Average Rating */}
                            
                                </Typography>
                                <h3 className='d-flex align-items-baseline' style={{ fontSize: "1.4rem", fontFamily: "Poppins", marginTop: "20px" }}>
                                <i className={`bx bxs-star`}
                                  style={{ color: '#ff4d30', fontSize: '1.4rem' }}
                                ></i>{averageRating}
                              <span style={{ marginLeft: "10px" }}>({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                              </span>
                            </h3>
                                <hr />
                                
                            
                            <Typography variant="h4" className='mt-4 ' paragraph>
                                <i className="bx bx-dollar  mx-2 fs-1 " style={{fontWeight : "normal"}}></i>
                                Price: <strong>&#x20b9;{`${cars.car ? cars.car_price : formatPriceRange(cars.car_price_range)}`}</strong>
                            </Typography>
                            <Typography variant="h4"  paragraph>
                                <i className="bx bx-cog mx-2 fs-1"></i>
                                Transmission type: <strong>{cars.transmission_type}</strong>
                            </Typography>
                            <Typography variant="h4" paragraph>
                                
                                <i className="bx bx-tachometer mx-2 fs-1"></i>
                                Mileage: <strong>{formatMileage(cars.car_mileage, cars.fuel_type)}</strong>
                            </Typography>
                            <Typography variant="h4" paragraph>
                                <i className="bx bx-gas-pump mx-2 fs-1"></i>
                                Fuel type: <strong>{cars.fuel_type}</strong>
                            </Typography>
                            <Typography variant="h4" paragraph>
                                <i className="bx bx-car mx-2 fs-1"></i>
                                Engine: <strong>{formatEngineCapacity(cars.engine_capacity, cars.fuel_type)}</strong>
                            </Typography>
                            <Typography variant="h4" className='text-secondary' style={{textAlign : "justify"}} paragraph>
                                {cars.car_desc}
                            </Typography>
                        </CardContent>
                    </Card>
                    
                </Grid>
                <Grid item md={12}>
                    
                    </Grid>
                    <Grid item md={12}>
                    
                    </Grid>
                <Container>
                    <Grid item md={12}>
                    <Review carId={cars.id} />
                    </Grid>
                </Container>
                
            </Grid>
            
            )}

        </Container>
    );
};

export default CarDetail;
