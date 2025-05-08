import "../styles/Loader.css"
import { PiGearLight } from "react-icons/pi";
export function Loader(){
        return(
            <>
            <div className="bg-[#e5e7eb] text-black flex items-center justify-center h-screen">
        <div id="loader" className="flex flex-col items-center">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-black mb-6"></div>
          {/* <h1 className="animate-spin rounded-full duration-"><span className="text-8xl"><PiGearLight /></span></h1> */}
          {/* Loading Text */}
          <h1 className="text-2xl font-semibold tracking-wide">Loading...</h1>
        </div>
    </div>
         </>
        )
}