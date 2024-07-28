import React from 'react';

const monthOptions = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MonthDropdown = ({ selectedMonth, onChange }) => (
  <select value={selectedMonth} onChange={(e) => onChange(e.target.value)}>
    <option value="">Select a month</option>
    {monthOptions.map((month, index) => (
      <option key={index} value={month.toLowerCase()}>{month}</option>
    ))}
  </select>
);

export default MonthDropdown;
