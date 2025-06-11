// OwnerSideBar.jsx
// This component is designed to be used in a React application with React Router for navigation.
// It provides a sidebar navigation menu for an owner or admin user, allowing them to navigate through different sections of the application such as Dashboard, Products, Sales, Purchase, Reports, and Settings.
// It also includes a responsive design that adapts to both desktop and mobile views, using Material-UI components for styling and layout.
// Import necessary libraries and components
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
  const navigate = useNavigate(); // This is used to programmatically navigate to different routes in the application.
  const location = useLocation(); // This hook gives access to the current location object, which contains information about the current URL
  const [anchorEl, setAnchorEl] = useState(null); // This state is used to manage the anchor element for the sales dropdown menu
  const [purchaseShow, setPurchaseShow] = useState(null); // This state is used to manage the anchor element for the purchase dropdown men
  const [settingShow, setSettingShow] = useState(null); // This state is used to manage the anchor element for the settings dropdown men
  const [reportsAndExpense, setReportsAndExpense] = useState(null); // This state is used to manage the anchor element for the reports and expense dropdown menu
  const [drawerOpen, setDrawerOpen] = useState(false); // This state is used to manage the open/close state of the sidebar drawer
  const [salesOpen, setSalesOpen] = useState(false); // This state is used to manage the open/close state of the sales dropdown menu
  const [purchaseOpen, setPurchaseOpen] = useState(false); // This state is used to manage the open/close state of the purchase dropdown menu
  const [reportsAndExpenseOpen, setReportsAndExpenseOpen] = useState(false); // This state is used to manage the open/close state of the reports and expense dropdown menu
  const [settingsOpen, setSettingsOpen] = useState(false);  // This state is used to manage the open/close state of the settings dropdown menu

  // Function to handle navigation when a menu item is clicked
  const handleNavigate = path => {
    setDrawerOpen(false); // Close the drawer when navigating
    if (path == 'profileCheck') {
      const fetchBussiness = async () => {
        const res = await apiGet('/businessprofile');
        console.log(res.length);
        if (res.length != 0) {
          navigate('/bussiness-profile');
        } else {
          navigate('/profile_form');
        }
      };
      fetchBussiness();
    }
    if (path != 'profileCheck') {
      navigate(path);
    }
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
    if (path == 'profileCheck') {
      const fetchBussiness = async () => {
        const res = await apiGet('/businessprofile');
        console.log(res.length);
        if (res.length != 0) {
          navigate('/bussiness-profile');
        } else {
          navigate('/profile_form');
        }
      };
      fetchBussiness();
    }
    if (path != 'profileCheck') {
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
  // Function to handle logout
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
            borderBottom: isActive('/display') ? '3px solid #3a5b76' : 'none',
            borderRadius: 0,
            px: 2,
            fontWeight: 'bold',
          }}
          onClick={() => handleNavigate('/display')}
        >
          Customer
        </Button>
        <Button
          sx={{
            color: '#3A5B7A',
            fontWeight: 'bold',
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
          <MenuItem
            className="!text-[#3A5B76] !font-bold"
            onClick={() => handleSalesClose('/invoices')}
          >
            Invoices
          </MenuItem>
          <MenuItem
            className="!text-[#3A5B76] !font-bold"
            onClick={() => handleSalesClose('/deliverychallan-table')}
          >
            Delivery Challan
          </MenuItem>
          <MenuItem
            className="!text-[#3A5B76] !font-bold"
            onClick={() => handleSalesClose('/quotation')}
          >
            Quotation
          </MenuItem>
          <MenuItem
            className="!text-[#3A5B76] !font-bold"
            onClick={() => handleSalesClose('/inventory')}
          >
            Inventory
          </MenuItem>
          <MenuItem
            className="!text-[#3A5B76] !font-bold"
            onClick={() => handleSalesClose('/paymentIn')}
          >
            Payment In
          </MenuItem>
        </Menu>

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
          <MenuItem
            className="!text-[#3A5B76] !font-bold"
            onClick={() => handlePurchaseClose('/paymentOut')}
          >
            Payment Out
          </MenuItem>
        </Menu>

        {/* reports and expenditure */}

        <Button
          sx={{
            color: '#3A5B76',
            fontWeight: 'bold',
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
          <MenuItem
            className="!text-[#3A5B76] !font-bold"
            onClick={() => handleReportsAndExpenseClose('/reports')}
          >
            Reports
          </MenuItem>
          <MenuItem
            className="!text-[#3A5B76] !font-bold"
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
            color: '#3A5B76',
            fontWeight: 'bold',
            borderBottom:
              isActive(`/settings/invoice`) ||
              isActive(`/settings/challan`) ||
              isActive(`/users`) ||
              isActive(`/settings/bankAccountSetting`) ||
              settingShow
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
          <MenuItem
            className="!text-[#3A5B76] !font-bold"
            onClick={() => handleSettingClose('/settings/invoice')}
          >
            Invoice Setting
          </MenuItem>
          <MenuItem
            className="!text-[#3A5B76] !font-bold"
            onClick={() => handleSettingClose('/settings/challan')}
          >
            Challan Setting
          </MenuItem>
          <MenuItem
            className="!text-[#3A5B76] !font-bold"
            onClick={() => handleSettingClose('/settings/bankAccountSetting')}
          >
            Bank Account Setting
          </MenuItem>
          <MenuItem
            className="!text-[#3A5B76] !font-bold"
            onClick={() => handleSettingClose('/users')}
          >
            Users Acess
          </MenuItem>
          <MenuItem
            className="!text-[#3A5B76] !font-bold"
            onClick={() => handleSettingClose('profileCheck')}
          >
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
            onClick={() => handleNavigate('/display')}
            selected={isActive('/display')}
          >
            <ListItemText
              p
              primary={
                <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                  Customer
                </Typography>
              }
            />
          </ListItem>
          <ListItem button onClick={() => handleListShow('sales')}>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                  Sales
                </Typography>
              }
            />
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
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                      Invoices
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/deliveryChallan-table')}
                selected={isActive('/deliveryChallan-table')}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                      Delivery Challan
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/quotation')}
                selected={isActive('/quotation')}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                      Quotation
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
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
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/paymentIn')}
                selected={isActive('/paymentIn')}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                      Payment In
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Collapse>
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
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/paymentOut')}
                selected={isActive('/paymentOut')}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                      Payment Out
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={() => handleListShow('reportsAndExpense')}>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                  Insights
                </Typography>
              }
            />
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
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                      Reports
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/expenseManager')}
                selected={isActive('/expenseManager')}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                      Expense Manager
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={() => handleListShow('settings')}>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                  Settings
                </Typography>
              }
            />
            {settingsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/settings/invoice')}
                selected={isActive('/settings/invoice')}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                      Invoice settings
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/settings/challan')}
                selected={isActive('/settings/challan')}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                      Challan settings
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/settings/bankAccountSetting')}
                selected={isActive('/settings/bankAccountSetting')}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                      Bank Account settings
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('/users')}
                selected={isActive('/users')}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                      Users Acess
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleNavigate('profileCheck')}
                selected={isActive('/profile_form')}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold', color: '#3A5B76' }}>
                      Update Business Profile
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
