// src/CarDetail.js

import { useParams } from 'react-router-dom';
import HeroPages from "../components/HeroPages";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, List, ListItem } from '@mui/material';

const CarDetail = () => {
    let [cars, setCars] = useState({});
    const { id } = useParams();
    const token = localStorage.getItem("authToken");
  
    useEffect(() => {
      const fetchCars = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/cars/${id}`);
  
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
        }
      };
  
      fetchCars();
    }, [id]);
    
  

    const formatMileage = (mileage, fuelType) => {
        if (fuelType === 'PETROL' || fuelType === 'DIESEL') {
          return `${mileage} Kmpl`;
        } else if (fuelType === 'ELECTRIC') {
          return `${mileage} Km`;
        }
        return mileage;
      };
    
    const formatEngineCapacity = (engineCapacity, fuelType) => {
        if (fuelType === 'PETROL' || fuelType === 'DIESEL') {
          return `${engineCapacity} cc`;
        } else if (fuelType === 'ELECTRIC') {
          return `${engineCapacity} KWh`;
        }
        return engineCapacity;
      };

    return (
        <Container sx={{ mt: 5 }}>
            <Grid container spacing={3} className="d-flex align-items-center">
                <Grid item md={6}>
                    
                        <CardMedia
                            component="img"
                            
                            image={`http://127.0.0.1:8000/public/photos/${cars.car_img}`}
                            
                        />
                        
                   
                </Grid>
                <Grid item md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h3" component="div">
                            {cars.brand_name} {cars.car_name}  
                                </Typography>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                            {cars.model_year}
                            </Typography>
                            <Typography variant="h4" paragraph>
                                <strong>Price:</strong> {cars.car_price}
                            </Typography>
                            <Typography variant="h4" paragraph>
                                <strong>Transmission type:</strong> {cars.transmission_type}
                            </Typography>
                            <Typography variant="h4" paragraph>
                                <strong>Mileage:</strong> {formatMileage(cars.car_mileage, cars.fuel_type)}
                            </Typography>
                            <Typography variant="h4" paragraph>
                                <strong>Fuel type:</strong> {cars.fuel_type}
                            </Typography>
                            <Typography variant="h4" paragraph>
                                <strong>Engine:</strong> {formatEngineCapacity(cars.engine_capacity, cars.fuel_type)}
                            </Typography>
                            <Typography variant="h5" paragraph>
                                {cars.car_desc}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CarDetail;
