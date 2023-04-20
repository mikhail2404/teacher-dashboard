import React, { Component } from 'react';
import { Button, Dialog, Flex, Stack, TextInput, Title } from '@mantine/core';

class CreateNewAccountModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            values: props.columns.reduce((acc, column) => {
                acc[column.accessorKey ?? ''] = '';
                return acc;
            }, {}),
            errors: {}, // State to track errors for each field
        };
    }

    handleSubmit = () => {
        const { values, errors } = this.state;
        // Perform field validation before submitting
        const formIsValid = this.validateForm();
        if (formIsValid) {
            this.props.onSubmit(values);
            this.props.onClose();
        }
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            values: { ...prevState.values, [name]: value },
        }));
    };

    // Field validation function
    validateForm = () => {
        const { columns } = this.props;
        const { values } = this.state;
        const errors = {};
        columns.forEach((column) => {
            if ( !values[column.accessorKey]) {
                errors[column.accessorKey] = `${column.header} is required`;
            }
        });
        this.setState({ errors });
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };




    render() {
        const { open, columns, onClose } = this.props;
        const { values, errors } = this.state;

        return (
            <Dialog position={{ top: '50%', left: '50%' }} className="my-dialog" opened={open}>
                <Title ta="center">Add New Student</Title>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack sx={{ width: '100%', gap: '24px' }}>
                        {columns.map((column) => (
                            <TextInput
                                key={column.accessorKey}
                                label={column.header}
                                name={column.accessorKey}
                                onChange={this.handleChange}
                                value={values[column.accessorKey ?? '']}
                                error={errors[column.accessorKey]} // Pass error message as prop
                            />
                        ))}
                    </Stack>
                </form>
                <Flex
                    sx={{
                        padding: '20px',
                        width: '100%',
                        justifyContent: 'flex-end',
                        gap: '16px',
                    }}
                >
                    <Button onClick={onClose} variant="subtle">
                        Cancel
                    </Button>
                    <Button color="teal" onClick={this.handleSubmit} variant="filled">
                        Add New Student
                    </Button>
                </Flex>
            </Dialog>
        );
    }
}

export default CreateNewAccountModal;
