// import ProtectedRouteComponent from "./routes/ProtectedRoutes";
import RouteComponent from "./routes/routes";
import 'primereact/resources/primereact.min.css'; // Core styles
import 'primeicons/primeicons.css';              // Icons
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Theme styles

function App(){
    return(
        // <ProtectedRouteComponent></ProtectedRouteComponent>       
        <RouteComponent></RouteComponent>
    )
}
export default App;
