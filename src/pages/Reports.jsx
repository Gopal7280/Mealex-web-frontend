// Description: This file contains the Reports component which displays various report categories and allows navigation to specific report pages.
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../services/api';


// Component to render each report item
const ReportItem = ({ name, handleClick }) => (
  // Button for each report
  <button
    disabled={
      name == 'Purchase Report (GSTR-2)' ||
      name == 'Inventory Report' ||
      name == 'Invoice Report' ||
      name == 'Profit & Loss Statement Report' ||
      name == 'Creditors (Account Payable) Reports' ||
      name == 'Debtors (Account Receivable) Reports' ||
      name == 'Cash/Bank Book Report' ||
      name == 'Financial & Business Management Report' ||
      name == 'Purchase Report (GSTR-2)'
    }
    onClick={e => handleClick(e, name)}
    className="disabled:opacity-80 !block !py-2.5 !px-4 !text-[#3A5B76] hover:bg-slate-100 rounded-md transition-colors duration-150 flex items-start"
  >
    {name}
  </button>
);

// Component to render a category of reports
const ReportCategory = ({
  title,
  reports,
  initialShowCount = reports.length,
}) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const displayedReports = showAll
    ? reports
    : reports.slice(0, initialShowCount);
  function handleNavigatePage(e, name) {
    console.log(name);
    for (var i of displayedReports) {
      if (i.name == name) {
        console.log('match');
        if (name == 'GSTR-1') {
          navigate('/salesReport');
        }
        if (name == 'Sales Report') {
          navigate('/salesReport1');
        }
        if (name == 'Purchase Report (GSTR-2)') {
          navigate('/gstPurchaseReport');
        }
      } else {
        console.log(i);
      }
    }
  }
  return (
    <div className="bg-white p-4 rounded-lg w-full shadow-sm">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2 flex items-center">
        <span className="mr-2 text-blue-500">📄</span>
        {title}
      </h3>
      <div className="space-y-1">
        {displayedReports.map(report => (
          <ReportItem
            key={report.name}
            handleClick={handleNavigatePage}
            name={report.name}
          />
        ))}
      </div>
    </div>
  );
};

// Main Reports component that uses ReportCategory to display reports
const reportsData = {
  coreReports: [
    { name: 'GSTR-1' },
    { name: 'Sales Report' },
    { name: 'Purchase Report (GSTR-2)' },
    { name: 'Financial & Business Management Report' },
    { name: 'Cash/Bank Book Report' },
    { name: 'Debtors (Account Receivable) Reports' },
    { name: 'Creditors (Account Payable) Reports' },
    { name: 'Profit & Loss Statement Report' },
    { name: 'Invoice Report' },
    { name: 'Inventory Report' },
  ],
};

// Main Reports component
function Reports() {
  const navigate=useNavigate();
  useEffect(()=>{
         const fetchBussiness = async () => {
              try {
                const res = await apiGet('/businessprofile');
                if (res.length === 0) {
                  navigate('/profile_form');
                }
              } catch (err) {
                console.log("working");
                console.log(err);
              }
            };
            fetchBussiness();
  },[])
  return (
    <div className="min-h-screen bg-slate-100 text-[#3A5B76] flex flex-col">
      {/* Header */}

      {/* Content */}
      <main className="p-4 w-full max-w-8xl mx-auto flex-1">
        <ReportCategory
          title="Core Reports"
          reports={reportsData.coreReports}
          initialShowCount={6}
        />
      </main>
    </div>
  );
}

export default Reports;
