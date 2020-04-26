import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import { fetchMovies } from '../store/actions/movie';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';


const RecordTableRow = ({ person: movie }) => (
  <TableRow>
    <TableCell>{movie.title}</TableCell>
    <TableCell>{movie.year}</TableCell>
  </TableRow>
);

export default () => {

  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const { movies, total } = useSelector((state) => state.movie);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {

    dispatch(fetchMovies({page, limit }));

  }, [dispatch, limit, page]);


  return (
    <Paper className="tableContainer">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="table-header">Title</TableCell>
            <TableCell className="table-header">Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie, index) => <RecordTableRow key={index} person={movie} />)}

        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 30, 40, 50]}
              colSpan={3}
              count={total}
              rowsPerPage={limit}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>

  );
};

/*
 <div>
      Hello world {total} <br />
      {movies.map((movie)=><div>{movie.title}</div>)}
    </div>
*/