import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ProductImage({ product }) {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (product) setSlides(product.ProductImages);
  }, [product]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="product-page">
      <div
        className="product-image" >
        <img src={slides[currentIndex]}></img>
     </div>
      <div className="left-arrow" onClick={prevSlide}>
        <FontAwesomeIcon icon={faArrowLeft} size="x" />
      </div>
      
      <div className="right-arrow" onClick={nextSlide}>
        <FontAwesomeIcon icon={faArrowRight} size="x" />
      </div>
      <div className="dots">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`dot ${slideIndex === currentIndex ? "active" : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ProductImage;
