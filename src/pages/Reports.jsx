import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReportItem = ({ name,handleClick }) => (
  <button
  onClick={(e)=>handleClick(e,name)}
    className="!block !py-2.5 !px-4 !text-[#3A5B76] hover:bg-slate-100 rounded-md transition-colors duration-150 flex items-start"
  >
    {name}
  </button>
);

const ReportCategory = ({ title, reports, initialShowCount = reports.length }) => {
  const navigate=useNavigate();
  const [showAll, setShowAll] = useState(false);
  const displayedReports = showAll ? reports : reports.slice(0, initialShowCount);
  function handleNavigatePage(e,name){
    console.log(name);
    for(var i of displayedReports){
      if(i.name==name)
      {
        console.log("match");
        if(name=="GSTR-1"){
          navigate("/salesReport");
        }
        if(name=="Purchase Report (GSTR-3B)"){
          navigate("/gstPurchaseReport");
        }
      }
      else{
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
        {displayedReports.map((report) => (
          <ReportItem key={report.name} handleClick={handleNavigatePage} name={report.name} />
        ))}
      </div>
    </div>
  );
};

const reportsData = {
  coreReports: [
    { name: 'GSTR-1' },
    { name: 'Purchase Report (GSTR-3B)' },
    { name: 'Financial & Business Management Report' },
    { name: 'Cash/Bank Book Report' },
    { name: 'Debtors (Account Receivable) Reports' },
    { name: 'Creditors (Account Payable) Reports' },
    { name: 'Profit & Loss Statement Report' },
    { name: 'Invoice Report' },
    { name: 'Inventory Report' },
  ],
};

function Reports() {
  return (
    <div className="min-h-screen bg-slate-100 text-[#3A5B76] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 sticky top-0 w-full">
        <h1 className="text-xl font-semibold text-[#3A5B76] text-left">Core Transaction Reports</h1>
      </header>

      {/* Content */}
      <main className="p-4 w-full max-w-8xl mx-auto flex-1">
        <ReportCategory title="Core Reports" reports={reportsData.coreReports} initialShowCount={6} />
      </main>
    </div>
  );
}

export default Reports;