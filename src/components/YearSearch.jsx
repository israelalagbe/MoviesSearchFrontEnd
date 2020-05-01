import React from 'react';
import { makeStyles } from '@material-ui/core/styles';



const years = [];
for (let year = 1900; year <= 2018; year++) {
    years.push(year);
}

const useStyles = makeStyles((theme) => ({
  center: {
      textAlign: 'center'
  },
  formControl: {
    margin: 'auto',
    width: '300px',
    padding:'50px',
    height: '40px',
    background: 'white',
    outline:'none',
    boxShadow: '0px 1px 3px silver',
    border: 'none'
  },
}));


export default function YearSearch({year, setYear}) {
  const classes = useStyles();
  
  return (
    <div className={classes.center}>
        <select onChange={(e)=> setYear(e.target.value)} value={year} name="" id="" className={classes.formControl}>
            <option value='' disabled>Filter By Year</option>
            {years.map((year)=> <option key={year}>{year}</option>)}
        </select>
    </div>
  );
}