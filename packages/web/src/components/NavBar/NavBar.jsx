import { Link } from 'react-router-dom'
import Home from "../../pages/Home.jsx"
export default function NavBar() {
    return(
        <nav>
            <h2> Navbar</h2>
            <ul>
                <li><Link to = "/"> Home</Link></li>
                <li><Link to = "/about"> About</Link></li>
                <li><Link to = "/login"> Login</Link></li>
                <li><Link to = "/register"> Register</Link></li>
            </ul>
        </nav>
    )
}
