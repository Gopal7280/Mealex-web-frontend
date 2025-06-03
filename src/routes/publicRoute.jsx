// PublicRoutes.js
import { Route } from "react-router-dom";
import LoginRegister from "../pages/loginRegister";

const PublicRoutes = ({ setAuth,setUserRoleRoutes }) => {
    return <LoginRegister setUserRoleRoutes={setUserRoleRoutes} setAuth={setAuth}></LoginRegister>
};

export default PublicRoutes;