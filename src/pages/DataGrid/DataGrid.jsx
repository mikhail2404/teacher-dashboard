import React, {useEffect, useState} from 'react';
import MaterialReactTable from "material-react-table";
import './DataGrid.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";

const DataGrid = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('/students')
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => console.log(error));
    }, []);
    const columns = [
        {
            accessorKey: "name.firstName",
            header: 'First Name',
        },
        {
            accessorKey: "name.lastName",
            header: 'Last Name',
        },
        {
            accessorKey: "group",
            header: "Group",
        },
        {
            accessorKey: "subject",
            header: "Subject",
        },
        {
            accessorKey: "points",
            header: "Points",
        },
    ];

    const theme = createTheme({
        palette: {
            mode: "dark"
        }
    });

    return (
        <div className="table-container">
            <ThemeProvider theme={theme}>
                <MaterialReactTable columns={columns} data={students} />
            </ThemeProvider>
        </div>
    );
}

export default DataGrid;