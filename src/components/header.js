//import '../styles/header.css'
import logo from '../images/logo2.png'
import { FaStar } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header(){
    return(
        <nav className="navbar navbar-expand-sm  fixed-top">
            <Link to="/"> <img src={logo}/></Link>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-item ">
                    <a href="#">Meals</a>
                </li>
                <li className="nav-item ">
                    <a  href="#">Categories</a>
                </li>
                <li className="nav-item ">
                    <a  href="#">About</a>
                </li>
            </ul>
            <Link className='icon' to='/favoris'>
                <FaStar size="1.25em"/>
            </Link>
            <a href='#Search'>
                <FaSearch size="1.25em"/>
            </a>
         </nav>
    )
}
export default Header;