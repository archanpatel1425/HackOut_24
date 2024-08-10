import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/Seeds.css';
import axios from 'axios';
import React, { useState } from 'react'
const Seeds = () => {
  const products = [
    { id: 1, image: 'https://th.bing.com/th/id/OIP.Pa4_fWBPlQfpEHGylO3UmgHaFS?rs=1&pid=ImgDetMain', name: 'Organic Vegetable', price: '$19.00' },
    { id: 2, image: 'https://th.bing.com/th/id/OIP.Pa4_fWBPlQfpEHGylO3UmgHaFS?rs=1&pid=ImgDetMain', name: 'Organic Vegetable', price: '$19.00' },
    { id: 3, image: 'https://th.bing.com/th/id/OIP.Pa4_fWBPlQfpEHGylO3UmgHaFS?rs=1&pid=ImgDetMain', name: 'Organic Vegetable', price: '$19.00' },
    { id: 4, image: 'https://th.bing.com/th/id/OIP.Pa4_fWBPlQfpEHGylO3UmgHaFS?rs=1&pid=ImgDetMain', name: 'Organic Vegetable', price: '$19.00' },
    { id: 5, image: 'https://th.bing.com/th/id/OIP.Pa4_fWBPlQfpEHGylO3UmgHaFS?rs=1&pid=ImgDetMain', name: 'Organic Vegetable', price: '$19.00' },
  ];
  const [amount, setAmount] = useState('19');

  const handlePayment = async () => {
    const orderUrl = 'http://localhost:3001/create-order';
    const response = await axios.post(orderUrl, {
      amount,
      currency: 'INR',
      receipt: 'receipt#1'
    });

    const { id, amount: orderAmount, currency } = response.data;

    const options = {
      key: 'rzp_test_40nHjHFzziBJq8',
      amount: orderAmount,
      currency,
      name: 'FarmEase',
      description: 'Test Transaction',
      order_id: id,
      handler: async (response) => {
        const verifyUrl = 'http://localhost:3001/verify-payment';
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
        const verifyResponse = await axios.post(verifyUrl, {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
        });
        /* 
                        if (verifyResponse.data.status === 'success') {
                          alert('Payment successful');
                        } else {
                          alert('Payment verification failed');
                        }  */
      },
      prefill: {
        name: 'Your Name',
        email: 'your.email@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  }
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="mx-auto text-center mb-5" style={{ maxWidth: '500px' }}>
          <h6 className="text-primary text-uppercase">Products</h6>
          <h1 className="display-5">Our Fresh & Organic Products</h1>
        </div>
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          className="product-carousel px-5"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="product-item position-relative bg-white d-flex flex-column text-center">
                <img className="img-fluid mb-4" src={product.image} alt={product.name} />
                <h6 className="mb-3">{product.name}</h6>
                <h5 className="text-primary mb-0">{product.price}</h5>
                <div className="btn-action d-flex justify-content-center mt-3">
                  <a className="btn bg-primary py-2 px-3" href="#">
                    <i className="bi bi-cart text-white"></i>
                  </a>
                  <a className="btn bg-secondary py-2 px-3 mx-2" href="#">
                    <i className="bi bi-eye text-white"></i>
                  </a>
                  <button  className="btn btn-buy-now py-2 px-4" onClick={handlePayment}>
                    Buy Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Seeds;