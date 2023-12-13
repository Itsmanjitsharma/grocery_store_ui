import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Select from 'react-select'; // Import react-select
import './BillingWholesale.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { billingServiceUrl, getProductsServiceUrl } from '../../data';

interface ProductWithIdLabel {
  id: string;
  label: string;
}
interface Product {
  value: string;
  label: string;
  sellCost: string;
  wholesaleCost: string;
  quantityInStock: string;
}

interface StateObject {
  product: Product | ProductWithIdLabel;
  quantity: string;
  wholesaleCost: string | number;
  totalCost: string;
}


const BillingWholesale : React.FC = () => {
  
  const nameOfCustomer = useParams<{ customerName ?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [billingDate] = useState<Date>(new Date());
  const [billingType] = useState<string>('Wholesale');
  const [quantityInStock] = useState<string>('');
  useEffect(() => {
    if (nameOfCustomer && nameOfCustomer.customerName) {
      setCustomerName(nameOfCustomer.customerName);
      // You can perform any other actions with 'nameOfCustomer' here
    }
  }, [nameOfCustomer]);

  const [inputData, setInputData] = useState<StateObject>({
    product: { id: '', label: 'Select Product' }, // Initialize with an empty object
    quantity: '',
    wholesaleCost: '',
    totalCost: '',
  });
  const [rows, setRows] = useState<{ id: number; product: any; quantity: string; wholesaleCost: string | number; totalCost: string; quantityInStock: number; }[]>([]);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'product',
      headerName: 'Product',
      width: 200,
      editable: false,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 80,
      type: 'number',
      editable: false,
    },
    {
      field: 'wholesaleCost',
      headerName: 'Wholesale Cost',
      type: 'number',
      width: 200,
      editable: false,
    },
    {
      field: 'totalCost',
      headerName: 'Total Cost',
      width: 180,
      type: 'number',
      editable: false,
    },
  ];

  useEffect(() => {
    axios.get(getProductsServiceUrl)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.map((product: { product: any; sellCost: any; wholesaleCost: any; quantityInStock: any; }) => ({
            value: product.product, // Set the product name as the value
            label: product.product, // Set the product name as the label
            sellCost: product.sellCost,
            wholesaleCost: product.wholesaleCost,
            quantityInStock: product.quantityInStock, // New attribute
          }));
          setProducts(data);
        } else {
          console.error('Failed to fetch data from the API.');
        }
      })
      .catch((error) => {
        console.error('An error occurred while fetching data:', error);
      });
  }, []); 

  const handleInputChange = (column: string, value: string) => {
    if (column === 'product') {
      const selectedProduct = products.find((product) => product.value === value);
      const wholesaleCost = selectedProduct ? selectedProduct.wholesaleCost : 0;
  
      setInputData((prevData) => ({
        ...prevData,
        product: selectedProduct || { id: '', label: 'Select Product' },
        wholesaleCost: wholesaleCost,
      }));
    } else if (column === 'quantity') {
      const quantity = parseFloat(value);
      const wholesaleCost = typeof inputData.wholesaleCost === 'string'
      ? parseFloat(inputData.wholesaleCost)
      : inputData.wholesaleCost;
      if (!isNaN(quantity) && !isNaN(wholesaleCost)) {
        const totalCost = (quantity * wholesaleCost).toFixed(2); // Calculate totalCost with 2 decimal places
        setInputData((prevData) => ({
          ...prevData,
          [column]: value,
          totalCost: totalCost,
        }));
      } else {
        setInputData((prevData) => ({
          ...prevData,
          [column]: value,
          totalCost: '',
        }));
      }
    } else {
      setInputData((prevData) => ({
        ...prevData,
        [column]: value,
      }));
    }
  };
  const handlePaymentMethodChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaymentStatusChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPaymentStatus(e.target.value);
  };

  const handleCustomerNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCustomerName(e.target.value);
  };

  const calculateTotalBill = () => {
    // Calculate the sum of 'totalCost' from all rows
    return rows.reduce((total, row) => total + parseFloat(row.totalCost || '0'), 0).toFixed(2);
  };

  const handleSubmit = () => {
    if (paymentMethod && paymentStatus) {
      const totalBill = calculateTotalBill();
      const dataToSend = {
        rows: rows,
        totalBill: totalBill,
        paymentMethod: paymentMethod,
        paymentStatus: paymentStatus,
        customerName: customerName,
        billingType: billingType,
        billingDate: billingDate,
        quantityInStock : quantityInStock,
      };

      // Send data to the REST API using Axios
      axios
        .post(billingServiceUrl, dataToSend)
        .then((response) => {
          console.log('Data sent successfully:', response.data);
          setRows([]);
          setPaymentMethod('');
          setPaymentStatus('');
          setCustomerName(nameOfCustomer.customerName);

        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    } else {
      alert("Please fill in Payment Method and Payment Status before submitting.");
    }
  };
  const handleSave = () => {
    if (inputData.product && inputData.quantity && inputData.wholesaleCost && inputData.totalCost) {
      const selectedProduct = products.find((p) => p.label === inputData.product.label);
      const productLabel = selectedProduct ? selectedProduct.label : '';
      const newQuantity = parseFloat(inputData.quantity);
      const quantityInStock = parseInt(selectedProduct.quantityInStock, 10);

      if (newQuantity == 0) {
        alert('Can not add 0 quantity for the product.');
      } else if (selectedProduct && newQuantity > quantityInStock) {
        alert('Not enough quantity in stock for this product.'+quantityInStock);
      } else {
        const updatedQuantityInStock = quantityInStock - newQuantity;

        const newRow = {
          id: rows.length + 1,
          product: productLabel,
          quantity: inputData.quantity,
          wholesaleCost: inputData.wholesaleCost,
          totalCost: inputData.totalCost,
          quantityInStock: updatedQuantityInStock,
        };
        if (selectedProduct && newRow.quantity > selectedProduct.quantityInStock) {
          alert('Not enough quantity in stock for this product. '+quantityInStock);
        } else {
          setRows([...rows, newRow]);
          setInputData({
            product: { id: '', label: 'Select Product' }, // Reset product to the default state
            quantity: '',
            wholesaleCost: '',
            totalCost: '',
          });
        }
      }
    } else {
      alert('Please fill in all fields before saving.');
    }
  };

  return (
    <div className="billingWholesale">
      <div className="content">
        <div className="inputHeadersbox">
          {columns
            .filter((item) => item.field !== 'id' && item.field !== 'img' && item.field !== 'actions')
            .map((column) => (
              <div className="item" key={column.field}>
                {column.field === 'product' ? (
                  <Select
                  className="react-select-container"
                  name={column.field}
                  value={inputData.product} // Display the selected product
                  onChange={(selectedOption) => {
                    if ('value' in selectedOption) {
                      handleInputChange(column.field, selectedOption.value);
                    } else {
                      handleInputChange(column.field, selectedOption.id);
                    }
                  }}
                  options={products}
                  isSearchable={true}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: '#2a3447 !important', // Use !important to force the style
                      borderColor: '#f2f3f5 !important', // Use !important to force the style
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: 'white !important', // Use !important to force the style
                    }),
                    option: (provided) => ({
                      ...provided,
                      color: 'black !important', // Use !important to force the style
                    }),
    input: (provided) => ({
      ...provided,
      color: 'white !important', // Set text color to white in the search box
    }),
                  }}
                />
                ) : column.field === 'sellCost' || column.field === 'totalCost' ? (
                  <input
                    //type={column.type === 'number' ? 'number' : 'text'}
                    type='text'
                    name={column.field}
                    placeholder={column.field}
                    value={inputData[column.field]}
                    onChange={(e) => handleInputChange(column.field, e.target.value)}
                    disabled={true} // Add the disabled attribute
                  />
                ) : (
                  <input
                    type='text'
                    name={column.field}
                    placeholder={column.field}
                    value={inputData[column.field]}
                    onChange={(e) => handleInputChange(column.field, e.target.value)}
                  />
                )}
              </div>
            ))}
          <button className="button" onClick={handleSave}>
            Save
          </button>
        </div>
        <div className="middleBox">
          <DataGrid
            className="dataGrid"
            rows={rows}
            columns={columns}
          />
        </div>
      </div>
      <div className="bottomBar">
        <div>Total Bill: {calculateTotalBill()}</div>
        <div className='inputboxandbutton'>
          <input
            placeholder='Payment Status'
            value={paymentStatus}
            onChange={handlePaymentStatusChange}
          />
        </div>
        <div className='inputboxandbutton'>
          <input
            placeholder='Payment Method'
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          />
        </div>
        <div className='inputboxandbutton'>
          <input
            placeholder='Customer Name'
            value={customerName || (nameOfCustomer.customerName ? nameOfCustomer.customerName : '')}
            onChange={handleCustomerNameChange}
          />
        </div>
        <div className='inputboxandbutton'>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default BillingWholesale;
