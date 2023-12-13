import { SetStateAction, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {useParams} from 'react-router-dom';
import Select from 'react-select'; // Import react-select
import './BillingRetail.scss';
import axios from 'axios';
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
  sellCost: string | number;
  totalCost: string;
}


const BillingRetail : React.FC = () => {
  const nameOfCustomer = useParams<{ customerName: string }>();
  const [products, setProducts] = useState<{ value: string; label: string; sellCost: string; wholesaleCost: string; quantityInStock: string; }[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [billingDate] = useState(new Date());
  const [billingType] = useState('Retail');
  const [quantityInStock] = useState({});

  useEffect(() => {
    if (nameOfCustomer && nameOfCustomer.customerName) {
      console.log("Customer Name:", nameOfCustomer.customerName);
      setCustomerName(nameOfCustomer.customerName);
      // You can perform any other actions with 'nameOfCustomer' here
    }
  }, [nameOfCustomer]);

  const [inputData, setInputData] = useState<StateObject>({
    product: { id: '', label: 'Select Product' }, // Initialize with an empty object
    quantity: '',
    sellCost: '',
    totalCost: '',
  });
  const [rows, setRows] = useState<{ id: number; product: any; quantity: string; sellCost: string; totalCost: string; quantityInStock: number; }[]>([]);
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
      field: 'sellCost',
      headerName: 'Sell Cost',
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

  // Use useEffect to fetch product data
  useEffect(() => {
    //axios.get('http://localhost:8080/getProducts')
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
      // When the product is changed, update the sellCost based on the selected product
      const selectedProduct = products.find((product) => product.value === value);
      const sellCost = selectedProduct ? selectedProduct.sellCost : 0;

      setInputData((prevData) => ({
        ...prevData,
        product: selectedProduct, // Update with the selected product object
        sellCost: sellCost,
      }));
    } else if (column === 'quantity') {
      // When the quantity is changed, update the totalCost based on the new quantity
      const quantity = parseFloat(value); // Parse as float to retain decimal precision
      const sellCost = parseFloat(inputData.sellCost.toString());

      if (!isNaN(quantity) && !isNaN(sellCost)) {
        const totalCost = (quantity * sellCost).toFixed(2); // Calculate totalCost with 2 decimal places
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

  const handlePaymentMethodChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaymentStatusChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setPaymentStatus(e.target.value);
  };

  const handleCustomerNameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
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
        quantityInStock: quantityInStock,
      };

      // Send data to the REST API using Axios
      axios
        //.post('http://localhost:8080/billing', dataToSend)
        .post(billingServiceUrl, dataToSend)
        .then((response) => {
          // Handle the successful response here
          console.log('Data sent successfully:', response.data);

          // Reset rows, paymentMethod, and paymentStatus after sending
          setRows([]);
          setPaymentMethod('');
          setPaymentStatus('');
          //setCustomerName('');
          setCustomerName(nameOfCustomer?.customerName || '');
        })
        .catch((error) => {
          // Handle any errors here
          console.error('Error sending data:', error);
        });
    } else {
      alert("Please fill in Payment Method and Payment Status before submitting.");
    }
  };
  const handleSave = () => {
    if (inputData.product && inputData.quantity && inputData.sellCost && inputData.totalCost) {
      const selectedProduct = products.find((p) => p.label === inputData.product.label);
      const productLabel = selectedProduct ? selectedProduct.label : '';
      const newQuantity = parseFloat(inputData.quantity); // Parse as float to retain decimal precision
      const quantityInStock = selectedProduct ? parseFloat(selectedProduct.quantityInStock) : 0;

      if (newQuantity == 0) {
        alert('Can not add 0 quantity for the product.');
      } else if (selectedProduct && newQuantity > quantityInStock) {
        alert('Not enough quantity in stock for this product. '+quantityInStock);
      } else {
        const updatedQuantityInStock = quantityInStock - newQuantity;

        const newRow = {
          id: rows.length + 1,
          product: productLabel,
          quantity: inputData.quantity,
          sellCost: inputData.sellCost.toString(),
          totalCost: inputData.totalCost,
          quantityInStock: updatedQuantityInStock,
        };

        if (selectedProduct && newRow.quantity > selectedProduct.quantityInStock) {
          alert('Not enough quantity in stock for this product.'+quantityInStock);
        } else {
          setRows([...rows, newRow]);
          setInputData({
            product: { id: '', label: 'Select Product' }, // Reset product to the default state
            quantity: '',
            sellCost: '',
            totalCost: '',
          });
        }
      }
    } else {
      alert('Please fill in all fields before saving.');
    }
  };

  return (
    <div className="billingRetail">
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
                        // Handle the case when 'selectedOption' is of type 'Product'
                        handleInputChange(column.field, selectedOption.value);
                      } else {
                        // Handle the case when 'selectedOption' is of type 'ProductWithIdLabel'
                        handleInputChange(column.field, selectedOption.id);
                      }
                    }}                    options={products}
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
                    type="text"
                    name={column.field}
                    placeholder={column.field}
                    value={inputData[column.field]}
                    onChange={(e) => handleInputChange(column.field, e.target.value)}
                    disabled={true} // Add the disabled attribute
                  />
                ) : (
                  <input
                    //type={column.type === 'number' ? 'number' : 'text'}
                    type="text"
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
            value={customerName ? customerName : (typeof nameOfCustomer === 'string' ? nameOfCustomer : '')}
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

export default BillingRetail;
