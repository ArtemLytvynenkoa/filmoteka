import { Input } from "antd";
import links from "links";
import { useState } from "react";
import { 
  useDispatch, 
  useSelector 
} from "react-redux";
import { 
  resetFilters, 
  setFilterIsOpen 
} from "redux/filterSlice";
import { setPageNum } from "redux/pageNumSlice";
import { setSearchQuery } from "redux/searchQuerySlice";

const { Search } = Input;

const SearchInput = () => {
  const activePage = useSelector(state => state.activePage.value);
  const searchQuery = useSelector(state => state.searchQuery.value);

  const [searchValue, setSearchValue] = useState(searchQuery);

  const dispatch = useDispatch();

  return (
    <Search
      placeholder={ 
        activePage === links.filmsPage
          ? 'Film search'
          : 'TV search'
      }
      value={ searchValue }
      color='#ff6b01'
      className='search-input'
      onChange={ e => setSearchValue(e.target.value) }
      onSearch={ value => {
        dispatch(setPageNum(1));
        dispatch(setSearchQuery(value));
        dispatch(resetFilters());
        dispatch(setFilterIsOpen(false))
        setSearchValue('')
      } }
    />
  );
};

export default SearchInput;