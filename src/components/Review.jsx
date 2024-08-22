import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

function Review({ carId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [reviewHeading, setReviewHeading] = useState('');
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/cars/${carId}/reviews`);
      setReviews(response.data);
      calculateAverageRating(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !review) {
      setErrors({ rating: 'Rating is required', review: 'Review is required' });
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/reviews',
        { rating, review,reviewHeading, car_id: carId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200){
      setErrors({reviewFetch:'Login Again, Token Expired'});
    }

      setRating('');
      setReview('');
      setReviewHeading('');
      fetchReviews(); // Refresh the reviews after submission
    } catch (error) {
      console.error('Error submitting review:', error);
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

  const renderStars = (rating) => {
    return (
      <div>
        {[...Array(5)].map((star, i) => {
          const starValue = i + 1;
          return (
            <i
              key={i}
              className={`bx ${starValue <= rating ? 'bxs-star' : 'bx-star'}`}
              style={{ color: '#ff4d30', fontSize: '2rem' }}
            ></i>
          );
        })}
      </div>
    );
  };

  return (
    <div >
      <h1 className="text-center "
          style={{
            fontSize: "4.2rem",
            fontFamily: "Poppins",
            fontWeight: 700,
            color: "#010103",
            textAlign:"left",
            marginTop: "90px"}}>Reviews</h1>
            <div className='d-flex'>
      {reviews.map((review) => (
          <div className='d-flex col-4'>
        <div key={review.id} className="review p-5 m-3 w-100 " style={{border: "1px solid #dfdfdf"}}>
            <div className='d-flex align-items-center'>
                
                <h4 style={{
                fontSize: "2.4rem",
                fontFamily: "Poppins"}}>{review.reviewHeading}</h4>
            </div>
            <div className=''>
            <div>{renderStars(review.rating)}</div>
          <p className='fs-4 text-secondary'>{review.user.name} </p>
          <p className='fs-4'> {review.review}</p>
          </div>
        </div>
        </div>
      ))}
      </div>

      {token ? (
        <form onSubmit={handleSubmit} className="shadow" style={{marginTop:"50px",padding:"20px" }}>
          

            <h4 style={{
                fontSize: "2.4rem",
                fontFamily: "Poppins"}}>Write a Review</h4>
            <div className='d-flex justify-content-center flex-column'>
            
            <StarRating rating={rating} setRating={setRating} />
            {errors.reviewFetch && <p>{errors.reviewFetch}</p>}
            {errors.rating && <p>{errors.rating}</p>}
          </div>
            
          
          <div className='d-flex justify-content-center flex-column'>
            
            <textarea
              value={reviewHeading}
              placeholder="Title"
              width="500px"
              style={{padding:"10px", marginBottom:"5px" ,fontSize:"14px" ,border: "1px solid #dfdfdf"}}
              onChange={(e) => setReviewHeading(e.target.value)}
            ></textarea>
            {errors.reviewHeading && <p className="error-message">{errors.reviewHeading}</p>}
          </div>

          <div className='d-flex justify-content-center flex-column'>
            
            <textarea
              value={review}
              width="500px"
              style={{minHeight:"100px",padding:"10px",fontSize:"14px", marginBottom:"5px",border: "1px solid #dfdfdf" }}
              placeholder='Share details of your own experience'
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            {errors.review && <p className="error-message">{errors.review}</p>}
          </div>

          <button style={{backgroundColor: "#ff4d30" ,border:"none" ,color:"white",fontWeight:"700"}}
                className="btn-lg btn-block w-100 fs-3 py-3 " type="submit">Submit Review</button>
        </form>
      ) : (
        <p className='text-center fs-2 text-secondary mt-3'>Login to add rating and reviews</p>
      )}
    </div>
  );
}

export default Review;
