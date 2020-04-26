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
import TableContainer from '@material-ui/core/TableContainer';
import Chip from '@material-ui/core/Chip';

import { fetchMovies } from '../store/actions/movie';
import TablePaginationActions from './TablePagination';
import Grid from '@material-ui/core/Grid';
import SearchForm from './SearchForm';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    overflowX: 'hidden'
  },
  table: {
    marginTop: 20,
    minWidth: 750,
  },
  form:{
    zIndex: 10000000
  }
}));

const RecordTableRow = ({ movie }) => (
  <TableRow>
    <TableCell>{movie.title}</TableCell>
    <TableCell>{movie.year}</TableCell>
    <TableCell>{
      movie.cast.map((name, index) =>
        <Chip key={index} color='secondary' label={name} />
      )
    }</TableCell>
    <TableCell>{
      movie.genres.map((genre, index) =>
        <Chip key={index}  color='primary' label={genre} />
      )
    }</TableCell>
  </TableRow>
);

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [search, setSearchText] = React.useState('');

  const { movies, total, loading } = useSelector((state) => state.movie);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {

    dispatch(fetchMovies({ page: page + 1, limit, search }));

  }, [dispatch, limit, page, search]);


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction="row" justify="center" spacing={5}>
          <Grid spacing={3} item md={4} xs={11} className={classes.form}>
            <SearchForm searchText={search} setSearchText={setSearchText} />
          </Grid>
        </Grid>
        <TableContainer>
        <Table stickyHeader className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className="table-header">Title</TableCell>
              <TableCell className="table-header">Year</TableCell>
              <TableCell className="table-header">Actors</TableCell>
              <TableCell className="table-header">Genres</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie, index) => <RecordTableRow key={index} movie={movie} />)}

          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 30, 40, 50]}
                colSpan={1}
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

        </TableContainer>
      </Paper>
    </div>

  );
};