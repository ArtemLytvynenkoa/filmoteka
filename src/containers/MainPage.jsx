import {
  Col,
   Divider,
   Image,
   Pagination,
   Row, 
   Space,
   Typography
} from "antd";
import { LoadingIndicator } from "components";
import { 
  useEffect,
  useState
} from "react";
import { apiServices } from "services";

const { Text } = Typography;

const MainPage = () => {
  const [ pageNum, setPageNum ] = useState(1);
  const [ isLoading, setIsLoading] = useState(false);
  const [ popularMovies, setPopularMovies ] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    apiServices.fetchPopularMovies(pageNum).then(data => setPopularMovies(data));
    setIsLoading(false);
  }, [pageNum])

  if (isLoading || !popularMovies) return <LoadingIndicator /> 

  console.log(popularMovies.results);

  const releaseDate = new Date();

  return (
    <> 
      <Row gutter={ 16 }>
        { popularMovies.results.map(({ 
          title,
          poster_path,
          release_date
        }) => (
          <Col span={ 8 }>
            <Space direction="vertical">
              <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
              <Text>{title}</Text>
              <Space>
                <Text></Text>
                <Divider />
                <Text>{releaseDate.getFullYear()}</Text>
              </Space>
            </Space>
          </Col>
        )) }
      </Row>
      <Pagination
        style={{ marginLeft: 'auto' }}
        total={ popularMovies.total_results }
        pageSize={ 20 }
        showSizeChanger={ false }
        showQuickJumper
        onChange={ page => setPageNum(page) }
      />
    </>
  )
};

export default MainPage;