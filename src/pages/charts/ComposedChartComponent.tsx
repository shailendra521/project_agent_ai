import { ComposedChart, Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ComposedChartComponent = ({ data }: { data: any[] }) => (
  <div className="h-96">
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="pv" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);
export default ComposedChartComponent;
