import { NavLink } from "react-router-dom"
export function AppHeader() {


    return (
        <section className="header-container">
        <h1>Mister Toy</h1>
        <nav className="app-nav">
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/toy" >Toys</NavLink>
        </nav>
    </section>
    )
}