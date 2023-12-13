import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./InventorySummery.scss";
import { useEffect, useState } from "react";
import axios from 'axios';
import { inventorySummeryInfo } from "../../data";

const columns = [
  { field: 'id', headerName: 'ID', width:50},
  {
    field: 'product',
    headerName: 'Product',
    flex:1,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    flex:1,
  },
  {
    field: 'sellCost',
    headerName: 'Sell Cost',
    type: 'number',
    flex:1,
  },
  {
    field: 'purchaseCost',
    headerName: 'Purchase Cost',
    type: 'number',
    flex:1,
  },
  {
    field: 'wholesaleCost',
    headerName: 'Wholesale Cost',
    type: 'number',
    flex:1,
  },
  {
    field: 'totalstockvalue',
    headerName: 'Stock Value',
    type: 'number',
    flex:1,
  },
  {
    field: 'partyName',
    headerName: 'Party Name',
    flex:1,
  },
  {
    field: 'purchaseDate',
    headerName: 'Purchase Date',
    flex:1,
  }
];

const InventorySummery = () => {

  const [rows, setRows] = useState([]); // Initialize rows state with an empty array

  useEffect(() => {
    // Define a function to fetch data from your REST API using Axios
    const fetchData = async () => {
      try {
        //const response = await axios.get("http://localhost:8080/getInventerySummeryInfo");
        const response = await axios.get(inventorySummeryInfo);
        if (response.status === 200) {
          const data = response.data;
          const rowsWithIds = data.map((row: any, index: number) => ({ id: index + 1, ...row }));
          setRows(rowsWithIds); // Update the rows state with the retrieved data
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
    <div className="inventorySummery">
      <DataGrid className="inventorySummeryDataGrid"
        rows={rows}
        columns={columns}
        getRowId={(row: { id: any; }) => row.id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{toolbar:GridToolbar}}
                slotProps={{
                    toolbar:{
                        showQuickFilter:true,
                        quickFilterProps:{debounceMs:500},
                    }
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        checkboxSelection
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
      />
    </div>
  )
}

export default InventorySummery;
