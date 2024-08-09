// src/CarDetail.js

import { useParams } from 'react-router-dom';
import HeroPages from "../components/HeroPages";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, List, ListItem } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const CarDetail = () => {
    let [cars, setCars] = useState({});
    const { id } = useParams();
    const token = localStorage.getItem("authToken");
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchCars = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/cars/${id}`);
            setLoading(false);
          
          
  
          // Log the response to check its structure
          // console.log('API Response:', response.data);
  
          const allCars = response.data.data;
  
          // Sort by creation date or any other relevant field if necessary
          // If the API already sorts the cars, you can directly slice the array
          // allCars.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
          // Slice to get only the most recent 6 cars
          
  
          // console.log(response.data.data);
          setCars(allCars);
        } catch (error) {
          console.error("Error fetching the cars data:", error);
          setLoading(false);
        }
      };
  
      fetchCars();
    }, [id]);
    
  

    const formatMileage = (mileage, fuelType) => {
        if (fuelType === 'PETROL' || fuelType === 'DIESEL') {
          return `${mileage}Kmpl`;
        } else if (fuelType === 'ELECTRIC') {
          return `${mileage}Km`;
        }
        return mileage;
      };
    
    const formatEngineCapacity = (engineCapacity, fuelType) => {
        if (fuelType === 'PETROL' || fuelType === 'DIESEL') {
          return `${engineCapacity}cc`;
        } else if (fuelType === 'ELECTRIC') {
          return `${engineCapacity}KWh`;
        }
        return engineCapacity;
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
                            
                            image={`http://127.0.0.1:8000/public/photos/${cars.car_img}`}
                            
                        />
                        
                   
                </Grid>
                <Grid item md={6}>
                    <Card className='shadow'>
                        <CardContent style={{fontFamily: "Poppins"}}>
                            <Typography variant="h2" component="div" style={{ fontWeight :"700"}} className='d-flex align-items-end justify-content-between mb-3'>
                              <div>{cars.brand_name} <span style={{color: "#ff4d30"}} >{cars.car_name}</span></div>  <Typography variant="h4" color="text.secondary" gutterBottom>
                             {cars.model_year}
                            </Typography>
                                </Typography>
                                <hr />
                                
                            
                            <Typography variant="h4" className='mt-4 ' paragraph>
                                <i className="bx bx-dollar  mx-2 fs-1 " style={{fontWeight : "normal"}}></i>
                                Price: <strong>&#x20b9;{cars.car_price}</strong>
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
            </Grid>
            )}
        </Container>
    );
};

export default CarDetail;
