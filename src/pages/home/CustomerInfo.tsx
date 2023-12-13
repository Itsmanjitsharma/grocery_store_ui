import { useEffect, useState } from 'react';
import './CustomerInfo.scss';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { customerInfoServiceUrl } from '../../data';
const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
        field: 'product',
        headerName: 'Product',
        flex: 1,
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        flex: 1,
    },
    {
        field: 'sell_cost',
        headerName: 'Price',
        type: 'number',
        flex: 1,
    },
    {
        field: 'total_cost',
        headerName: 'Total Bill',
        type: 'number',
        flex: 1,
    },
    {
        field: 'payment_status',
        headerName: 'Payment Status',
        flex: 1,
    },
    {
        field: 'payment_method',
        headerName: 'Payment Method',
        flex: 1,
    },
    {
        field: 'bill_date',
        headerName: 'Billing Date',
        flex: 1,
    },
];
const CustomerInfo = () => {
    const [rows, setRows] = useState([]); // Initialize rows state with an empty array
    const { customer_name } = useParams();
    useEffect(() => {
        //axios.get(`http://localhost:8080/CustomerInfo/${customer_name}`).then(
        axios.get(`${customerInfoServiceUrl}${customer_name}`).then(
            (response) => {
                let i =1;
                const infodata = response.data.map((row: any) => ({
                    ...row,
                    id: i++,
                  }));
                  setRows(infodata);
            }
        ).catch()
    }, [])
    return (
        <div className='CustomerInfo'>
            <DataGrid className="CustomerInfoDataGrid"
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 }
                    }
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
            />
        </div>
    );
}
export default CustomerInfo;