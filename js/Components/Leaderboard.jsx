import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Leaderboard = props =>
  <BarChart
    style={{ float: 'left', marginTop: '5%' }}
    width={800}
    height={500}
    data={props.barData}
    margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
  >
    <XAxis dataKey="name" />
    <YAxis />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Legend />
    <Bar name="Most Active Volunteers" dataKey="joined" fill="#82ca9d" />
  </BarChart>;

export default Leaderboard;
