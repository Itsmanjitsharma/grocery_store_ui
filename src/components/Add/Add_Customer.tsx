import { GridColDef } from '@mui/x-data-grid';
import './Add_Customer.scss';
import axios from 'axios';
import { useState } from 'react';
import { customerAddServiceUrl } from '../../data'; // Adjust the path according to the file location

type Props = {
  refreshData(): unknown;
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

const Add_Customer = (props: Props) => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<Errors>({});
  const validateMobileNumber = (value: string) => {
    // You can implement your custom mobile number validation logic here
    // For simplicity, this example checks if the value is a valid numeric string
    return /^\d{10}$/.test(value);
};
  const validateEmail = (value: string) => {
    // You can implement your custom email validation logic here
    // For simplicity, this example checks if the value has a basic email format
    return /\S+@\S+\.\S+/.test(value) && value.includes('@');
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
   setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleSave = () => {
    let hasErrors = false;
    const newErrors = {};
  
    // Validate each field
    props.columns
      .filter((item) => item.field !== 'id' && item.field !== 'customerId')
      .forEach((column) => {
        const value = formData[column.field].toString();;
  
        if (column.field === 'mobile') {
          if (!validateMobileNumber(value)) {
            newErrors[column.field] = 'Invalid mobile number (should have 10 digits)';
            hasErrors = true;
          }
        } else if (column.field === 'email') {
          if (!validateEmail(value)) {
            newErrors[column.field] = 'Invalid email format';
            hasErrors = true;
          }
        } else if (column.field === 'type') {
          // Add validation for 'type' field if needed
          // Example: Check if 'type' contains a specific keyword
          if (value !== 'Retail' && value !== 'Wholesale') {
            newErrors[column.field] = 'Type should be Retail or Wholesale';
            hasErrors = true;
          }
        } else if (column.field === 'name') {
          // Add validation for 'name' field if needed
          // Example: Check if 'name' contains only characters (no numbers)
          if (!/^[A-Za-z\s]+$/.test(value)) {
            newErrors[column.field] = 'Name should contain only characters';
            hasErrors = true;
          }
        }
      });
  
    if (hasErrors) {
      setErrors(newErrors);
      console.log('Form has errors:', newErrors);
    } else {
      // No errors, proceed with API call
      axios
        //.post('http://localhost:8080/api/customers/add', formData)
        .post(customerAddServiceUrl, formData)
        .then((response) => {
          console.log('Data saved successfully', response.data);
          setFormData({});
        setErrors({});

        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const handleRefreshAndClose = () => {
    props.setOpen(false); // Close the modal
    props.refreshData(); // Trigger a refresh of data in the Inventory component
  };
  return (
    <div className='add'>
      <div className='model'>
        <span className='close' onClick={handleRefreshAndClose}>X</span>
        <h2>Add new {props.slug}</h2>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter(item => item.field !== 'id' && item.field !== 'customerId')
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

export default Add_Customer;