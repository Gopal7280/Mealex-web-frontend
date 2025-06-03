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
import { apiGet } from '../../services/api';
export function OwnerSideBar({ data }) {
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
    if(path=="profileCheck")
    {
    const fetchBussiness = async () => {
      const res = await apiGet('/businessprofile');
      console.log(res.length);
      if (res.length != 0) {
         navigate('/bussiness-profile');
      } else {
        navigate('/profile_form');
    };
  }
  fetchBussiness();
    }
    if (path!="profileCheck") {
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
            borderBottom: isActive('/products') ? '3px solid #3a5b76' : 'none',
            borderRadius: 0,
            px: 2,
          }}
          onClick={() => handleNavigate('/products')}
        >
          Products
        </Button>
        <Button
          sx={{
            color: 'black',
            borderBottom: isActive('/display') ? '3px solid #3a5b76' : 'none',
            borderRadius: 0,
            px: 2,
          }}
          onClick={() => handleNavigate('/display')}
        >
          Customer
        </Button>
        <Button
          sx={{
            color: 'black',
            borderBottom:
              isActive(`/invoices`) ||
              isActive(`/quotation`) ||
              isActive(`/deliverychallan-table`) ||
              isActive(`/inventory`) ||
              isActive(`/paymentIn`) ||
              anchorEl
                ? '3px solid #3a5b76'
                : 'none',
            borderRadius: 0,
            px: 2,
          }}
          onClick={handleSalesClick}
        >
          Sales ▼
        </Button>
        <Menu
          id="sales-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleSalesClose()}
        >
          <MenuItem onClick={() => handleSalesClose('/invoices')}>
            Invoices
          </MenuItem>
          <MenuItem onClick={() => handleSalesClose('/deliverychallan-table')}>
            Delivery Challan
          </MenuItem>
          <MenuItem onClick={() => handleSalesClose('/quotation')}>
            Quotation
          </MenuItem>
          <MenuItem onClick={() => handleSalesClose('/inventory')}>
            Inventory
          </MenuItem>
          <MenuItem onClick={() => handleSalesClose('/paymentIn')}>
            Payment In
          </MenuItem>
        </Menu>

        {/* purchase Form */}
        <Button
          sx={{
            color: 'black',
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
          <MenuItem onClick={() => handlePurchaseClose('/purchase-table')}>
            Purchase List
          </MenuItem>
          <MenuItem onClick={() => handlePurchaseClose('/purchaseForm')}>
            Purchase Form
          </MenuItem>
          <MenuItem onClick={() => handlePurchaseClose('/paymentOut')}>
            Payment Out
          </MenuItem>
        </Menu>

        {/* reports and expenditure */}

        <Button
          sx={{
            color: 'black',
            borderBottom:
              isActive(`/reports`) ||
              isActive(`/expenseManager`) ||
              reportsAndExpense
                ? '3px solid #3a5b76'
                : 'none',
            borderRadius: 0,
            px: 2,
          }}
          onClick={handleReportsAndExpenseClick}
        >
          Insights ▼
        </Button>
        <Menu
          id="insights-menu"
          anchorEl={reportsAndExpense}
          open={Boolean(reportsAndExpense)}
          onClose={() => handleReportsAndExpenseClose()}
        >
          <MenuItem onClick={() => handleReportsAndExpenseClose('/reports')}>
            Reports
          </MenuItem>
          <MenuItem
            onClick={() => handleReportsAndExpenseClose('/expenseManager')}
          >
            Expense Manager
          </MenuItem>
        </Menu>

        {/* 
                Settings
                */}
        <Button
          sx={{
            color: 'black',
            borderBottom:
              (isActive(`/settings/invoice`) || isActive(`/settings/challan`) || isActive(`/users`) || isActive(`/settings/bankAccountSetting`)) || settingShow
                ? '3px solid #3a5b76'
                : 'none',
            borderRadius: 0,
            px: 2,
          }}
          onClick={handleSettingClick}
        >
          Settings ▼
        </Button>
        <Menu
          id="setting-menu"
          anchorEl={settingShow}
          open={Boolean(settingShow)}
          onClose={() => handleSettingClose()}
        >
          <MenuItem onClick={() => handleSettingClose('/settings/invoice')}>
            Invoice Setting
          </MenuItem>
          <MenuItem onClick={() => handleSettingClose('/settings/challan')}>
            Challan Setting 
          </MenuItem>
          <MenuItem
            onClick={() => handleSettingClose('/settings/bankAccountSetting')}
          >
            Bank Account Setting
          </MenuItem>
          <MenuItem onClick={() => handleSettingClose('/users')}>
            Users Acess
          </MenuItem>
          <MenuItem onClick={() => handleSettingClose('profileCheck')}>
            Update Business Profile
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
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleNavigate('/products')}
            selected={isActive('/products')}
          >
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleNavigate('/display')}
            selected={isActive('/display')}
          >
            <ListItemText primary="Customer" />
          </ListItem>
          <ListItem button onClick={() => handleListShow('sales')}>
            <ListItemText primary="Sales" />
            {salesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={salesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/invoices')}
                selected={isActive('/invoices')}
              >
                <ListItemText primary="Invoices" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/deliveryChallan-table')}
                selected={isActive('/deliveryChallan-table')}
              >
                <ListItemText primary="Delivery Challan" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/quotation')}
                selected={isActive('/quotation')}
              >
                <ListItemText primary="Quotation" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/inventory')}
                selected={isActive('/inventory')}
              >
                <ListItemText primary="Inventory" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/paymentIn')}
                selected={isActive('/paymentIn')}
              >
                <ListItemText primary="Payment In" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={() => handleListShow('purchase')}>
            <ListItemText primary="Purchase" />
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
                <ListItemText primary="Purchase List" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/purchaseForm')}
                selected={isActive('/purchaseForm')}
              >
                <ListItemText primary="Purchase Form" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/paymentOut')}
                selected={isActive('/paymentOut')}
              >
                <ListItemText primary="Payment Out" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={() => handleListShow('reportsAndExpense')}>
            <ListItemText primary="Insights" />
            {reportsAndExpenseOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={reportsAndExpenseOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/reports')}
                selected={isActive('/reports')}
              >
                <ListItemText primary="Reports" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/expenseManager')}
                selected={isActive('/expenseManager')}
              >
                <ListItemText primary="Expense Manager" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={() => handleListShow('settings')}>
            <ListItemText primary="Settings" />
            {settingsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/settings')}
                selected={isActive('/settings')}
              >
                <ListItemText primary="Prefix" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Box
          sx={{
            display: 'absolute',
            marginTop: '32vh',
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
