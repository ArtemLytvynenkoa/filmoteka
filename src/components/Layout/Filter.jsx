import { 
  Space, 
  Select,
  Button,
  Drawer
} from "antd";
import { useResize } from "hooks";
import links from "links";
import { useState } from "react";
import { 
  useDispatch, 
  useSelector 
} from "react-redux";
import { 
  setFilterGenres, 
  setFilterYear, 
  setFilterVote, 
  resetFilters,
  setFilterIsOpen
} from 'redux/filterSlice';
import { setPageNum } from "redux/pageNumSlice";
import { setSearchQuery } from "redux/searchQuerySlice";
import { 
  getSelectVoteOptions, 
  getSelectYearOptions 
} from "utils";

const selectStyle = {
  width: 200,
}

const Filter = () => {
  const { moviesGenres, tvGenres } = useSelector(state => state.genres.value);
  const activePage = useSelector(state => state.activePage.value);
  const { isOpen } = useSelector(state => state.filter.value);

  const [genres, setGenres] = useState({ value: '', label: 'All Rate' });
  const [year, setYear] = useState('');
  const [vote, setVote] = useState('');

  const windowWidth = useResize();

  const dispatch = useDispatch(); 

  const allGenres = activePage === links.filmsPage ? moviesGenres : tvGenres;

  return (
    <Drawer
      className='tablet-drawer'
      title="Filter" 
      placement={ (windowWidth < 850) ? 'right' : 'top' }
      onClose={() => dispatch(setFilterIsOpen(!isOpen))} 
      open={isOpen}
      width={ (windowWidth < 850) && 300 }
    >
      <Space 
        className="filter"
        direction={ (windowWidth < 850) ? 'vertical' : 'horizontal' }
        style={{ 
          width: '100%', 
          justifyContent: 'center',
          textAlign: 'center' 
        }} >
        <Select
          value={ genres.label }
          style={ selectStyle }
          placeholder="Select Ganres"
          onChange={ (_, options) => setGenres(options)}
          options={[{
            value: '',
            label: 'All Genre'
          },
            ...allGenres?.map(({ name, id }) => ( { value: id, label: name } ))
          ]}
        />
        <Select
          value={ year }
          placeholder="Select Year"
          style={ selectStyle }
          onChange={ value => setYear(value) }
          options={[{
            value: '',
            label: 'All Year'
          },
            ...getSelectYearOptions()
          ]}
        />
        <Select
          value={ vote }
          placeholder="Select Vote"
          style={ selectStyle }
          onChange={ value => setVote(value) }
          options={[{
            value: '',
            label: 'All Rate'
          },
            ...getSelectVoteOptions()
          ]}
        />
        <Space>
          <Button
            type="primary"
            onClick={ () => {
              dispatch(setSearchQuery(''));
              dispatch(setFilterGenres(genres.value));
              dispatch(setFilterYear(year));
              dispatch(setFilterVote(vote));
              dispatch(setPageNum(1));
          }}
          >
            Filter out
          </Button>
          <Button
            type="primary"
            onClick={ () => {
              dispatch(resetFilters());
              dispatch(setPageNum(1));
              setGenres({
                value: '',
                label: 'All Rate'
              });
              setYear('');
              setVote('');
            } }
          >
            Reset filter
          </Button>
        </Space>
      </Space>
    </Drawer>
  );
};

export default Filter;