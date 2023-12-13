import { GridColDef } from '@mui/x-data-grid';
import './Add.scss';
import axios from 'axios';
import { useState } from 'react';
import { inventoryAddServiceUrl } from '../../data';

type Props = {
  slug: string,
  columns: GridColDef[],
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const Add = (props: Props) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //const trimmedValue = value; // Trim spaces from the beginning and end
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSave = () => {
    //axios.post('http://localhost:8080/addInventory', formData)
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
        <span className='close' onClick={() => props.setOpen(false)}>X</span>
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