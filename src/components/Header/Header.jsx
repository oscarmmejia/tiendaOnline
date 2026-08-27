import logoOkyDoky from '../../img/header/okydokyLogo.png'
import './Header.css'

const navigationLinks = [
  { id: 'inicio', label: 'INICIO', href: '#inicio' },
  { id: 'productos', label: 'PRODUCTOS', href: '#productos' },
  { id: 'nuestraHistoria', label: 'NUESTRA HISTORIA', href: '#nuestra-historia' },
  { id: 'usuarios', label: 'USUARIOS', href: '#usuarios' },
  { id: 'vendedores', label: 'VENDEDORES', href: '#vendedores' },
]

const Header = () => {
  return (
    <header className="header">
      <a className="header__logo" href="#inicio">
        <img src={logoOkyDoky} alt="OKYDOKY" className="header__logoImage" />
      </a>

      <nav className="header__nav">
        <ul className="header__navList">
          {navigationLinks.map(({ id, label, href }) => (
            <li key={id} className="header__navItem">
              <a href={href} className="header__navLink">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header__actions" />
    </header>
  )
}

export default Header
