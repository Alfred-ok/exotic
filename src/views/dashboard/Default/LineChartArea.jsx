
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const data = [
  { name: 'Mon', users: 400 },
  { name: 'Tue', users: 300 },
  { name: 'Wed', users: 500 },
  { name: 'Thu', users: 700 },
  { name: 'Fri', users: 600 },
  { name: 'Sat', users: 200 },
  { name: 'Sun', users: 400 },
];

const LineChartArea = () => {
  return (
    <div className="w-full h-100 bg-white rounded-xl shadow p-4 dark:bg-gray-800">
      <div class="w-full  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700" style={{backgroundColor:"#3b82f6",padding:"5px 20px", marginBottom:"20px", borderRadius:"5px", color:"#fff"}}>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white p-3" style={{color:"#fff"}}>Revenue</h2>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorUsers)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartArea;



