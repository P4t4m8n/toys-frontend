
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Trans } from 'react-i18next';
import { i18Service } from "../services/toy.service";
import i18n from "i18next";
import { useState } from "react";
import { logout } from "../store/actions/user.actions";
import { useSelector } from "react-redux";
import { UserManager } from "./UserManger";


export function AppHeader() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)
    const navigate = useNavigate()
    const lngs = i18Service.getLanguages()
    const [test, setTest] = useState(false)

    function onLogout() {
        logout()
            .then(() => {
                console.log('Logout')
            })
            .catch((err) => {
                console.log("err:", err)
            })
    }

    return (
        <section className="header-container">
            <h1 className="logo">Toys Not <span className="flipped-f">F</span> Us</h1>
            <div className="language-container">
                {Object.keys(lngs).map((lng) => (
                    <button
                        // className="language-button"
                        key={lng}
                        className={`language-button ${i18n.resolvedLanguage === lng ? 'selected' : ''}`}

                        // style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
                        type="submit"
                        onClick={() => {
                            i18n.changeLanguage(lng)
                            setTest(prevTest => !prevTest)

                        }
                        }>
                        {lngs[lng].nativeName}
                    </button>
                ))}
            </div>
            <nav className="app-nav">
                <NavLink to="/" ><Trans i18nKey={"header.Home"}>Home</Trans></NavLink>
                <NavLink to="/toy" ><Trans i18nKey={"header.Toys"}>Toys</Trans></NavLink>
                <NavLink to="/dashboard" ><Trans i18nKey={"header.Dashboard"}>Dashboard</Trans></NavLink>
                <NavLink to="/about" ><Trans i18nKey={"header.About"}>About</Trans></NavLink>
            </nav>

            {user ? (
                <section>
                    <div className="todo-done"></div>
                    <Link to={`user/${user._id}`}>Hello {user.username}</Link>
                    <button onClick={onLogout}>Logout</button>
                </section>
            ) : (
                <section>
                    <UserManager></UserManager>
                </section>
            )}
        </section>
    )
}