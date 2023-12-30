
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Trans } from 'react-i18next';
import { i18Service } from "../services/toy.service";
import i18n from "i18next";
import { useState } from "react";
import { logout } from "../store/actions/user.actions";
import { useSelector } from "react-redux";
import { UserManager } from "./UserManger";
import { Dropdown } from "@mui/joy"
import { MenuButton } from "@mui/base";
import IconButton from '@mui/joy/IconButton';
import { Apps } from "@mui/icons-material";
import Avatar from '@mui/joy/Avatar';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { SignIn } from "./SignIn";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';



export function AppHeader() {
    const user = useSelector(storeState => storeState.userMoudle.userObj)
    const navigate = useNavigate()
    const lngs = i18Service.getLanguages()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    function onLogout(ev) {

        logout()
            .then(() => {
                console.log('Logout')
                navigate('/')
            })
            .catch((err) => {
                console.log("err:", err)
            })
    }



    const itemStyle = {
        borderRadius: "0",
        backgroundColor: 'inherit '
    }

    const loginStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }




    return (
        <section className="header-container">

            <Dropdown>
                <MenuButton
                    slots={{ root: IconButton }}
                    slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                    sx={{ borderRadius: 40 }}
                >
                    <Apps />
                </MenuButton>
                <Menu
                    variant="soft"
                    invertedColors
                    aria-labelledby="apps-menu-demo"
                    sx={{
                        '--List-padding': '0.5rem',
                        '--ListItemDecorator-size': '3rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(1, 3rem)',
                        gridAutoRows: '100px',
                        gap: 1,
                        backgroundColor: 'inherit',
                    }}
                >
                    <MenuItem
                        orientation="vertical">

                        <NavLink to="/" >
                            <ListItemDecorator >
                                <Avatar style={itemStyle} src="src\assets\img\homne.svg" />
                            </ListItemDecorator>
                            <Trans i18nKey={"header.Home"}>Home</Trans>
                        </NavLink>
                    </MenuItem>
                    <MenuItem orientation="vertical">
                        <NavLink to="/toy" >
                            <ListItemDecorator>
                                <Avatar style={itemStyle} src="src\assets\img\toys2.svg" />
                            </ListItemDecorator>
                            <Trans i18nKey={"header.Toys"}>Toys</Trans>

                        </NavLink>
                    </MenuItem>
                    <MenuItem orientation="vertical">
                        <NavLink to="/about" >
                            <ListItemDecorator>
                                <Avatar style={itemStyle} src="src\assets\img\about.svg" />
                            </ListItemDecorator>
                            <Trans i18nKey={"header.About"}>About</Trans>
                        </NavLink>
                    </MenuItem>
                    {user && user.isAdmin &&
                        <MenuItem orientation="vertical">
                            <ListItemDecorator>
                                <Avatar style={itemStyle} src="src\assets\img\chart.svg" />
                                <NavLink to="/dashboard" ><Trans i18nKey={"header.Dashboard"}>Dashboard</Trans></NavLink>
                            </ListItemDecorator>
                        </MenuItem>
                    }
                    <MenuItem orientation="vertical">
                        <ListItemDecorator>

                        </ListItemDecorator>
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

                                    }
                                    }>
                                    {lngs[lng].nativeName}
                                </button>
                            ))}
                        </div>
                    </MenuItem>
                </Menu>
            </Dropdown>

            <h1 className="logo">Toys Not <span className="flipped-f">F</span> Us</h1>


            {user ? (
                <section>
                    <Link to={`user/${user._id}`}>Hello {user.username}</Link>
                    <button onClick={onLogout}>Logout</button>
                </section>
            ) : (
                <section>
                    {/* <UserManager></UserManager> */}
                    <div>
                        <Button style={{ color: "white" }} onClick={handleOpen}>Login</Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                                backdrop: {
                                    timeout: 500,
                                },
                            }}
                        >
                            <Fade in={open}>
                                <Box sx={loginStyle}>
                                    <SignIn></SignIn>

                                </Box>
                            </Fade>
                        </Modal>
                    </div>
                </section>
            )}

        </section>

    )

}



