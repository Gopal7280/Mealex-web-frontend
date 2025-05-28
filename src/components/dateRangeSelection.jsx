import React from 'react';

const RangeSelect = ({ onChange }) => {
  return (
    <select
      onChange={onChange}
      className="me-2 p-[0.50rem] border border-[#d1d5db]"
    >
      <option value="today">Today</option>
      <option value="yesterday">Yesterday</option>
      <option value="last7Days">Last 7 Days</option>
      <option value="thisWeek">This Week</option>
      <option value="lastWeek">Last Week</option>
      <option value="last30Days">Last 30 Days</option>
      <option value="thisMonth">This Month</option>
      <option value="lastMonth">Last Month</option>
      {/* <option value="theQuarter">The Quarter</option>
      <option value="lastQuarter">Last Quarter</option>
      <option value="theFinancialYear">The Financial Year</option> */}
    </select>
  );
};

export default RangeSelect;
