import React from "react";
import Slider, { CustomArrowProps } from "react-slick";

function NextArrow(props: CustomArrowProps) {
  const { className, onClick } = props;
  return <div className={`max-md:!hidden ${className}`} onClick={onClick} />;
}

function PrevArrow(props: CustomArrowProps) {
  const { className, onClick } = props;
  return <div className={`max-md:!hidden ${className}`} onClick={onClick} />;
}

const CustomSlider = ({ children }: { children: React.ReactNode }) => {
  const settings = {
    infinite: false,
    accessibility: true,
    swipeToSlide: true,
    variableWidth: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return <Slider {...settings}>{children}</Slider>;
};

export default CustomSlider;
