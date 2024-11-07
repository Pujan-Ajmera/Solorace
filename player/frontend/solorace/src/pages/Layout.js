import { Outlet } from "react-router-dom";

const Layout = ()=>{
    return(
        <>
        <h1 class="text-center">Sorolace <small style={{fontSize:15}}>--pujan</small></h1>
        <Outlet />
        </>
    )
}

export default Layout;