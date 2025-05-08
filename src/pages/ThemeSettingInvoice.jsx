import { useNavigate } from "react-router-dom";
import Sidebar from "../layouts/Sidebar"; // Make sure Sidebar is correctly imported
import "../styles/layoutFix.css";
import "../styles/setting.css";
const ThemeSettingInvoice = () => {
    const navigate=useNavigate();
    function handleClickPreviewA4(e){
          navigate("/invoiceSampleA4");
    }
    function handleClickPreviewA5(e){
  
    }
    return <div>
      <h2>Invoice Theme Settings</h2>
      <div className="preview">
        <div onClick={handleClickPreviewA4} className="preview-1">
          <span className="">Click here to see 
            <br />
            Invoice Preview for <br />
            a4 size</span>
        </div>
        <div onClick={handleClickPreviewA5}><span className="">Click here to see 
            <br />
            Invoice Preview for <br />
            a5 size</span></div>
      </div>
    </div>;
  };
  export default ThemeSettingInvoice;