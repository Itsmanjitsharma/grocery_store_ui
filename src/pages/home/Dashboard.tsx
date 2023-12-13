import './Dashboard.scss';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import './Dashboard.scss'; // Import your CSS file
import { useEffect, useState } from 'react';
import {BarChart, Bar,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer, // Add this line to import ResponsiveContainer
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { dashboardDetailsUrl } from '../../data';
import axios from 'axios';
const Dashboard = () => {
  const [sales, setSales] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [products, setProducts] = useState(0);
  const [profits, setProfits] = useState(0);
  const [paymentData,setPaymentData] = useState();
  const [inventoryData,setInvntoryData] = useState();
  const [saleData,setSaleData] = useState();
  const generateRandomColor = () => {
    // Generate a random color in hexadecimal format
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 5; i < 11; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const currentDate = new Date();
    const thirtyDaysAgo = new Date(currentDate);
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);
    const apiUrl = `${dashboardDetailsUrl}`;
    axios.get(apiUrl)
      .then((response) => {      
        setSales(response.data.sale);
        setCustomers(response.data.customer);
        setProducts(response.data.products);
        setProfits(response.data.profit);
        const groupedPaymentData = response.data.paymentData.map((item: { method: any; value: any }) => ({
          name: item.method,
          value: item.value,
          fill: generateRandomColor(), // Use your logic to generate a unique color
        }));
        const groupedInventoryData = response.data.inventoryData.map((item: { status: any; value: any }) => ({
          name: item.status,
          value: item.value,
          fill: generateRandomColor(), // Use your logic to generate a unique color
        }));
        setPaymentData(groupedPaymentData);
        setInvntoryData(groupedInventoryData);
        const formattedData = response.data.saleData.map(item => ({
          day_or_month: item.xises, // Format the date if needed (e.g., from '11/12' to 'November 12')
          amount: item.yxises,
        }));
        
        // Set the formatted data to state
        setSaleData(formattedData);
      })
      .catch((error) => {
        console.error("An error occurred while fetching data:", error);
      });
  }, []);
  return (
    <div className='dashboard_container'>
      <div className='dashboard_first_section'>
        <div className='firstsection'>{`Total Sales: $${sales}`}</div>
        <div className='firstsection'>{`Total Customers: ${customers}`}</div>
        <div className='firstsection'>{`Total Products: ${products}`}</div>
        <div className='firstsection'>{`Total Profits: $${profits}`}</div>
      </div>
      <div className='dashboard_second_section'>
      <div className='secondsection'>
      <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={paymentData}
                dataKey="value"
                nameKey="name"
                cx="40%"
                cy="50%"
                outerRadius={110}
                fill="#fill" // Provide the array of colors
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
      </ResponsiveContainer>
        </div>
        <div className='secondsection'>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={saleData}>
          <CartesianGrid stroke="#ffffff" strokeDasharray="0" />
          <XAxis dataKey="day_or_month" />
          <YAxis dataKey="amount" />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" name= "Sale Data" fill="#8884d8" background={{ fill: 'none' }} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
      </div>
      <div className='dashboard_third_section'>
        <div className='third_section'>
        </div>
        <div className='third_section'>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={inventoryData}
                dataKey="value"
                nameKey="name"
                cx="40%"
                cy="50%"
                outerRadius={110}
                fill="#fill" // Provide the array of colors
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
      </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
};




export default Dashboard;
