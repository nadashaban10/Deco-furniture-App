import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

import img1 from '../images/banner/1.jpg';
import img2 from '../images/banner/2.jpg';
import img3 from '../images/banner/3.jpg';
import img4 from '../images/banner/4.jpg';
import img5 from '../images/banner/5.jpg';

const images = [img1, img2, img3, img4, img5];

const Banner = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-[87%] m-auto relative">
      <div className="w-full lg:w-[90%] mx-auto">
        <div className="w-full flex flex-wrap md:gap-8 lg:gap-8">
          <div className="w-full">
            <div className="my-8 ">
              <Carousel

                autoPlay={true}
                infinite={true}
                arrows={true}
                showDots={true}
                responsive={responsive}
                className="z-0"
              >
                {images.map((img, index) => (
                  <Link key={index} to="#">
                    <img
                      className="banner-img sm:h-[210px]"
                      src={img}
                      alt={`banner ${index + 1}`}
                    />
                  </Link>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;