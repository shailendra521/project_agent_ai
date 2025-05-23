import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from 'recharts';

const RadarChartComponent = ({ data }: { data: any[] }) => (
  <div className="h-96">
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart outerRadius={90} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar name="Mike" dataKey="uv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);
export default RadarChartComponent;
