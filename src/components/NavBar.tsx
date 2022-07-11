import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/pedidos">Pedidos</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default NavBar