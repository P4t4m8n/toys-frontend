
import { NavLink } from "react-router-dom"
import { useTranslation, Trans } from 'react-i18next';
import { i18Service, toyService } from "../services/toy.service";
import i18n from "i18next";
import { useState } from "react";


export function AppHeader() {
    const lngs = i18Service.getLanguages()
    const [test, setTest] = useState(false)

    return (
        <section className="header-container">
            <h1 className="logo">Toys Not <span className="flipped-f">F</span> Us</h1>
            <div>
                {Object.keys(lngs).map((lng) => (
                    <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => {
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
        </section>
    )
}