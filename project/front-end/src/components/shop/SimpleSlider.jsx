import React from "react";

const SimpleSlider = () => {
  return (
    <>
      <div
        id="carouselExample"
        class="carousel slide"
        data-bs-ride="carousel"
        style={{ width: "99%" }}
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="/img/shop/商城圖片2.svg" class="d-block w-100" />
          </div>
          <div class="carousel-item">
            <img src="/img/shop/商城圖片1.svg" class="d-block w-100" />
          </div>
          <div class="carousel-item">
            <img src="/img/shop/商城圖片3.svg" class="d-block w-100" />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default SimpleSlider;
