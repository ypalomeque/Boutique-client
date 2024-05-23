import { useMemo, useState } from 'react';
import {
    MaterialReactTable,
    createRow,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Button,
    Grid,
    IconButton,
    Tooltip,
    darken,
    lighten,
} from '@mui/material';

import { fakeData, usStates } from '../../../../fake-db/db/makeData';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableComponentProvider from 'app/components/Table/TableComponent';
import { colombianCities } from 'app/utils/utils';

const CategoryProduct = () => {
    const [creatingRowIndex, setCreatingRowIndex] = useState();
    const [validationErrors, setValidationErrors] = useState({});

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                enableEditing: false,
                size: 80,
                

            },
            {
                accessorKey: 'firstName',
                header: 'First Name',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.firstName,
                    helperText: validationErrors?.firstName,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            firstName: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.lastName,
                    helperText: validationErrors?.lastName,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            lastName: undefined,
                        }),
                },
            },

            {
                accessorKey: 'state',
                header: 'State',
                editVariant: 'select',
                editSelectOptions: colombianCities,
                muiEditTextFieldProps: {
                    select: true,
                    error: !!validationErrors?.state,
                    helperText: validationErrors?.state,
                },
            },
        ],
        [validationErrors],
    );
    const renderRowActions = ({ row, staticRowIndex, table }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton color="error" onClick={() => () => { }}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Add Subordinate">
                <IconButton
                    onClick={() => {
                        setCreatingRowIndex((staticRowIndex || 0) + 1);
                        table.setCreatingRow(
                            createRow(
                                table,
                                {
                                    id: null,
                                    firstName: '',
                                    lastName: '',
                                    city: '',
                                    state: '',
                                    managerId: row.id,
                                    subRows: [],
                                },
                                -1,
                                row.depth + 1,
                            ),
                        );
                    }}
                >
                    <PersonAddAltIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
    return (
        <Grid style={{ margin: "10px", marginTop: "23px" }}>
            <TableComponentProvider
                columns={columns}
                data={fakeData}
                enableRowSelection={true}
                renderRowActions={renderRowActions}
                enableEditing={true}
                positionCreatingRow={creatingRowIndex}
                enableExpanding={true}
                columnPinning={{ left: ["mrt-row-select", "mrt-row-actions"], right: [] }}
            />
        </Grid>

    )
}

export default CategoryProduct;
