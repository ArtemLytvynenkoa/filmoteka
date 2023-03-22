import { 
  Col,
  Row, 
  message
} from "antd";
import { Card, Pagination } from ".";

const List = ({
  data,
  allGenres,
  navigateLink
}) => {
  const maxItemCount = 10000;

  return (
    <div className="mainContent">
      { data.results.length === 0 
        ? message.error('Nothing was found for this query! Try again!') 
        : (
          <>
            <Pagination
              totalResults={ 
                data.total_results > maxItemCount 
                  ? maxItemCount 
                  : data.total_results
              }
            />
            <Row 
              gutter={ [ 8, 8 ] } 
            >
            { data.results.map(({ 
              title,
              name,
              poster_path,
              release_date,
              first_air_date,
              genre_ids,
              id,
              vote_average,
            }) => (
              <Col span={ 6 } key={ id }>
                <Card 
                  title={ title || name }
                  posterPath={ poster_path }
                  releaseDate={ release_date || first_air_date}
                  genreIds={ genre_ids }
                  id={ id }
                  rating={ vote_average }
                  allGenres={ allGenres }
                  navigateLink={ navigateLink }
                />
              </Col>
            )) }
          </Row>
          <Pagination  
            totalResults={ 
              data.total_results > maxItemCount 
                ? maxItemCount 
                : data.total_results
            }
          />
          </>
        )
      }
    </div>
  )
}

export default List;