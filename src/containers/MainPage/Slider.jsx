import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { defaultImg } from "images";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useResize } from "hooks";
import links from "links";

const CustomSlider = ({ 
  items,
  navigateLink
}) => {
  const windowWidth = useResize();

  const numberOfSlides = Math.round(Math.floor(windowWidth / 150));

  useEffect(() => {

  }, [])

  return (
    <Slider 
      dots={ windowWidth > 700 }
      centerMode={ true }
      infinite={ true }
      autoplaySpeed={ 2000 }
      autoplay={ true }
      speed={ 500 }
      slidesToShow={ numberOfSlides }
      slidesToScroll={ 1 }
    >
      { items?.map(({ 
        poster_path,
        title,
        name,
        id,
        }) => (
          <div
            key={ id }
            style={{
              padding: '0 5px',
              cursor: 'pointer',
              borderRadius: '10px',
            }}
          >
            <Link 
              to={ `${navigateLink}/${id}` } 
              state={{ from: links.mainPage }}
            >
              <img
                src={ poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : defaultImg } 
                alt={ title || name }
                style={{
                  width: '115px',
                  // height: '450px',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              />
            </Link>
          </div>
        ))
      }
    </Slider>
  );
};

export default CustomSlider;