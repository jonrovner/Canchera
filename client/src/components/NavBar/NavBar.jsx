import React from 'react';
import { NavLink } from 'react-router-dom';
import {AiFillHome,AiOutlineSearch, AiFillMail, AiOutlineUser} from 'react-icons/ai';

import './NavBar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div>
                <a href='#'><AiFillHome/> Home </a>
            </div>
            <div>
                <a className='link' href='#'><AiFillMail/> Contact</a>            
            </div> 
            <div className='search'>                
                <NavLink to={'#'}>  
                    
                    <input type="text" placeholder='Buscar' />                  
                    <button><AiOutlineSearch/></button>                 
                </NavLink>
            </div> 
            <div className='login'>
                <a  href='#'><AiOutlineUser/> Login</a> 
            </div>
        </div>
    );
}

export default Navbar;
