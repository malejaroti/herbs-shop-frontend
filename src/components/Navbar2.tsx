import { Link as RouterLink, useNavigate } from 'react-router';
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
import appLogo from '../assets/julys-garten-logo.png'
import defaultAvatar from "../assets/default-avatar.jpg"
import { useAuth } from '../context/auth.context';
import { useEffect, useState } from 'react';
// import appLogo from '../assets/julys-garten-logo.svg'

type PageLink = {
    pageName: string
    path: string
}
const AdminPages : PageLink[] = [
    { pageName: 'Shop', path: '/shop' },
    { pageName: 'Products', path: '/admin/products' },
    { pageName: 'Orders', path: '/admin/orders' }
]
const CustomerPages : PageLink[] = [
    { pageName: 'Shop', path: '/shop' },
    { pageName: 'Über mich', path: '/about' },
    { pageName: 'Orders', path: '/admin/orders' }
]

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { authenticateUser, isLoggedIn, isAdmin, logout } = useAuth();
    const [pages, setPages] = useState<PageLink[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
      if(isLoggedIn && isAdmin){
          setPages(AdminPages)
      }else{
          setPages(CustomerPages)
      }
    }, [isAdmin])
    
    // const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(
    // (props, ref) => <RouterLink ref={ref} to="/" {...props} role={undefined} />,
    // );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const goToProfile = () => {
        handleCloseNavMenu()
        navigate('/profile')
    }
    const handleLogout = () => {
        handleCloseNavMenu()
        logout()
    }

    return (
        <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters sx={{display:'flex', justifyContent:'space-between'}}>
                {/* Logo */}
                <Box
                    component="img"
                    src={appLogo}
                    alt="July's Garten Logo"
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        height: 80, // ajusta el tamaño según el navbar
                        mr: 2,
                    }}
                />

                {/* Text for the website name in case the logo does not have the name already*/}
                {/* <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    LOGO
                </Typography> */}

            <Box sx={{ display: { xs: 'flex', md: 'none' }}}>
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
                sx={{ display: { xs: 'block', md: 'none' } }}
                >
                {pages.map((page) => (
                    <MenuItem key={page.pageName} onClick={handleCloseNavMenu}>
                        <Typography 
                            sx={{ textAlign: 'center' }}
                            component={RouterLink}
                            to={page.path}
                        >
                            {page.pageName}
                        </Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
                <Box
                    component="img"
                    src={appLogo}
                    alt="July's Garten Logo"
                    sx={{
                        display: { xs: 'flex', md: 'none' },
                        alignSelf: 'center',
                        height: 70,
                        mr: 2,
                    }}
                />
            {/* <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                July's Garten
            </Typography> */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:'space-evenly' }}>
                {pages.map((page) => (
                <Button
                    key={page.pageName}
                    component={RouterLink}
                    to={page.path}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page.pageName}
                </Button>
                ))}
            </Box>
            { isLoggedIn &&
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Avatar default image" src={defaultAvatar} />
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
                        <MenuItem onClick={goToProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            }
            </Toolbar>
        </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
