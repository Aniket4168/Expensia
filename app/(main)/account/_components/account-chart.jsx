"use client"
import { endOfDay, format, startOfDay, subDays } from 'date-fns';
import React from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DATE_RANGES = {
    "7D": {label: "Last 7 Days", days:7},
    "1M": {label: "Last Month", days:30},
    "3M": {label: "Last 3 Months", days:90},
    "6M": {label: "Last 6 Months", days:180},
    ALL: {label:"All Time" , days:null},
}

const AccountChart = ({transactions}) => {

    const [dateRange, setDateRange] = useState("1M");

    const filteredData = useMemo(() => {
        const range = DATE_RANGES[dateRange];
        const now = new Date();

        const startDate = range.days 
        ? startOfDay(subDays(now, range.days))
        : startOfDay(new Date(0));

        //filter transactions within date range
        const filtered = transactions.filter(
            (t) => new Date(t.date) >= startDate && new DAte(t.date) <= endOfDay(now)
        );

        const group = filtered.reduce((acc, transaction) => {
            const date = format(new Date(transaction.date), "MMM dd");

            if(!acc[date]) {
                acc[date] = {date, income:0 , expense:0}
            }
        }, {});

    }, [transactions, dateRange])

  return (
    <div>
        {/* <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, 
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
      </BarChart>
    </ResponsiveContainer> */}
    </div>
  )
}

export default AccountChart