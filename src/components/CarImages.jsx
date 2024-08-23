import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgress } from '@mui/material';

const CarImages = ({ carId }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchCarImages = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/cars/${carId}/images`);
                setImages(response.data);
                if (response.data.length > 0) {
                    setSelectedImage(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching car images:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCarImages();
    }, [carId]);

    const handleThumbnailClick = (index) => {
        setSelectedImage(images[index]);
    };

    const handleMainImageClick = () => {
        setShowModal(true);
    };

    if (loading) return <p className="text-center fs-1 fw-bold" style={{ gridColumn: " 2 / 3" }} >
                            {" "}
                            <CircularProgress style={{ color : "black"}}/>
                            
                        </p>;

    return (
        <div className="car-images">
            {images.length > 0 ? (
                <>
                    {/* Main Image Display */}
                    <div className="main-image" onClick={handleMainImageClick}>
                        <img
                            src={`http://127.0.0.1:8000/public/photos/${selectedImage?.image_url}`}
                            alt="Car"
                            className="d-block w-100"
                            style={{ height: "500px", objectFit: 'cover', cursor: 'pointer' }}
                        />
                    </div>

                    {/* Thumbnail Carousel */}
                    <Carousel 
                        className="mt-3 custom-carousel" 
                        indicators={false} 
                        interval={null} 
                        controls={images.length > 5}
                        wrap={false}
                    >
                        {Array.from({ length: Math.ceil(images.length / 5) }).map((_, slideIndex) => (
                            <Carousel.Item key={slideIndex}>
                                <div className="d-flex justify-content-center">
                                    {images.slice(slideIndex * 5, slideIndex * 5 + 5).map((image, index) => (
                                        <img
                                            key={image.id}
                                            src={`http://127.0.0.1:8000/public/photos/${image.image_url}`}
                                            alt="Car Thumbnail"
                                            className="img-thumbnail m-2"
                                            style={{ width: "100px", height: "100px", objectFit: 'cover', cursor: 'pointer' }}
                                            onClick={() => handleThumbnailClick(slideIndex * 5 + index)}
                                        />
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>

                    {/* Fullscreen Modal */}
                    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" >
                    <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body >
                            <img
                                src={`http://127.0.0.1:8000/public/photos/${selectedImage?.image_url}`}
                                alt="Car Fullscreen"
                                className="w-100"
                                style={{ objectFit: 'cover' }}
                            />
                        </Modal.Body>
                    </Modal>
                </>
            ) : (
                <p>No images available for this car.</p>
            )}
        </div>
    );
};

export default CarImages;