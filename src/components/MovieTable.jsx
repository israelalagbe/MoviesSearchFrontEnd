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
import Chat from '@material-ui/icons/Chat';
import { fetchMovies } from '../store/actions/movie';
import TablePaginationActions from './TablePagination';
import Grid from '@material-ui/core/Grid';
import SearchForm from './SearchForm';
import { makeStyles, Button } from '@material-ui/core';
import YearSearch from './YearSearch';
import useModal from '../util/useModal';
import CommentModal from './CommentModal';


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
  form: {
    zIndex: 1000
  }
}));



export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const commentModal = useModal();

  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [year, setYear] = React.useState('');
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

    dispatch(fetchMovies({ page: page + 1, limit, search, year }));

  }, [dispatch, limit, page, search, year]);


  return (
    <div className={classes.root}>
      <CommentModal isOpen={commentModal.isOpen} handleClose={commentModal.close} />
      <Paper className={`${classes.paper} tableContainer`}>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item md={4} xs={11} className={classes.form}>
            <SearchForm searchText={search} setSearchText={setSearchText} />

          </Grid>
          <Grid item md={12} className={classes.form}>
            <YearSearch year={year} setYear={setYear} />
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
                <TableCell className="table-header">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie, index) => <RecordTableRow onCommentClicked={commentModal.open} key={index} movie={movie} />)}

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

        </TableContainer>
      </Paper>
    </div>

  );
};

const RecordTableRow = ({ movie, onCommentClicked }) => (
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
        <Chip key={index} color='primary' label={genre} />
      )
    }</TableCell>
    <TableCell>
      <Button
        onClick={() => onCommentClicked(movie)}
        variant="contained"
        color="default"
        startIcon={<Chat />}
      >
        Comments
      </Button>
    </TableCell>
  </TableRow>
);