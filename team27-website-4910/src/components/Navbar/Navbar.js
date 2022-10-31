import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TruckIcon from '../../logos/Trukbux.svg';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material';
import { useRecoilState } from 'recoil';
import {
    userType,
    userName,
    userFName,
    userLName,
    userEmail,
} from '../../recoil_atoms';

const pages = [{ 'label': 'Catalog', 'path': '/catalog' }, { 'label': 'Drivers', 'path': '/drivers' }, { 'label': 'Sponsors', 'path': '/sponsors' }]

export default function Navbar(props) {
    const theme = useTheme();

    const getNotifications = /*async*/ () => {
        //fetch requests
        setGotNotifications(true);
        setUserNotifications([
            { 'message': 'Message!' },
            { 'message': 'Second!' },
            { 'message': 'Your password was changed!' },
        ])
    }

    React.useEffect(() => {
        if (!gotNotifications) {
            getNotifications();
        }
    }, [gotNotifications])

    const setParentColor = () => {
        const mode = theme.palette.mode === 'dark' ? 'light' : 'dark';
        props.setPageTheme(mode);
    }

    const [sessionState, setSessionState] = useRecoilState(userType);
    const [usernameState, setUsernameState] = useRecoilState(userName);
    const [firstnameState, setFirstnameState] = useRecoilState(userFName);
    const [lastnameState, setLastnameState] = useRecoilState(userLName);
    const [emailState, setEmailState] = useRecoilState(userEmail);

    const settings = [
        { 'text': 'Sign In', 'path': '/login' },
        { 'text': 'Log Out', 'path': '/', 'onClick': () => setSessionState('0') },
        { 'text': 'Register', 'path': '/register' },
        { 'text': 'Profile', 'path': '/profile' },
        { 'text': 'Account Management', 'path': '/AccountManagement' },
        { 'text': 'Point Management', 'path': '/PointManagement' },
    ];

    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const homeRedirect = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const redirect = (e, path) => {
        e.preventDefault();
        handleCloseNavMenu(null);
        navigate(path);
    };

    const filterSettings = (a) => {
        const loggedOutFilter = ['Log Out', 'Profile', 'Account Management', 'Point Management',];
        const signedInFilter = ['Sign In', 'Register',];
        if (sessionState === '0') {
            return !(loggedOutFilter.includes(a.text));
        }
        else {
            return !(signedInFilter.includes(a.text));
        }
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <a onClick={homeRedirect}><img className='logo' src={TruckIcon} /></a>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.label} onClick={(e) => { redirect(e, page.path) }}>
                                    <Typography textAlign="center">{page.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.label}
                                onClick={(e) => { redirect(e, page.path) }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User Avatar" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.filter(filterSettings).map((setting) => (
                                <MenuItem
                                    key={setting.text}
                                    onClick={(e) => {
                                        redirect(e, setting.path);
                                        setting.onClick?.();
                                    }}
                                >
                                    <Typography textAlign="center">{setting.text}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ p: 2, flexGrow: 0 }}>
                        {sessionState !== '0' && <Typography>{usernameState}</Typography>}
                    </Box>

                    <Box sx={{ p: 2, flexGrow: 0 }}>
                        {sessionState !== '0' && <NotificationBell notifications={userNotifications} setUserNotifications={setUserNotifications} />}
                    </Box>
                    <IconButton sx={{ ml: 1 }} onClick={setParentColor} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};