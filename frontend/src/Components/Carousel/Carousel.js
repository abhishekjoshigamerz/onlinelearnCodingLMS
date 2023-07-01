import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const CarouselComponent = () => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      autoPlay
      infiniteLoop
    >
      <div>
        <img src="https://via.placeholder.com/1200x350" alt="Carousel Image 1" />
      </div>
      <div>
        <img src="https://via.placeholder.com/1200x350" alt="Carousel Image 2" />
      </div>
      <div>
        <img src="https://via.placeholder.com/1200x350" alt="Carousel Image 3" />
      </div>
    </Carousel>
  );
}

export default CarouselComponent;
