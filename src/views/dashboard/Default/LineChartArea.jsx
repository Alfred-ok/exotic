import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import axios from 'axios';
import { Switch, FormControlLabel, TextField, MenuItem } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { zoomies } from 'ldrs'



const LineChartArea = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('success');
  const [periodFilter, setPeriodFilter] = useState('month');
  const [loading, setLoading] = useState(true);

  zoomies.register();

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.exoticnairobi.com/api/payments');
        setPayments(response.data.payments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
      setLoading(false);
    }
    };
    fetchPayments();
  }, []);

  const filterByPeriod = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    if (periodFilter === 'today') {
      return (
        date.toDateString() === today.toDateString()
      );
    } else if (periodFilter === 'month') {
      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    } else if (periodFilter === 'year') {
      return date.getFullYear() === today.getFullYear();
    }
    return true;
  };

    useEffect(() => {
      const filtered = payments
        .filter((item) => item.status === statusFilter && filterByPeriod(item.created_at))
        .map((item) => ({
          name: new Date(item.created_at).toLocaleDateString(), // for display
          date: new Date(item.created_at), // for sorting
          amount: parseFloat(item.amount),
        }));

      const grouped = filtered.reduce((acc, curr) => {
        const existing = acc.find((item) => item.name === curr.name);
        if (existing) {
          existing.amount += curr.amount;
        } else {
          acc.push({ name: curr.name, amount: curr.amount, date: curr.date });
        }
        return acc;
      }, []);

      // Sort by date (ascending)
      grouped.sort((a, b) => a.date - b.date);

      setFilteredPayments(grouped);
    }, [payments, statusFilter, periodFilter]);


  return (
    <div className="w-full h-100 bg-white rounded-xl shadow p-4 dark:bg-gray-800">
      {/* Title & Period Filter */}
      <div 
        style={{
            display:"flex", justifyContent:"space-between", alignItems:"center",  backgroundColor: 'rgb(59, 130, 246)',
            color: 'white',
            padding: '5px 16px',
            borderRadius: '8px',
            marginBottom: "35px"
          }}
        >
        <h2 className="text-lg font-semibold text-white bg-blue-500 px-4 py-2 rounded">
          Revenue
        </h2>
        <TextField
          select
          //label="Filter By"
          value={periodFilter}
          onChange={(e) => setPeriodFilter(e.target.value)}
          size="small"
          sx={{ minWidth: 140, backgroundColor: 'white', borderRadius: 1 }}
        >
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="month">This Month</MenuItem>
          <MenuItem value="year">This Year</MenuItem>
        </TextField>
      </div>

      {/* Chart */}
        {!loading ?
        <>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={filteredPayments} margin={{ top: 10, right: 30, left: 0, bottom: 40 }}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            stroke="#94a3b8" 
            label={{ value: 'Date', position: 'insideBottom', offset: -25 }}
          />
          <YAxis 
            stroke="#94a3b8" 
            label={{ value: 'Amount (KES)', angle: -90, position: 'insideLeft' }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorAmount)"
          />
        </AreaChart>

      </ResponsiveContainer>

      {/* Switch Toggle */}
      <div className="flex justify-center items-center mt-6" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <FormControlLabel
          control={
            <Switch
              checked={statusFilter === 'success'}
              onChange={(e) => setStatusFilter(e.target.checked ? 'success' : 'pending')}
              color="primary"
            />
          }
          label={statusFilter === 'success' ? 'Processed payments' : 'Pending payments'}
        />
      </div>
      </>
      :
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <l-zoomies
            size="200"
            speed="1.5" 
            color="rgb(59, 130, 246)" 
          ></l-zoomies>
        </div>
         }
        
      
    </div>
  );
};

export default LineChartArea;
