import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable/DataTable';
import './Inventory.scss';
import { useEffect, useState } from 'react';
import Add from '../../components/Add/Add';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library
import { Link } from 'react-router-dom';
import { deleteRowServiceUrl, inventoryInfoServiceUrl, updateRowServiceUrl } from '../../data';


const Inventory = () =>{
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', 
    //width: 90 
    flex:1,},
    {
      field: 'product',
      headerName: 'Product',
      //width: 100,
      flex:1,
      renderCell: (params) => (
        <Link to={`/product/${params.row.product}`}>
          {params.row.product}
        </Link>
      ),
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        //width: 80,
        flex:1,
        type: 'number',
        editable:true,

    },
    {
      field: 'purchaseCost',
      headerName: 'Purchage Cost',
      //width: 150,
      flex:1,
      type: 'number',
      editable:true,

    },
    {
      field: 'sellCost',
      headerName: 'Sell Cost',
      type: 'number',
      //width: 110,
      flex:1,
      editable:true,
    },
    {
      field: 'wholesaleCost',
      headerName: 'Wholesale Cost',
      type: 'number',
      //width: 110,
      flex:1,
      editable:true,
    },{
      field: 'partyName',
      headerName: 'Party Name',
      flex:1,
      editable:true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => { // Use params to access the row data
        const { id, product } = params.row; // Extract the id and product name
        return (
          <div className="action" style={{ display: "flex", gap: "3px" }}>
            <div className="view">
              <img
                src="https://www.svgrepo.com/show/21045/delete-button.svg"
                alt=""
                style={{ width: "20px", height: "20px" , cursor:"pointer"}}
                onClick={() => handleDeleteRow(id, product)} // Pass id and product
              />
            </div>
            <div className="delete">
              <img
                src="https://www.svgrepo.com/show/522527/edit-3.svg"
                alt=""
                style={{ width: "20px", height: "20px" , cursor:"pointer"}}
                //onClick={() => handleEditRow(id, product)} // Pass id and product
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

  const handleDeleteRow = (_id: any, productName: any) => {
    axios
      //.delete(`http://localhost:8080/deleteRow/${productName}`, {
        .delete(`${deleteRowServiceUrl}${productName}`, {
       // data: { productName }, // Pass the product name in the request body
      })
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
  };
  const handleEditRow = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    const { id, row } = params;
    const updatedRowData = {
      id: id, // You can use the id directly
      product: row.product || '', // Use an empty string if product is undefined or null
      quantity: row.quantity || 0, // Use 0 if quantity is undefined or null
      purchaseCost: row.purchaseCost || 0.0, // Use 0.0 if purchaseCost is undefined or null
      sellCost: row.sellCost || 0.0, // Use 0.0 if sellCost is undefined or null
      wholesaleCost: row.wholesaleCost || 0.0, // Use 0.0 if wholesaleCost is undefined or null
    };

    axios
      //.put("http://localhost:8080/updateRow", updatedRowData,{headers: {
      .put(updateRowServiceUrl, updatedRowData,{headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // The row was successfully updated. You can fetch the updated data if needed.
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
      //.get("http://localhost:8080/getInventeryInfo")
      .get(inventoryInfoServiceUrl)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          const rowsWithUniqueIds = data.map((row: any) => ({
            id: uuidv4(),
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
  return(
      <div className="users">
        <div className="info">
          <h2>Inventory</h2>
          <button onClick={()=>setOpen(true)}>Add New Product</button>
        </div>
        <DataTable columns={columns}
      rows={rows}
      onRowDelete={handleDeleteRow}
      onRowEdit={handleEditRow} // Pass the edit handler
      getRowId={function (_row: { id: any; }) {
        throw new Error('Function not implemented.');
      } }        />
       {
        open && (<Add slug="user" columns={columns} setOpen={setOpen}/>)
       }  
      </div>
    )
}
export default Inventory;