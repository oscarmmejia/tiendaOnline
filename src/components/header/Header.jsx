import { NavLink } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/routePaths'
import Weather from '../weather/Weather.jsx'
import logoOkyDoky from '../../assets/img/header/okydokyLogo.png'
import './Header.css'

const navigationLinks = [
  { id: 'inicio', label: 'INICIO', to: ROUTE_PATHS.home },
  { id: 'productos', label: 'PRODUCTOS', to: ROUTE_PATHS.products },
  { id: 'nuestraHistoria', label: 'NUESTRA HISTORIA', to: ROUTE_PATHS.ourStory },
  { id: 'usuarios', label: 'USUARIOS', to: ROUTE_PATHS.users },
  { id: 'equipo', label: 'EQUIPO', to: ROUTE_PATHS.team },
]

const buildNavLinkClass = ({ isActive }) =>
  isActive ? 'headerNavLink headerNavLinkActive' : 'headerNavLink'

const Header = () => {
  return (
    <header className="header">
      <NavLink className="headerLogo" to={ROUTE_PATHS.home}>
        <img src={logoOkyDoky} alt="OKYDOKY" className="headerLogoImage" />
      </NavLink>

      <nav className="headerNav">
        <ul className="headerNavList">
          {navigationLinks.map(({ id, label, to }) => (
            <li key={id} className="headerNavItem">
              <NavLink to={to} className={buildNavLinkClass} end>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="headerActions">
        <Weather />
      </div>
    </header>
  )
}

export default Header
