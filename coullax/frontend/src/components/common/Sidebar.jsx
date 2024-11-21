import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { FaBars, FaHome,FaUsers,FaCalendarCheck, FaRegClipboard, FaSignOutAlt } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";

function Sidebar({ onCollapse }) {
    const [isAuthenticated, setIsAuthenticated] = useState(UserService.isAuthenticated());
    const [isUser, setIsUser] = useState(UserService.isUser());
    const [isCollapsed, setIsCollapsed] = useState(false);
  
//logout 
    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            location.href = '/';
            UserService.logout();
            setIsAuthenticated(false);
            setIsAdmin(false);
            setIsUser(false);
            setIsOwner(false);
           
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    const toggleCollapse = () => {
        setIsCollapsed(prevState => {
          const newState = !prevState;
          onCollapse(newState);
          return newState;
        });
      };
      const [activeLink, setActiveLink] = useState('/'); 

 
  

    return (
        <nav className={`fixed top-0 left-0 h-full bg-[#6e9489] border-r z-10 text-gray-100 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="flex items-center justify-between px-4 py-4">
                    <a href='/dashboard' className={`flex-none ${isCollapsed ? 'hidden' : ''}`}>
                       <img  src="./src/assets/ReadVibeLogo.png"  width={isCollapsed ? 30 : 100}  height="auto" style={{ marginTop: '0', marginLeft: '0' }} />
                    </a>
                    <FaBars onClick={toggleCollapse} />
                    <h1 className={`text-white font-bold ${isCollapsed ? 'hidden' : 'block'}`}></h1>
                    </div>
                    <div className="flex-1 flex flex-col h-4/5 overflow-auto mt-6">
                    <ul className="px-4  text-l flex-1">
                        {isUser && (
                            <>
                                <li>
                                <a href="/dashboard" className="flex items-center gap-x-2 p-2 rounded-lg text-white hover:bg-white/80 hover:text-[#172b59] duration-150 text-base md:text-lg"
                                >
                                    <FaHome />
                                    {!isCollapsed && <p>Dashboard</p>}
                                </a>

                                </li>
                                <li>
                                    <a href="/reviews" className="flex items-center gap-x-2 p-2 rounded-lg text-white hover:bg-white/80 hover:text-[#172b59] duration-150 text-base md:text-lg">
                                        <VscPreview />
                                        {!isCollapsed && <p>Add Reviews</p>}
                                    </a>
                                </li>
                                <li>
                                
                                <a href="/books" className="flex items-center gap-x-2 p-2 rounded-lg text-white hover:bg-white/80 hover:text-[#172b59] duration-150 text-base md:text-lg">
                                       <FaCalendarCheck />
                                        {!isCollapsed && <p>Get Review</p>}
                                    </a>
                                </li>
                                
                                <li>
                                    <a href="/ReviewCard" className="flex items-center gap-x-2 p-2 rounded-lg text-white hover:bg-white/80 hover:text-[#172b59] duration-150 text-base md:text-lg">
                                        <FaRegClipboard />
                                        {!isCollapsed && <p>Reviews</p>}
                                    </a>
                                </li>
                             
                            </>
                        )}
                        
                      
                    </ul>
                    <div className="mt-24"> 
                       <div className="mb-0"> 
                        <ul className="px-4 pb-4 text-l font-medium">
                        <li>
                        <a href="/" onClick={handleLogout} className="flex items-center gap-x-2 p-2 rounded-lg text-white hover:bg-white/80 hover:text-[#172b59] duration-150 text-base md:text-lg">
                        <FaSignOutAlt />
                        {!isCollapsed && <p>Sign Out</p>}
                    </a>
                </li>
            </ul>      
        </div>
    </div>
                    <hr className="my-2 border-white/50" />

                    <div>
                        <ul className="px-4 pb-4 text-l font-medium">
                        <li>
                        <a href="/profile" className="flex items-center gap-x-2 p-2 rounded-lg text-white hover:bg-white/80 hover:text-[#172b59] duration-150 text-base md:text-lg">
                        <CgProfile size={48} className='mr-10' />
                    <div>
  
              {!isCollapsed && <p className="text-l">View Profile</p>}
             </div>  
            </a>
            </li> 
            </ul>      
            </div>
           </div>
        </nav>
    );
}

export default Sidebar;
