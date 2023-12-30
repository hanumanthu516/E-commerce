import React, { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import domestic from "../../assets/domestic.webp";
import flight from "../../assets/flight.webp";
import laptop from "../../assets/laptop.webp";
import mobile from "../../assets/mobile.webp";

const imagesList = [
  {
    id: 1,
    image: laptop,
  },
  {
    id: 2,
    image: domestic,
  },
  {
    id: 3,
    image: flight,
  },
  {
    id: 4,
    image: mobile,
  },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesList.length);
  };

  const startAutoScroll = () => {
    const intervalId = setInterval(() => {
      nextImage();
    }, 3000);
    return intervalId;
  };

  useEffect(() => {
    const intervalId = startAutoScroll();
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <Carousel
        activeIndex={currentIndex}
        onSelect={handleDotClick}
        interval={3000}
        // controls={false}
      >
        {imagesList.map((item, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={item.image}
              alt={`Slide ${index}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ImageCarousel;
