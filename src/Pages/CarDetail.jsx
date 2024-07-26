// src/CarDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, List, ListItem } from '@mui/material';

const CarDetail = () => {
    const { id } = useParams(); // Assuming you're using React Router and `id` is the car's identifier.

    // Example car data (in a real app, you'd fetch this data from an API)
    const car = {
        id: id,
        make: 'Tesla',
        model: 'Model S',
        year: 2022,
        price: '$80,000',
        description: 'The Tesla Model S is an all-electric luxury sedan with impressive performance and cutting-edge technology.',
        features: [
            'Electric',
            'Autopilot',
            'Long Range Battery',
            'High Performance'
        ],
        image: './images/cars-big/benz.jpg'
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Grid container spacing={3}>
                <Grid item md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="200"
                            image={car.image}
                            alt={`${car.make} ${car.model}`}
                        />
                        <CardContent>
                            <Typography variant="h3" component="div">
                                {car.make} {car.model}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                {car.year}
                            </Typography>
                            <Typography variant="h4" paragraph>
                                <strong>Price:</strong> {car.price}
                            </Typography>
                            <Typography variant="h5" paragraph>
                                {car.description}
                            </Typography>
                            <Button variant="contained" color="primary">Contact Seller</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h2" component="div">
                                Features
                            </Typography>
                            <List >
                                {car.features.map((feature, index) => (
                                    <ListItem key={index} >
                                        {feature}
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CarDetail;
