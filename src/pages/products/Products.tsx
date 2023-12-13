import { useEffect, useState } from 'react';
import {GridColDef } from '@mui/x-data-grid';
import './Products.scss';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis,Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useParams } from 'react-router-dom';
import DataTable from '../../components/DataTable/DataTable';
import { productServiceUrl } from '../../data';



const BillingRetail = () => {


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID',flex:1,},
    {
      field: 'product',
      headerName: 'Product',
      flex:1,
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
      field: 'purchasDate',
      headerName: 'Purchase Date',
      flex:1,
      editable:true,
    }
  ];

  const [quantityDataset,setQuantityDataset] = useState([]);
  const [priceDataset,setPriceDataset] = useState([]);
  const [productDataset, setProductDataset] = useState([]);
  const { productId } = useParams();
  useEffect(()=>{
     //axios.get(`http://localhost:8080/product/${productId}`).then(
    axios.get(`${productServiceUrl}${productId}`).then(
      (response) => {
        setQuantityDataset(response.data.quantityData);
        setPriceDataset(response.data.priceData);
        let i =1;
        const productDataset = response.data.products.map((row: any) => ({
          ...row,
          id: i++,
        }));
        setProductDataset(productDataset);
       }
     ).catch()
  }, []);
  return (
    <div className="products">
      <div className='box box1'>
        <h3>Quantity</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={quantityDataset}>
            <XAxis dataKey="xAxix" />
            <YAxis />
            <Tooltip 
            cursor={{ fill: "none" }}
            contentStyle={{ background: "#2a3447", borderRadius: "10px" }}
            />
            <Legend />
            <Bar dataKey="yAxix" fill="#8884d8" barSize={40}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className='box box2'>
       <h3>Price</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={priceDataset}>
            <XAxis dataKey="xAxix" />
            <YAxis />
            <Tooltip 
            cursor={{ fill: "none" }}
            contentStyle={{ background: "#2a3447", borderRadius: "10px" }}
            />
            <Legend />
            <Bar dataKey="yAxix" fill="#82ca9d" barSize={40}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className='box box3'>
      <DataTable columns={columns}
         rows={productDataset}
         getRowId={(row: { id: any; }) => row.id}
         />
      </div>
    </div>
  );
};

export default BillingRetail;
