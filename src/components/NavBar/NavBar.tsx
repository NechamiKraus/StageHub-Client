import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Link, Navigate, useNavigate } from 'react-router-dom'; // Import Link
import logo from '../../assets/לוגו (2).png';
import { Container } from '@mui/material';
import { Role } from '../../enums/role';
import LogoutIcon from '@mui/icons-material/Logout';

const loginOptions = [
  'שחקן',
  'מאמן',
  'ספק',
  'מנהל',
  'מפיק',
];
const userMenu = [
  'לאיזור האישי',
  'ליציאה',
]

function ResponsiveAppBar({ userName, onLogout, pages }) {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

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

  const navigateToSignin = (loginOption: string) => {
    let role: any;
    switch (loginOption) {
      case "מאמן":
        role = Role.Coach;
        break;
      case "ספק":
        role = Role.Provider;
        break;
      case "מפיק":
        role = Role.Director;
        break;
      case "שחקן":
        role = Role.Actor;
        break;
      case "מנהל":
        role = Role.Manager;
        break;
    }
    setAnchorElUser(null) // סוגר את חלונית הכניסה
    navigate(`/signin/${Role[role]}`);

  };
  const navigateToPersonalArea = (userMenuOpt: string) => {

    console.log(userMenuOpt);
    if (userMenuOpt == 'ליציאה')
      onLogout()
    else
    navigate(`${localStorage.getItem("userRole")}`)

  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{
        backgroundColor: 'black',
        color: 'white',
      }}>
        <Toolbar disableGutters>
          <a href="/">
            <Box
              component="img"
              src={logo}
              alt="description"
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: 1,
                width: '120px',
                height: 'auto',
              }}
            />
          </a>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              {/* {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={page.path}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0.05 }}>
            <Typography variant="p">
              {userName ? `🤗 שלום ${userName}` : "שלום אורח"} {/* מציג את השם אם יש, אחרת "אורח" */}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="כניסה">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
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
              {localStorage.getItem("id") ? (
                userMenu.map((userMenuOpt) => (
                  <MenuItem key={userMenuOpt} onClick={() => navigateToPersonalArea(userMenuOpt)}>
                    <Typography sx={{ textAlign: 'center' }}>{userMenuOpt}</Typography>
                  </MenuItem>
                ))
              ) : (
                loginOptions.map((loginOption) => (
                  <MenuItem key={loginOption} onClick={() => navigateToSignin(loginOption)}>
                    <Typography sx={{ textAlign: 'center' }}>{`כניסה כ${loginOption}`}</Typography>
                  </MenuItem>
                ))
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container >
    </AppBar >
  );
}

export default ResponsiveAppBar;
