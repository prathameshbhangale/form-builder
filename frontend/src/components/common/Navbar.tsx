import React from 'react';
import { Link } from 'react-router-dom';
import ApplyGradient from './helpers/ApplyGradient';
import HiglightText from './helpers/HiglightText';
import { RiAccountBoxFill } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store';

const Navbar: React.FC = () => {
    const token = useSelector((state: RootState) => state.user?.token)

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
        
            <Link to="/">
                <div className="text-xl font-bold"><ApplyGradient text='FoRm_BuilDER'></ApplyGradient></div>      
            </Link>

        <ul className="flex space-x-6">
            <li>
            <Link to="/forms" className="hover:underline">Forms</Link>
            </li>
            <li>
            <Link to="/responses" className="hover:underline">Responses</Link>
            </li>
            <li>
            <Link to="/createForm" className="hover:underline">Create Form</Link>
            </li>
        </ul>
        
        {token === null ? (
            <div className='flex gap-3'>
                <Link to="/login">
                    <button className="rounded-lg border border-richblack-700 px-2 py-2 text-richblack-100 font-semibold transition-all duration-300 hover:bg-richblack-700 hover:border-richblack-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-richblack-600">
                    <HiglightText text='Log in'/>
                    </button>
                </Link>
                <Link to="/signup">
                    <button className="rounded-lg border border-richblack-700 px-2 py-2 text-richblack-100 font-semibold transition-all duration-300 hover:bg-richblack-700 hover:border-richblack-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-richblack-600">
                        <HiglightText text='Sign up'/>
                    </button>
                </Link>
            </div>
        ):(
            <Link to="/profile" className="hover:underline"><RiAccountBoxFill size={27}/></Link>
        )
    
        }

        
        
        </nav>
    );
};

export default Navbar;
