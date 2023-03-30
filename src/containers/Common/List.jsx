import { 
  Col,
  Row, 
} from "antd";
import { 
  Card, 
  Notification, 
  Pagination, 
  SimplePagination
} from ".";

const List = ({
  data,
  allGenres,
  navigateLink,
  simple,
  handlePrevClick,
  handleNextClick,
  isLoading,
}) => {
  const maxItemCount = 10000;

  return (
    <div className="mainContent">
      { data?.results?.length === 0
        ? <Notification text='Nothing was found for this query! Try again!' />
        : (
          <>
            { !simple ? (
              <Pagination
                totalResults={ 
                  data?.total_results > maxItemCount 
                    ? maxItemCount 
                    : data?.total_results
                }
              />) : (
                <SimplePagination
                  handlePrevClick={ handlePrevClick }
                  handleNextClick={ handleNextClick }
                  isLoading={ isLoading }
                  totalResults={ 
                    data?.total_results > maxItemCount 
                      ? maxItemCount 
                      : data?.total_results
                  }
                />)
            }
            <Row 
              gutter={ [ 8, 8 ] } 
            >
            { data?.results?.map(({ 
              title,
              name,
              poster_path,
              release_date,
              first_air_date,
              genre_ids,
              genres,
              id,
              vote_average,
            }) => (
              <Col span={ 6 } key={ id }>
                <Card 
                  title={ title ? title : name }
                  posterPath={ poster_path }
                  releaseDate={ release_date || first_air_date}
                  genreIds={ genres ? genres.map(({ id }) => id) : genre_ids }
                  id={ id }
                  rating={ vote_average }
                  allGenres={ allGenres }
                  navigateLink={ navigateLink }
                />
              </Col>
            ))}
          </Row>
          { !simple ? (
            <Pagination
              totalResults={ 
                data?.total_results > maxItemCount 
                  ? maxItemCount 
                  : data?.total_results
              }
            />) : (
              <SimplePagination
                totalResults={ 
                  data?.total_results > maxItemCount 
                    ? maxItemCount 
                    : data?.total_results
                }
              />)
          }
          </>
        )
      }
    </div>
  )
}

export default List;