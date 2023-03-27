import { 
  Col,
  Row, 
} from "antd";
import { 
  Card, 
  Notification, 
  Pagination 
} from ".";

const List = ({
  data,
  allGenres,
  navigateLink
}) => {
  const maxItemCount = 10000;

  const totalResults = data.total_results ? data.total_results : data.length;
  const isNotification = data?.results?.length === 0 || data?.length === 0;
  const list = data?.results ? data?.results : data;

  return (
    <div className="mainContent">
      { isNotification
        ? <Notification text='Nothing was found for this query! Try again!' />
        : (
          <>
            <Pagination
              totalResults={ 
                totalResults > maxItemCount 
                  ? maxItemCount 
                  : totalResults
              }
            />
            <Row 
              gutter={ [ 8, 8 ] } 
            >
            { list?.map(({ 
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
                  title={ title ? title : name }
                  posterPath={ poster_path }
                  releaseDate={ release_date || first_air_date}
                  genreIds={ genre_ids }
                  id={ id }
                  rating={ vote_average }
                  allGenres={ allGenres }
                  navigateLink={ navigateLink }
                />
              </Col>
            ))}
          </Row>
          <Pagination  
            totalResults={ 
              totalResults > maxItemCount 
                ? maxItemCount 
                : totalResults
            }
          />
          </>
        )
      }
    </div>
  )
}

export default List;