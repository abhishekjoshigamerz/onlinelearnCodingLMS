import React from 'react';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
  return (
    <>
    
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div className="text-center "  style={{fontSize:'24px',  backgroundColor:'#f5f5f5', borderRadius:'10px', padding:'10px'}} >
          <NavLink className="nav-link" aria-current="page" to={'/'} > CodeMaster </NavLink>
          </div>
      <div class="position-sticky pt-3">
        
       <ul className="nav flex-column">
  <li className="nav-item text-center" style={{fontSize:'18px',  backgroundColor:'#f5f5f5', borderRadius:'10px', padding:'10px'}}>
    <NavLink 
        className="nav-link" 
        aria-current="page" 
        to={"/dashboard/"}
        activeClassName="active"
        style={{fontSize:'18px', color:'#333', textDecoration:'none'}}
    >
        <span data-feather="home"></span>
        Dashboard
    </NavLink>
  </li>
  <li className="nav-item text-center" style={{fontSize:'18px', backgroundColor:'#f5f5f5', borderRadius:'10px', padding:'10px'}}>
    <NavLink 
        className="nav-link" 
        aria-current="page" 
        to={"/dashboard/courses/"}
        style={{fontSize:'18px', color:'#333', textDecoration:'none'}}
    >
        <span data-feather="home"></span>
        Find New Courses
    </NavLink>
  </li>
  <li className="nav-item text-center" style={{fontSize:'18px', backgroundColor:'#f5f5f5', borderRadius:'10px', padding:'10px'}}>
    <NavLink 
        className="nav-link" 
        aria-current="page" 
        to={"/practice-ide/"}
        style={{fontSize:'18px', color:'#333', textDecoration:'none'}}
    >
        <span data-feather="home"></span>
        Practice IDE
    </NavLink>
  </li>
  <li className="nav-item text-center" style={{fontSize:'18px', backgroundColor:'#f5f5f5', borderRadius:'10px', padding:'10px'}}>
    <NavLink 
        className="nav-link" 
        aria-current="page" 
        to={"/settings/"}
        style={{fontSize:'18px', color:'#333', textDecoration:'none'}}
    >
        <span data-feather="home"></span>
        Settings
    </NavLink>
  </li>
  <li className="nav-item text-center" style={{fontSize:'18px', margin:' 0', backgroundColor:'#f5f5f5', borderRadius:'10px', padding:'10px'}}>
    <NavLink 
        className="nav-link" 
        aria-current="page" 
        to={"/logout/"}
        style={{fontSize:'18px', color:'#333', textDecoration:'none'}}
    >
        <span data-feather="home"></span>
        LogOut
    </NavLink>
  </li>
</ul>


        
      </div>
    </nav>
    </>
  );
};

export default Sidebar;
