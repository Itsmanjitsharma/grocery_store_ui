import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import './BillingHistory.scss'
import { useEffect, useState } from "react";
import axios from "axios";
import { billingInfoServiceUrl } from "../../data";
const columns = [
  { field: 'id', headerName: 'ID', flex: 1 },
  {
    field: 'customerName',
    headerName: 'Customer Name',
    flex: 1,
  },
  {
    field: 'paymentMethod',
    headerName: 'Payment Method',
    flex: 1,
  },
  {
    field: 'paymentStatus',
    headerName: 'Payment Status',
    type: 'number',
    flex: 1,
  },
  {
    field: 'totalBill',
    headerName: 'Total Bill',
    type: 'number',
    flex: 1,
  },
  {
    field: 'billingType',
    headerName: 'Billing Type',
    flex: 1,
  },
  {
    field: 'billing_date',
    headerName: 'Billing Date',
    flex: 1,
  },
];

const BillingHistory = () => {
  const [rows, setRows] = useState([]); // Initialize rows state with an empty array
  useEffect(() => {
    const formattedStartDate = new Date("01-01-2023").toISOString(); // Convert to string or format as needed
    const formattedEndDate = new Date().toISOString(); // Convert to string or format as needed
    const apiUrl = `${billingInfoServiceUrl}?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          const data = response.data;
          //const rowsWithIds = data.map((row: any, index: number) => ({ id: index + 1, ...row }));
          setRows(data); // Update the rows state with the retrieved data
        } else {
          console.error("Failed to fetch data from the API.");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };
    fetchData(); // Call the fetchData function when the component is mounted
  }, []);
  return (
    <div className="billingHistory">
      <DataGrid className="billingHistoryDataGrid"
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
  )
}
export default BillingHistory;