import React, { Component } from 'react';
import MaterialReactTable from "material-react-table";
import './DataGrid.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";

import {
    Box,
    Button,
    ActionIcon,
    Tooltip,
} from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import CreateNewAccountModal from "../../components/CreateNewAccountModal/CreateNewAccountModal";


class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            createModalOpen: false
        };
        this.columns = [
            {
                accessorKey: "firstName",
                header: 'First Name',
            },
            {
                accessorKey: "lastName",
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
        this.theme = createTheme({
            palette: {
                mode: "dark"
            }
        });
        this.handleSaveRow = this.handleSaveRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.handleCreateNewRow = this.handleCreateNewRow.bind(this);
    }

    componentDidMount() {
        axios.get('/students')
            .then(response => {
                this.setState({ students: response.data });
            })
            .catch(error => console.log(error));
    }

    async handleSaveRow({ exitEditingMode, row, values }) {
        try {
            //send/receive api updates here
            // update the students array with the updated row data
            let updatedStudent;
            const updatedStudents = this.state.students.map((student) => {
                if (student._id === row.original._id) {
                    updatedStudent = { ...student, ...values }
                    return updatedStudent;
                } else {
                    return student;
                }
            });

            const response = await axios.put(`/students/${row.original._id}`, updatedStudent);
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.setState({ students: updatedStudents });
        } catch (error) {
            console.error(error);
        }
        exitEditingMode();
    }

    async deleteRow(id) {
        try {
            // Send/receive api updates here
            const response = await axios.delete(`/students/${id}`);
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.setState((prevState) => ({
                students: prevState.students.filter((student) => student._id !== id)
            }));
        } catch (error) {
            console.error(error);
        }
    }

    async handleCreateNewRow(values) {
        try {
            const response = await axios.post('/students', values);
            if (response.status !== 201) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.setState((prevState) => ({
                students: [...prevState.students, response.data]
            }));
        } catch (error) {
            console.error(error);
        }
    }

    render() {

        return (
            <div className="table-container">
                <ThemeProvider theme={this.theme}>
                    <MaterialReactTable
                        columns={this.columns}
                        data={this.state.students}
                        enableEditing={true}
                        onEditingRowSave={this.handleSaveRow}
                        renderRowActions={({ row, table }) => (
                            <Box sx={{ display: 'flex', gap: '16px' }}>
                                <Tooltip withArrow position="left" label="Edit">
                                    <ActionIcon onClick={() => table.setEditingRow(row)}>
                                        <IconEdit />
                                    </ActionIcon>
                                </Tooltip>
                                <Tooltip withArrow position="right" label="Delete">
                                    <ActionIcon color="red" onClick={() => this.deleteRow(row.original._id)}>
                                        <IconTrash />
                                    </ActionIcon>
                                </Tooltip>
                            </Box>
                        )}
                        renderTopToolbarCustomActions={() => (
                            <Button
                                color="teal"
                                onClick={() => this.setState({ createModalOpen: true })}
                                variant="filled"
                            >
                                Add New Student
                            </Button>
                        )}
                    />

                    <CreateNewAccountModal
                        columns={this.columns}
                        open={this.state.createModalOpen}
                        onClose={() => this.setState({ createModalOpen: false })}
                        onSubmit={this.handleCreateNewRow}
                    />
                </ThemeProvider>
            </div>
        );
    }
}

export default DataGrid;