import React, { useEffect, useState } from 'react';
import { Grid, Skeleton } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const slides = [
  {
    id: 1,
    url: 'slider.jpg',
    title: 'Slider1',
  },
  {
    id: 2,
    url: 'slider2.jpg',
    title: 'Slider2',
  },
  {
    id: 3,
    url: 'slider3.jpg',
    title: 'Slider3',
  },
];

export default function SliderCarousel() {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setLoading]   = useState(true);


  const handleHover = () => {
    setIsHovered(!isHovered);
  };


  useEffect(() => {
    const Load = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    Load();
  }, [])

  return isLoading ? (
    <Grid container spacing={2}>
            <Grid item xs={12} >
              <Skeleton variant="rectangular" animation="wave" width="100%" height={1000} />
            </Grid>
    </Grid>
    ) : (
    <Carousel
      autoPlay={true}
      indicators={false}
      navButtonsAlwaysVisible={true}
      navButtonsProps={{
        style: {
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '50%',
        },
      }}
    >
      {slides.map((slide, index) => (
        <Grid 
          item xs={12}
          key={index}
          display='flex' 
          alignItems='center'
          overflow='hidden'
          elevation={0}
        >
          <img
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
            src={slide.url}
            alt={slide.title}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
          />
        </Grid>
      ))}
    </Carousel>
  );
};