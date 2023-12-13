import './BarChartTemplate.scss';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

 const dailySell = [
  {
    "name": "01/01",
    "sales": 38976
  },
  {
    "name": "01/02",
    "sales": 48906
  },
  {
    "name": "01/03",
    "sales": 36574
  },
  {
    "name": "01/04",
    "sales": 41289
  },
  {
    "name": "01/05",
    "sales": 40321
  },
  {
    "name": "01/06",
    "sales": 34890
  },
  {
    "name": "01/07",
    "sales": 42156
  }
]
const BarChartTemplate = () => {
  return (
    <div className='barChart'>
      <h2>Title</h2>
      <div className='chart'>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailySell} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 'dataMax + 1000']} />
            <Tooltip 
              cursor={{ fill: "none" }}
              contentStyle={{ background: "#2a3447", borderRadius: "10px" }}
            />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default BarChartTemplate;
