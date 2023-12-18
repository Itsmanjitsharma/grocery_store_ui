import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import './Admin.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { addAdminUserUrl, deleteAdminUserUrl, getAdminUsersUrl, updateAdminUserUrl } from '../../data'; // Adjust the path according to the file location
import DataTable from '../DataTable/DataTable';
let uniqueIdCounter = 0; // Initialize a counter variable outside the component

type Props = {
    slug: string,
    columns: GridColDef[],
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}
type FormData = {
    [key: string]: string | number | undefined; // Define the structure you expect in formData
};

type Errors = {
    [key: string]: string | undefined; // Define the structure you expect in errors
};

const Add_Users = (props: Props) => {
    const [formData, setFormData] = useState<FormData>({});
    const [errors, setErrors] = useState<Errors>({});
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    const handleSave = () => {
            axios
                .post(addAdminUserUrl, formData)
                .then((response) => {
                    console.log('Data saved successfully', response.data);
                    setFormData({});
                    setErrors({});

                })
                .catch((error) => {
                    console.error(error);
                });
        
    };
    return (
        <div className='add'>
            <div className='model'>
                <span className='close' onClick={() => props.setOpen(false)}>X</span>
                <h2>Add new {props.slug}</h2>
                <form onSubmit={handleSubmit}>
                    {props.columns
            .filter(item => item.field !== 'id' && item.field !== 'img' && item.field !== 'actions')
            .map(column => (
                            <div className='item' key={column.field}>
                                <label>{column.headerName}</label>
                                <input
                                    type={column.type === 'number' ? 'number' : 'text'}
                                    name={column.field}
                                    placeholder={column.field}
                                    value={formData[column.field] || ''}
                                    onChange={handleInputChange}
                                />
                                {errors[column.field] && <div className='error'>{errors[column.field]}</div>}
                            </div>
                        ))}
                    <button className='button' onClick={handleSave}>Save</button>
                </form>
            </div>
        </div>
    );
};


const Admin = () => {
    const columns: GridColDef[] = [
        {
            field: 'id', headerName: 'ID',
            //width: 90 
            flex: 1,
        },
        {
            field: 'username',
            headerName: 'User Name',
            //width: 100,
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'email',
            //width: 80,
            flex: 1,
            editable: true,

        },
        {
            field: 'businessname',
            headerName: 'Business Name',
            //width: 150,
            flex: 1,
        },
        {
            field: 'password',
            headerName: 'password',
            flex: 1,
            editable: true,
        },
        {
            field: 'role',
            headerName: 'role',
            flex: 1,
            editable: true,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => { // Use params to access the row data
                const { id} = params.row; // Extract the id and product name
                return (
                    <div className="action" style={{ display: "flex", gap: "3px" }}>
                        <div className="view">
                            <img
                                src="https://www.svgrepo.com/show/21045/delete-button.svg"
                                alt=""
                                style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                onClick={() => handleDeleteRow(id)} // Pass id and product
                            />
                        </div>
                        <div className="delete">
                            <img
                                src="https://www.svgrepo.com/show/522527/edit-3.svg"
                                alt=""
                                style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                onClick={() => handleEditRow(params)}
                            />
                        </div>
                    </div>
                );
            },
        },
    ];

    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);

    const handleDeleteRow = (id: any) => {
        const rowToDelete = rows.find((row) => row.id === id);
        if (rowToDelete) {
            const { username, businessname } = rowToDelete;
            axios
                .delete(`${deleteAdminUserUrl}?username=${username}&businessname=${businessname}`)
                .then((response) => {
                    if (response.status === 200) {
                        fetchUpdatedData();
                    } else {
                        console.error("Failed to delete the row.");
                    }
                })
                .catch((error) => {
                    console.error("An error occurred while deleting the row:", error);
                });
        } else {
            console.error("Row not found for deletion.");
        }
    };
    
    
    const handleEditRow = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
        const { id, row } = params;
        const updatedRowData = {
            id: id, // You can use the id directly
            username: row.username || '', // Use an empty string if product is undefined or null
            email: row.email || 0, // Use 0 if quantity is undefined or null
            businessname: row.businessname || 0.0, // Use 0.0 if purchaseCost is undefined or null
            password: row.password || 0.0, // Use 0.0 if sellCost is undefined or null
            role : row.role
        };

        axios
            .put(updateAdminUserUrl, updatedRowData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    fetchUpdatedData();
                } else {
                    console.error("Failed to update the row.");
                }
            })
            .catch((error) => {
                console.error("An error occurred while updating the row:", error);
            });
    };

    const fetchUpdatedData = () => {
        axios
            .get(getAdminUsersUrl)
            .then((response) => {
                if (response.status === 200) {
                    const data = response.data;
                    const rowsWithUniqueIds = data.map((row: any) => ({
                        id: generateUniqueId(),
                        ...row,
                    }));
                    setRows(rowsWithUniqueIds);
                } else {
                    console.error("Failed to fetch updated data from the API.");
                }
            })
            .catch((error) => {
                console.error("An error occurred while fetching updated data:", error);
            });
    };
    useEffect(() => {
        fetchUpdatedData();
    }, []);
    return (
        <div className="users">
            <div className="info">
                <h2>Inventory</h2>
                <button onClick={() => setOpen(true)}>Add New User</button>
            </div>
            <DataTable columns={columns}
                rows={rows}
                onRowDelete={handleDeleteRow}
                onRowEdit={handleEditRow} // Pass the edit handler
                getRowId={function (_row: { id: any; }) {
                    throw new Error('Function not implemented.');
                }} />
            {
                open && (<Add_Users slug="user" columns={columns} setOpen={setOpen} />)
            }
        </div>
    )
}
export default Admin;

const generateUniqueId = () => {
    uniqueIdCounter += 1;
    return uniqueIdCounter.toString();
};
