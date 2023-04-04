import { 
  LeftOutlined, 
  RightOutlined 
} from "@ant-design/icons";
import { 
  Button, 
  Space, 
  Tag
} from "antd";
import { useSelector } from "react-redux";

const SimplePagination = ({
  totalResults,
  handlePrevClick,
  handleNextClick,
}) => {
  const pageNum = useSelector(state => state.pageNum.value);

  return (
    <Space 
      style={{ margin: '25px 0'}}
    >
      <Button
        onClick={ () =>  handlePrevClick()}
        disabled={ pageNum === 1 }
        style={{ backgroundColor: 'transparent' }}
      >
        <LeftOutlined />
      </Button>
        <Space>
          <Tag color='#ff6b01'>
            { `${pageNum}`}
          </Tag>
          /
          <Tag color="gray">
            {`${Math.ceil(totalResults/20)}`}
          </Tag>
        </Space>
      <Button
        onClick={ () => handleNextClick()}
        disabled={ pageNum ===  Math.ceil(totalResults/20)}
        style={{ backgroundColor: 'transparent' }}
      >
        <RightOutlined />
      </Button>
    </Space>
  )
};

export default SimplePagination;