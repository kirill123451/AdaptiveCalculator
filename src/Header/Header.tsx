import {Link} from "react-router-dom"
import './Header.css'

export default function Header () {


    return (
        <div className="nav-container">
      <Link to='/' className="nav-link">
        <span>Калькулятор</span>
      </Link>
      <Link to='/table' className="nav-link">
        <span>Таблица</span>
      </Link>
      <Link to='/profile' className="nav-link">
        <span>Профиль</span>
      </Link>
        </div>
    )
}