import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { defaultImg } from "images";
import { Link } from "react-router-dom";
import { useResize } from "hooks";
import links from "links";
import { setActivePage } from "redux/activePageSlice";
import { useDispatch } from "react-redux";

const CustomSlider = ({ 
  items,
  navigateLink
}) => {
  const windowWidth = useResize();

  const numberOfSlides = Math.round(Math.floor(windowWidth / 150));

  const dispatch = useDispatch();

  return (
    <Slider 
      dots={ windowWidth > 700 }
      centerMode={ true }
      infinite={ true }
      autoplaySpeed={ 2500 }
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
            onClick={ () => {
              dispatch(setActivePage(''))
            } }
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
                  height: '175px',
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