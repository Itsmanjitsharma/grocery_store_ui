import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './customer.scss';
import { Link} from 'react-router-dom';
import DataTable from '../../components/DataTable/DataTable';
import Add_Customer from '../../components/Add/Add_Customer';
import { GridColDef } from '@mui/x-data-grid';
import { getAllCustomerServiceUrl } from '../../data';

interface Customer {
  customerId?: number;
  name: string;
  mobileNumber: string;
  email?: string;
  type: string; // Include 'type' in the Customer interface
}

const CustomerForm: React.FC = () => {
  const [rows, setRows] = useState<Customer[]>([]); // Ensure the state is of type Customer[]
  const [open, setOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'customerId', headerName: 'Customer Id', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 , renderCell:(params) => (
      <Link to={`/CustomerInfo/${params.row.name}`}>
        {params.row.name}
      </Link>
    ),},
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'mobile', headerName: 'Mobile', flex: 1 },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      renderCell: (params) => {
        const type = params.value?.toString();
        const nameOfCustomer = params.row.name; // Retrieve the customer name from params
        console.log(nameOfCustomer);
        if (type === 'Retail' && nameOfCustomer) {
          return (
            <Link to={{ pathname: `/BillingRetail/${nameOfCustomer}`}}>
              {type}
            </Link>
          );
        } else if (type === 'Wholesale' && nameOfCustomer) {
          return (
            <Link to={{ pathname: `/Billingwholesale/${nameOfCustomer}` }}>
              {type}
            </Link>
          );
        }
        return null; // Handle other cases or return default content
      },
    }
  ];

  useEffect(() => {
    axios.get(getAllCustomerServiceUrl)
      .then((response) => {
        const customersWithIds: Customer[] = response.data.map((customer: Customer, index: number) => ({
          ...customer,
          id: index + 1,
        }));
        setRows(customersWithIds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="customer">
      <div className="customer_info">
        <h2>Customer</h2>
        <button onClick={() => setOpen(true)}>Add New Customer</button>
      </div>
      <DataTable columns={columns} rows={rows} getRowId={function (_row: { id: any; }) {
        throw new Error('Function not implemented.');
      } }/>
      {open && <Add_Customer slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default CustomerForm;
