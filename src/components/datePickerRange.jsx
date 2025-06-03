import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
const DateRangePicker = ({ onStartDateChange, onEndDateChange, onShow,startDate,endDate,visiblity,setShowCustomDate }) => {
  const [customDateOpen,setCustomDateOpen]=useState(false);
  return (
    <Dialog header="Select Date Range" visible={visiblity} style={{ width: '50vw' }} onHide={() => {if (!visiblity) return; setShowCustomDate(false); }}>
                <div>
      <div className="grid grid-cols-3 gap-4 mb-8 mt-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="startDate">Start Date:</label>
          <input
            id="startDate"
            value={startDate}
            name="startDate"
            className="p-[0.76rem] border border-[#d1d5db] rounded-[6px]"
            type="date"
            onChange={onStartDateChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="endDate">End Date:</label>
          <input
            id="endDate"
            value={endDate}
            name="endDate"
            className="p-[0.76rem] border border-[#d1d5db] rounded-[6px]"
            type="date"
            onChange={onEndDateChange}
          />
        </div>
        <div className="mt-9">
          <button
          onClick={onShow}
            className="bg-[#3A5B76] hover:bg-[#2E4A5E] text-white font-semibold px-10 py-2 shadow-md transition-all duration-200"
          >
            View
          </button>
        </div>
      </div>
    </div>
            </Dialog>
  );
};

export default DateRangePicker;
