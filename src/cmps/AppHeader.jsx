
import { NavLink } from "react-router-dom"
export function AppHeader() {

    return (
        <section className="header-container">
            <h1 className="logo">Toys Not <span className="flipped-f">F</span> Us</h1>
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/toy" >Toys</NavLink>
                <NavLink to="/dashboard" >Dashboard</NavLink>
                <NavLink to="/about" >About</NavLink>
            </nav>
        </section>
    )
}