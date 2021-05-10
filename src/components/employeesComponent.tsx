import * as React from "react";
import { EmployeeModel } from "../services/employee.model";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }
// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const EmployeesComponent = () => {
    const [employees, setEmployees] = React.useState(
        undefined
    );

    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [total, setTotal] = React.useState(11);
    const [limit, setLimit] = React.useState(5);

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    const fetchEmployees = async (page: number) => {
        setLoading(loading => loading = true)
        const apiUrl = `https://6093bbe7a7e53a0017951709.mockapi.io/Employees?page=${page}&limit=5&sortBy=Name`;
        fetch(apiUrl).then(async (res) => {
            if (res.ok) {
                setEmployees(await res.json());
            }
        }).then(rs =>{
            setLoading(loading => loading = false)
        });
    };
    React.useEffect(() => {
        // Update the document title using the browser API
        if (!employees) {
            fetchEmployees(1);
        }
    }, [fetchEmployees]);

    const handleChange = (event, value) => {
        setLoading(loading => loading = true)
        setPage(page => page = value)
        fetchEmployees(value).then(rs => {
            setLoading(loading => loading = false)
        })
    }
    return (
        <>
            <TableContainer component={Paper}>

                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Position</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            loading ? 
                            <LinearProgress /> :
                            employees?.items?.map((employee: EmployeeModel) => (
                                <TableRow key={employee.Id}>
                                    <TableCell component="th" scope="row">
                                        {employee.Name}
                                    </TableCell>
                                    <TableCell align="right">{employee.Email}</TableCell>
                                    <TableCell align="right">{employee.Position}</TableCell>
                                </TableRow>
                            ))
                        }
                       
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={total}
                page={page}
                onChange={handleChange}
            />
            {/* {pageNumbers.map((number) => (
            <li className="page-item" key={number}>
              <a
                onClick={() => {
                  setPage(number);
                  props.loadPage(number);
                }}
                href="!#"
                className="page-link"
              >
                <span className="{page == number ? 'red' : ''}">{number}</span>
              </a>
            </li>
          ))} */}
            {/* <PaginationComponent
                itemsPerPage={5}
                totalItems={57}
                loadPage={fetchEmployees}
            ></PaginationComponent> */}
        </>
    );
};

export default EmployeesComponent;

function useStyles() {
    throw new Error("Function not implemented.");
}
