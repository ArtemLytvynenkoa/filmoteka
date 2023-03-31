import { 
  Tabs, 
  Typography 
} from "antd";
import { useDispatch } from "react-redux";
import { setPageNum } from "redux/pageNumSlice";
import { 
  QueueList, 
  WatchedList 
} from ".";

const { Title } = Typography;

const UserLists = () => {
  const dispatch = useDispatch();

  return (
    <div className="mainContent">
      <Tabs
        defaultActiveKey="trailer"
        centered
        onChange={ () => dispatch(setPageNum(1)) }
        items={[{
          key: 'watched',
          label: (
            <Title 
              level={ 3 } 
              style={{ color: '#ff6b01' }}
            >
              Watched
            </Title>
          ),
          children: <WatchedList/>,
        }, {
          key: 'queue',
          label: (
            <Title 
              level={ 3 }
              style={{ color: '#ff6b01' }}  
            >
              Queue
            </Title>
          ),
          children: <QueueList/>,
        }]}
      />
    </div>
  );
};

export default UserLists;