import { NavLink } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/routePaths'
import Weather from '../weather/Weather.jsx'
import logoOkyDoky from '../../img/header/okydokyLogo.png'
import './Header.css'

const navigationLinks = [
  { id: 'inicio', label: 'INICIO', to: ROUTE_PATHS.home },
  { id: 'productos', label: 'PRODUCTOS', to: ROUTE_PATHS.products },
  { id: 'nuestraHistoria', label: 'NUESTRA HISTORIA', to: ROUTE_PATHS.ourStory },
  { id: 'usuarios', label: 'USUARIOS', to: ROUTE_PATHS.users },
  { id: 'equipo', label: 'EQUIPO', to: ROUTE_PATHS.team },
]

const buildNavLinkClass = ({ isActive }) =>
  isActive ? 'header__navLink header__navLinkActive' : 'header__navLink'

const Header = () => {
  return (
    <header className="header">
      <NavLink className="header__logo" to={ROUTE_PATHS.home}>
        <img src={logoOkyDoky} alt="OKYDOKY" className="header__logoImage" />
      </NavLink>

      <nav className="header__nav">
        <ul className="header__navList">
          {navigationLinks.map(({ id, label, to }) => (
            <li key={id} className="header__navItem">
              <NavLink to={to} className={buildNavLinkClass} end>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header__actions">
        <Weather />
      </div>
    </header>
  )
}

export default Header
