import { GridColDef } from '@mui/x-data-grid';
import './Add.scss';
import axios from 'axios';
import { useState } from 'react';
import { inventoryAddServiceUrl } from '../../data';

type Props = {
  refreshData(): unknown;
  slug: string,
  columns: GridColDef[],
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const Add = (props: Props) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
    if (name === 'stockValue' || name === 'quantity') {
      const stockValue = parseFloat(updatedFormData['stockValue']) || 0;
      const quantity = parseFloat(updatedFormData['quantity']) || 0;
      updatedFormData = {
        ...updatedFormData,
        purchaseCost: (stockValue / quantity).toFixed(2), // Calculate purchaseCost dynamically
      };
    }else if (name === 'purchaseCost') {
      const quantity = parseFloat(updatedFormData['quantity']) || 0;
      const purchaseCost = parseFloat(updatedFormData['purchaseCost']) || 0;
      updatedFormData = {
        ...updatedFormData,
        stockValue: (quantity * purchaseCost).toFixed(2), // Calculate purchaseCost dynamically
      };
    }
    //const trimmedValue = value; // Trim spaces from the beginning and end
    //setFormData({ ...formData, [name]: value });
    setFormData(updatedFormData);

  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleRefreshAndClose = () => {
    props.setOpen(false); // Close the modal
    props.refreshData(); // Trigger a refresh of data in the Inventory component
  };

  const handleSave = () => {
    axios.post(inventoryAddServiceUrl, formData)
      .then((response) => {
        console.log('Data saved successfully', response.data);
        setFormData({});
      })
      .catch((_error) => {
      });
  };

  return (
    <div className='add'>
      <div className='model'>
        <span className='close' onClick={handleRefreshAndClose}>X</span>
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
              </div>
            ))}
          <button className='button' onClick={handleSave}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default Add;