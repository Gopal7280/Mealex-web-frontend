// stockManager.jsx
// This file contains the StockManagerSidebar component which is used for navigation in the Stock Manager application.

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
export function StockManagerSidebar({ data }) {
  const navigate = useNavigate(); // Use the useNavigate hook to programmatically navigate
  const location = useLocation(); // Get the current location to determine active links
  const [anchorEl, setAnchorEl] = useState(null); // State for the sales menu anchor element
  const [purchaseShow, setPurchaseShow] = useState(null); // State for the purchase menu anchor element
  const [settingShow, setSettingShow] = useState(null); // State for the settings menu anchor element
  const [reportsAndExpense, setReportsAndExpense] = useState(null); // State for the reports and expense menu anchor element
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control the drawer open/close state
  const [salesOpen, setSalesOpen] = useState(false); // State to control the sales menu open/close state
  const [purchaseOpen, setPurchaseOpen] = useState(false); // State to control the purchase menu open/close state
  const [reportsAndExpenseOpen, setReportsAndExpenseOpen] = useState(false); // State to control the reports and expense menu open/close state
  const [settingsOpen, setSettingsOpen] = useState(false); // State to control the settings menu open/close state

  // Function to handle navigation when a menu item is clicked
  // This function closes the drawer and navigates to the specified path
  const handleNavigate = path => {
    setDrawerOpen(false); // Close the drawer when navigating
    navigate(path);
  };

  // Functions to handle clicks on different menu items
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

  // Function to check if a given path is active
  // This function compares the current location's pathname with the provided path
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
  // Function to handle logout
  // This function removes the authentication token and other related data from localStorage
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
            color: '#3A5B7A',
            borderBottom: isActive('/dashboard') ? '3px solid #3a5b76' : 'none',
            borderRadius: 0,
            fontWeight: 'bold',
            px: 2,
          }}
          onClick={() => handleNavigate('/dashboard')}
        >
          Dashboard
        </Button>
        <Button
          sx={{
            color: '#3A5B7A',
            borderBottom: isActive('/products') ? '3px solid #3a5b76' : 'none',
            borderRadius: 0,
            px: 2,
            fontWeight: 'bold',
          }}
          onClick={() => handleNavigate('/products')}
        >
          Products
        </Button>
        <Button
          sx={{
            color: '#3A5B7A',
            borderBottom: isActive('/inventory') ? '3px solid #3a5b76' : 'none',
            borderRadius: 0,
            px: 2,
            fontWeight: 'bold',
          }}
          onClick={() => handleNavigate('/inventory')}
        >
          Inventory
        </Button>

        {/* purchase Form */}
        <Button
          sx={{
            color: '#3A5B76',
            fontWeight: 'bold',
            borderBottom:
              isActive(`/purchase-table`) ||
              isActive(`/purchaseForm`) ||
              isActive(`/paymentOut`) ||
              purchaseShow
                ? '3px solid #3a5b76'
                : 'none',
            borderRadius: 0,
            px: 2,
          }}
          onClick={handlePurchaseClick}
        >
          Purchase ▼
        </Button>
        <Menu
          id="purchase-menu"
          anchorEl={purchaseShow}
          open={Boolean(purchaseShow)}
          onClose={() => handlePurchaseClose()}
        >
          <MenuItem
            className="!text-[#3A5B76] !font-bold"
            onClick={() => handlePurchaseClose('/purchase-table')}
          >
            Purchase List
          </MenuItem>
          <MenuItem
            className="!text-[#3A5B76] !font-bold"
            onClick={() => handlePurchaseClose('/purchaseForm')}
          >
            Purchase Form
          </MenuItem>
        </Menu>
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
            width: { xs: '50%', sm: '30%', md: '30%' }, // Width adjustment for different screen sizes
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
            <ListItemText
              className="!text-[#3A5B76]"
              primary={
                <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                  Dashboard
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            button
            onClick={() => handleNavigate('/products')}
            selected={isActive('/products')}
          >
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                  Products
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            button
            onClick={() => handleNavigate('/inventory')}
            selected={isActive('/inventory')}
          >
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                  Inventory
                </Typography>
              }
            />
          </ListItem>
          <ListItem button onClick={() => handleListShow('purchase')}>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                  Purchase
                </Typography>
              }
            />
            {purchaseOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={purchaseOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/purchase-table')}
                selected={isActive('/purchase-table')}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                      Purchase List
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/purchaseForm')}
                selected={isActive('/purchaseForm')}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                      Purchase Form
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Box
          sx={{
            display: 'absolute',
            marginTop: '3vh',
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
