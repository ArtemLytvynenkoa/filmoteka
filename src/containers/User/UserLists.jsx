import { 
  Tabs, 
  Typography 
} from "antd";
// import { WatchedList } from ".";

const { Title } = Typography;

const UserLists = () => (
  <div className="mainContent">
    <Tabs
      defaultActiveKey="trailer"
      centered
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
        // children: <WatchedList/>,
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
        // children: <CastTab cast={ cast }/>,
      }]}
    />
  </div>
);

export default UserLists;