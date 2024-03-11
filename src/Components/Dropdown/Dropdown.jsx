import { Link } from "react-router-dom"
import "./DropdownStyles.css"
const Dropdown = () => {
  return (
    <div className="Dropdown">
        <div className="Dropdown_Top">Category</div>
        
        <nav className="Dropdown_List">
            <Link to="/books/:webdevelopment">Web Development</Link>
            <Link to="/books/:hacking">Hacking</Link>
            <Link to="/books/:cybersecurity">Cyber Security</Link>
            <Link to="/books/:I.A">I.A</Link>
            <Link to="/books/:robotics">Robotics</Link>
            <Link to="/books/:datascience">Data science</Link>
        </nav>
    </div>
  )
}

export default Dropdown