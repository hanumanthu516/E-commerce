import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import shoppingBag from "../../assets/shoppingBag.gif";
import { getAllProducts } from "../../services/Product";
import { setIsUserLoggedIn } from "../../redux/reducers/AuthSlice";
import { Button } from "react-bootstrap";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
const Header = () => {
  const { productList } = useSelector((state) => state.products);
  const { isUserLoggedIn } = useSelector((state) => state.login);
  const location = useLocation();

  const dispatch = useDispatch();
  const history = useNavigate();

  const [product, setProduct] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleServicesClick = (event) => {
    setProduct(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setProduct(null);
  };

  const handleProductClick = (id) => {
    handlePopoverClose();
    history(`/products/${id}`);
  };

  const handleLogAction = () => {
    if (isUserLoggedIn) {
      setOpenLogoutDialog(true);
    } else {
      history("/login");
    }
  };

  const handleLogoutConfirm = () => {
    toast.success("Logged out successfully");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    dispatch(setIsUserLoggedIn(false));
    history("/");
    setOpenLogoutDialog(false);
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleProfile = () => {
    if (isUserLoggedIn) {
      history("/profile");
    } else {
      toast.error("Please Login");
      history("/login");
    }
  };

  return (
    <header className="text-bg-secondary text-white acy p-1 d-flex justify-content-between align-items-center">
      <section>
        <img src={shoppingBag} alt="Buying Icon" />
      </section>
      <div className="d-flex align-items-center justify-content-center">
        <input
          type="text"
          className="form-control"
          style={{ maxWidth: "300px" }}
          placeholder="Enter text here"
        />
      </div>

      <section>
        <List className="d-flex ">
          <ListItemButton
            className={location.pathname === "/" ? "text-blue" : ""}
            onClick={() => history("/")}
          >
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton onClick={handleServicesClick}>
            <ListItemText primary="Services" />
            {product ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <ListItemButton onClick={handleLogAction}>
            <ListItemText primary={`${isUserLoggedIn ? "Logout" : "Login"}`} />
          </ListItemButton>
          <ListItemButton onClick={() => history("/cart")}>
            <ListItemIcon sx={{ minWidth: 30 }}>
              <ShoppingCartOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItemButton>
          <ListItemButton onClick={handleProfile}>
            <ListItemIcon sx={{ minWidth: 30 }}>
              <AccountCircleSharpIcon />
            </ListItemIcon>
            <ListItemText primary="profile" />
          </ListItemButton>
        </List>
        <Popover
          open={Boolean(product)}
          anchorEl={product}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <List>
            {productList.length > 0 &&
              productList.map((product, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => handleProductClick(product.id)}
                >
                  <ListItemText primary={product.name} />
                </ListItemButton>
              ))}
          </List>
        </Popover>
      </section>
      <Dialog
        open={openLogoutDialog}
        onClose={handleLogoutCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Logout Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout? All unsaved data may lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default Header;
