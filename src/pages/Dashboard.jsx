import React, { useEffect, useState } from "react";
// import Chart from 'chart.js/auto'; // Import Chart.js
import Sidebar from "../layouts/Sidebar"; // Ensure Sidebar is correctly imported
import { apiGet } from "../services/api";
import { Chart } from "primereact/chart";
import "../styles/dashboard.css";
import { Loader } from "../layouts/Loader";
import { Dropdown } from "primereact/dropdown";
import { Skeleton } from 'primereact/skeleton';
const Dashboard = () => {
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalInvoiceUnpaid, setTotalInvoiceUnpaid] = useState(0);
  const [totalPurchaseUnpaid, setPurchaseUnpaid] = useState(0);
  const [loader, setLoader] = useState(true);
  const [chartOptions, setChartOptions] = useState({});
  const [totalSales, setTotalSales] = useState(0);
  const [selectedGraphOtion, setSelectedGraphOtion] = useState({
    name: "Weekly",
  });
  const [chartData, setChartData] = useState({});
  const [dayWiseSale, setDayWiseSale] = useState(null);
  const [labelDate, setLabelDate] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ]);
  const [labelName, setLabelName] = useState("Sales");
  useEffect(() => {
    setLoader(true);
    console.log(selectedGraphOtion);
    try {
      const fetchSalesWeekly = async () => {
        const res = await apiGet("/sales");
        console.log(res);
        const updatedSales = res.daily_sales.map((item) => ({
          day: item.day,
          total: item.total,
        }));
        var total=0;
        for(var i of res.daily_sales)
        {
          total=i.total+total;
        }
        setTotalSales(total);
        setDayWiseSale(updatedSales);
        const data = {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: labelName,
              data: [
                res.daily_sales[0].total,
                res.daily_sales[1].total,
                res.daily_sales[2].total,
                res.daily_sales[3].total,
                res.daily_sales[4].total,
                res.daily_sales[5].total,
                res.daily_sales[6].total,
              ],
              backgroundColor: "#3A5B76",
              borderWidth: 1,
            },
          ],
        };
        const options = {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };
        setChartData(data);
        setChartOptions(options);
      };
      fetchSalesWeekly();
      const fetchCustomer = async () => {
        const res = await apiGet("/customers");
        console.log(res);
        setTotalCustomer(res.length);
      };
      fetchCustomer();
      const fetchInvoice = async () => {
        const res1 = await apiGet("/invoices");
        console.log(res1);
        var total = 0;
        for (var i of res1) {
          if (i.status == "Unpaid") {
            total = total + 1;
          }
        }
        setTotalInvoiceUnpaid(total);
      };
      fetchInvoice();
      const fetchPurchase = async () => {
        const res1 = await apiGet("/purchase");
        console.log(res1);
        var total = 0;
        for (var i of res1.data) {
          if (i.status == "Unpaid") {
            total = total + 1;
          }
        }
        setPurchaseUnpaid(total);
      };
      fetchPurchase();
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(true);
    }
  }, []);

  /////////////////////////////////////////////////////////
  const graphsOption = [
    { name: "Weekly" },
    { name: "Monthly" },
  ];
  function handleGraphChange(e, name) {
    console.log(name);
    if (name.name == "Weekly") {
      const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "sales",
            data: [
              dayWiseSale[0].total,
              dayWiseSale[1].total,
              dayWiseSale[2].total,
              dayWiseSale[3].total,
              dayWiseSale[4].total,
              dayWiseSale[5].total,
              dayWiseSale[6].total,
            ],
            backgroundColor: "#3A5B76",
            borderWidth: 1,
          },
        ],
      };
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
      setSelectedGraphOtion(name);
      setChartData(data);
      setChartOptions(options);
    }
    //Monthly
    if (name.name == "Monthly") {
        
        try{
        const fetchMonthly=async ()=>{
        const res=await apiGet("/sales/monthly")
        console.log(res);
        const updatedMonthData=res.daily_sales.map(item=>(
            item.total
        ))
        console.log(updatedMonthData);
        const data = {
            labels: labelDate,
            datasets: [
              {
                label: "sales",
                data: updatedMonthData,
                backgroundColor: "#3A5B76",
                borderWidth: 1,
              },
            ],
          };
          const options = {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          };
          setSelectedGraphOtion(name);
          setChartData(data);
          setChartOptions(options);
        }    
        fetchMonthly();
    }
    catch(err){
        console.log(err);
    }
    }
    //yearly
    if (name.name == "Yearly") {
      const data = {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "sales",
            data: [1, 2, 3, 4],
            backgroundColor: "#3A5B76",
            borderWidth: 1,
          },
        ],
      };
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
      setSelectedGraphOtion(name);
      setChartData(data);
      setChartOptions(options);
    }
  }
  return (
    <>
    {
      chartData.labels ?(
        <div className="font-roboto bg-gray-200">
      <div className="flex-1 p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:!bg-gray-800 p-4 shadow-md rounded-lg hover:bg-gray-100 relative group">
            <h3 className="text-lg font-semibold text-[#3A5B76] dark:!text-white">
              Total Sales Weekly
            </h3>
            <p className="text-3xl font-bold text-[#3A5B76] dark:!text-white">₹{totalSales.toFixed(2)}</p>
          </div>
          <div className="bg-white dark:!bg-gray-800 p-4 shadow-md rounded-lg hover:bg-gray-100 relative group">
            <h3 className="text-lg font-semibold dark:!text-white text-[#3A5B76]">
              Total Customers
            </h3>
            <p className="text-3xl font-bold text-[#3A5B76] dark:!text-white ">{totalCustomer}</p>
          </div>
          <div className="bg-white dark:!bg-gray-800 p-4 shadow-md rounded-lg hover:bg-gray-100 relative group cursor-pointer">
            <h3 className="text-lg font-semibold text-[#3A5B76] dark:!text-white">
              Total Unpaid Invoices
            </h3>
            <p className="text-3xl font-bold text-[#3A5B76] dark:!text-white">
              {totalInvoiceUnpaid}
            </p>
          </div>
          <div className="bg-white dark:!bg-gray-800 p-4 shadow-md rounded-lg hover:bg-gray-100 relative group">
            <h3 className="text-lg font-semibold text-[#3A5B76] dark:!text-white">
              Total Unpaid Purchases
            </h3>
            <p className="text-3xl font-bold text-[#3A5B76] dark:!text-white">
              {totalPurchaseUnpaid}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white ">
          <Dropdown
            value={selectedGraphOtion}
            onChange={(e) => handleGraphChange(e, e.value)}
            options={graphsOption}
            optionLabel="name"
            placeholder="Select Timeline"
            className="w-64 md:w-14rem mt-3 ml-2"
          />
          <div className="p-2" id="monthly">
            {chartData.labels ? (
              <Chart
                type="bar"
                className="elementstyle"
                data={chartData}
                options={chartOptions}
              />
            ) : (
              <div>Working</div>
            )}
          </div>
        </div>
      </div>
    </div>
      ):(
        <div className="bg-white">
        <div className="flex-1 p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Skeleton width="100%" height="150px"></Skeleton>
        <Skeleton width="100%" height="150px"></Skeleton>
        <Skeleton width="100%" height="150px"></Skeleton>
        <Skeleton width="100%" height="150px"></Skeleton>
        </div>

        {/* Charts */}
        <Skeleton width="100%" height="100vh"></Skeleton>
      </div>
      </div>
      )
    }
    </>
  );
};

export default Dashboard;
