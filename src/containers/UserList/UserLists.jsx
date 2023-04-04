import { 
  Tabs, 
  Typography 
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setPageNum } from "redux/pageNumSlice";
import { 
  QueueList, 
  WatchedList 
} from ".";
import { setUserListActiveKey } from "redux/userListActiveKeySlice";

const { Title } = Typography;

const UserLists = () => {
  const dispatch = useDispatch();

  const userListActiveKey = useSelector(state => state.userListActiveKey.value)

  return (
    <div className="mainContent">
      <Tabs
        defaultActiveKey={ userListActiveKey } 
        centered
        onChange={ activeKey => {
          dispatch(setPageNum(1));
          dispatch(setUserListActiveKey(activeKey))
        } }
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