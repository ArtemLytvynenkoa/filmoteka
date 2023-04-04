import { Pagination as AndPagination } from "antd"
import { 
  useDispatch,
  useSelector 
} from "react-redux"
import { setPageNum } from "redux/pageNumSlice";

const Pagination = ({
  totalResults
}) => {
  const dispatch = useDispatch();

  const pageNum = useSelector(state => state.pageNum.value);

  return (
    <AndPagination
      style={ { margin: '50px 0' } }
      current={ pageNum }
      total={ totalResults }
      pageSize={ 20 }
      showSizeChanger={ false }
      showQuickJumper
      onChange={ page => dispatch(setPageNum(page)) }
    /> 
  )
};

export default Pagination