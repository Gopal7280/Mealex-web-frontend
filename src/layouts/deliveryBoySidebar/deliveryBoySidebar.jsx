import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';
export function DeliveryBoySidebar({ data }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [purchaseShow, setPurchaseShow] = useState(null);
  const [settingShow, setSettingShow] = useState(null);
  const [reportsAndExpense, setReportsAndExpense] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [reportsAndExpenseOpen, setReportsAndExpenseOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleNavigate = path => {
    setDrawerOpen(false); // Close the drawer when navigating
    navigate(path);
  };

  const handleSalesClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleSettingClick = event => {
    setSettingShow(event.currentTarget);
  };
  const handleReportsAndExpenseClick = event => {
    setReportsAndExpense(event.currentTarget);
  };

  const handleSalesClose = path => {
    setAnchorEl(null);
    if (path) {
      handleNavigate(path);
    }
  };
  const handleSettingClose = path => {
    setSettingShow(null);
    if (path) {
      handleNavigate(path);
    }
  };
  const handlePurchaseClose = path => {
    setPurchaseShow(null);
    if (path) {
      handleNavigate(path);
    }
  };
  const handleReportsAndExpenseClose = path => {
    setReportsAndExpense(null);
    if (path) {
      handleNavigate(path);
    }
  };
  const handlePurchaseClick = event => {
    setPurchaseShow(event.currentTarget);
  };

  const isActive = path => location.pathname === path;
  const handleListShow = data => {
    if (data == 'sales') {
      setSalesOpen(!salesOpen);
      setPurchaseOpen(false);
      setReportsAndExpenseOpen(false);
      setSettingsOpen(false);
    }
    if (data == 'purchase') {
      setSalesOpen(false);
      setPurchaseOpen(!purchaseOpen);
      setReportsAndExpenseOpen(false);
      setSettingsOpen(false);
    }
    if (data == 'reportsAndExpense') {
      setSalesOpen(false);
      setPurchaseOpen(false);
      setReportsAndExpenseOpen(!reportsAndExpenseOpen);
      setSettingsOpen(false);
    }
    if (data == 'settings') {
      setSalesOpen(false);
      setPurchaseOpen(false);
      setReportsAndExpenseOpen(false);
      setSettingsOpen(!settingsOpen);
    }
  };
  function handleLogout(e) {
    {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('mkddr');
      navigate('/login');
      window.location.reload();
    }
  }
  return (
    <>
      {/* Desktop Navigation */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: 2,
          p: 2,
          borderBottom: '1px solid #ddd',
        }}
      >
        <Button
          sx={{
            color: 'black',
            borderBottom: isActive('/dashboard') ? '3px solid #3a5b76' : 'none',
            borderRadius: 0,
            px: 2,
          }}
          onClick={() => handleNavigate('/dashboard')}
        >
          Dashboard
        </Button>
        <Button
          sx={{
            color: 'black',
            borderBottom: isActive('/deliveryChallan-table')
              ? '3px solid #3a5b76'
              : 'none',
            borderRadius: 0,
            px: 2,
          }}
          onClick={() => handleNavigate('/deliveryChallan-table')}
        >
          Delivery Challan
        </Button>
      </Box>

      {/* Mobile Navigation */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, p: 2 }}>
        <IconButton aria-label="menu" onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '40%', sm: '30%', md: '30%' }, // Width adjustment for different screen sizes
          },
        }}
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid #ddd',
          }}
        >
          <Typography variant="h6">
            {data.length ? (
              <div>
                {data[0].vendor_logo != null ? (
                  <img
                    src={data[0].vendor_logo}
                    className="rounded-[10px]"
                    width="50px"
                    height="50px"
                    alt=""
                  />
                ) : (
                  <h1>{data[0].vendor_business_legal_name.toUpperCase()}</h1>
                )}
              </div>
            ) : (
              <></>
            )}
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List className="">
          <ListItem
            button
            onClick={() => handleNavigate('/dashboard')}
            selected={isActive('/dashboard')}
          >
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleNavigate('/deliveryChallan-table')}
            selected={isActive('/deliveryChallan-table')}
          >
            <ListItemText primary="Delivery Challan" />
          </ListItem>
        </List>
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid #ddd',
          }}
        >
          {/* <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={e => {
              // Add your logout logic here
              handleLogout(e);
            }}
          >
            Logout
          </Button> */}
        </Box>
      </Drawer>
    </>
  );
}
