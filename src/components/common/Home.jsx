import React from "react";
import ImageCarousel from "../image-carousel/ImageCarousel";

const Home = () => {
  return (
    <div>
      <ImageCarousel />
      <div className="container mt-4">
        <h2>Welcome to Our E-Commerce Platform</h2>
        <p>
          Explore a wide range of products and discover the convenience of
          online shopping with our e-commerce website. We offer a diverse
          collection of high-quality items, from electronics to fashion, home
          goods, and more.
        </p>
        <p>
          Shop with confidence, knowing that our user-friendly interface and
          secure payment system ensure a seamless and safe shopping experience.
          Whether you're looking for the latest tech gadgets, trendy fashion
          pieces, or home essentials, we've got you covered.
        </p>
        <p>
          Start browsing our catalog today and enjoy the convenience of having
          your favorite products delivered right to your doorstep. Thank you for
          choosing us for your online shopping needs!
        </p>
      </div>
    </div>
  );
};

export default Home;
