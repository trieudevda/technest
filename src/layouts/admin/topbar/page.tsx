"use client";
import React from "react";
import { Avatar, Badge, Button, Drawer, IconButton, Stack } from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  NotificationsActiveOutlined,
  NotificationsNoneOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import CartToggleDrawer from "@/utils/helpers/cart/cart-toggleDrawer";
import NotificationToggleDrawer from "@/utils/helpers/notification/notification-toggleDrawer";

const TopBar = () => {
  const [cart, setCart] = React.useState(false);
  const [lightMode, setLightMode] = React.useState('light');
  const [notification, setNotification] = React.useState(false);
  React.useEffect(()=>{
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
      setLightMode(savedMode as "light" | "dark");
    }    
  },[])
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', lightMode);
    localStorage.setItem('theme', lightMode);
  }, [lightMode]);
  /*
  * Nếu không bọc trong ()=>, nó sẽ chạy ngay lập tức khi render, gây lỗi re-render vô hạn
  */
  const toggleDrawer = (toggleData: React.Dispatch<React.SetStateAction<boolean>>, open: boolean) => (event?: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event?.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    toggleData(open);
  };
  const setLightDark = () => {
    setLightMode(lightMode === "light" ? "dark" : "light");
  };
  return (
    <div id="top-bar" className="fixed top-0 top-1 right-0 w-full top-bar max-w-full text-right py-2 mb-2 border-b border-dotted border-color1">
      <IconButton aria-label="cart" onClick={() => toggleDrawer(setCart, true)()}>
        <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
          <Badge color="secondary" badgeContent={88} max={100}>
            <ShoppingCartOutlined />
          </Badge>
        </Stack>
      </IconButton>
      <Button onClick={setLightDark}>
        {lightMode === 'light' ? <LightModeOutlined /> : <DarkModeOutlined />}
      </Button>
      <IconButton aria-label="notification" onClick={() => toggleDrawer(setNotification, true)()}>
        <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
          <Badge color="secondary" badgeContent={88} max={100}>
            {notification ? <NotificationsNoneOutlined /> : <NotificationsActiveOutlined />}
          </Badge>
        </Stack>
      </IconButton>
      <IconButton aria-label="avarta" onClick={() => toggleDrawer(setNotification, true)}>
        <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
          <Avatar alt="Remy Sharp" src="/images/demo/1.png" />
        </Stack>
      </IconButton>
      <Drawer anchor={"right"} open={cart} onClose={() => toggleDrawer(setCart, false)()} className="drawer-cart" id="drawer-cart">
        {CartToggleDrawer(() => toggleDrawer(setCart, true))}
      </Drawer>
      <Drawer anchor={"right"} open={notification} onClose={() => toggleDrawer(setNotification, false)()}  className="drawer-noti" id="drawer-noti">
        {NotificationToggleDrawer(() => toggleDrawer(setNotification, true))}
      </Drawer>
    </div>
  );
};
export default TopBar;
