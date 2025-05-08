import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Dialog } from 'primereact/dialog';
import { Dropdown } from "primereact/dropdown";
import { Preview, ModeEdit, DeleteForever,CloudUpload } from "@mui/icons-material";
import { apiGet, apiPost } from "../services/api";
import { values } from "lodash";
export function BulkActions({fileName,columns,dialogName}){
    const [seletedAction, setSelectedAction] = useState(null);
          const actions = [{ name: "Download" }, { name: "Upload" }];
          const [excelData, setExcelData] = useState([]);
          const [uplaod,setUpload]=useState(true);
          const [visible, setVisible] = useState(false);
    const handleDownload = () => {
        const headers=columns
    
        const worksheet = XLSX.utils.json_to_sheet(headers, { skipHeader: false });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
    
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
    
        const file = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
    
        saveAs(file, `${fileName}.xlsx`);
      };
      const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = (evt) => {
          const arrayBuffer = evt.target.result;
          const workbook = XLSX.read(arrayBuffer, { type: "array" });
    
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
          setExcelData(jsonData);
          console.log(jsonData);
          if(dialogName=="product's"){
            try{
              const addExcel=async ()=>{
                const res=await apiPost("/products/bulk/products",jsonData);
                console.log(res);
                window.location.reload();
              }
              addExcel();
            }
              catch(err){
                console.log(err);
              }
          }
          if(dialogName=="customer's"){
            try{
              const addExcel=async ()=>{
                const res=await apiPost("/customers/bulk/customers",jsonData);
                console.log(res);
                window.location.reload();
              }
              addExcel();
            }
              catch(err){
                console.log(err);
              }
          }
          }   
       reader.readAsArrayBuffer(file); // ✅ Modern & recommended
        setVisible(false);
      };
      function handleBulkAction(e,name){
          console.log(name);
          if(name.name=="Download"){
            handleDownload();
          }
          if(name.name=="Upload")
          {
              setVisible(true);
          }
      }
    return(
        <>
        <div className="card flex justify-content-center">
                      <Dropdown
                        value={seletedAction}
                        onChange={(e) => handleBulkAction(e,e.value)}
                        options={actions}
                        optionLabel="name"
                        placeholder="Select a Bulk Action"
                        className="w-full md:w-14rem"
                      />
                    </div>
                    <Dialog header={"uplaod"+" "+dialogName+" "+"excel"} visible={visible} onHide={() => {if (!visible) return; setVisible(false); }}
                        style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>                
                        <div className="text-center p-3">
                        <input className="bg-[#3A5B76] text-white me-3 px-4 py-2 rounded hover:bg-[#2D465B]" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                        <span><CloudUpload/>
                        </span>
                    </div>
                    </Dialog>
        </>
    )
}