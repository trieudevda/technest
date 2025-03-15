import {
    Box,
    Typography,
    Button,
} from "@mui/material";
import { ShoppingCartOutlined, VisibilityOutlined } from "@mui/icons-material";
import MediaControlCard from "./items-cart";
function CartToggleDrawer(toggleDrawer: any) {
    const datademo = JSON.stringify({
        pathImg: "/images/demo/1.png",
        productName: "Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1",
        quality: 1,
        price: 100000,
    })
    return <Box
        sx={{ width: 450 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        className="max-h-full flex flex-col"
    >
        <div className="flex-row-nowrap-between basis-32 px-4 pt-4">
            <Typography variant="h5" className="text-color1" gutterBottom>Giỏ hàng</Typography>
            {/* <Typography className="text-color1 bg-color5 text-2xl p-1 rounded text-color4" gutterBottom>5 sản phẩm</Typography> */}
        </div>
        <Box className={"scroll-bar scroll-smooth overflow-y-auto overflow-hidden basis-192"}>
            <MediaControlCard props={datademo}/>
            <MediaControlCard props={datademo}/>
            <MediaControlCard props={datademo}/>
            <MediaControlCard props={datademo}/>
            <MediaControlCard props={datademo}/>
            <MediaControlCard props={datademo}/>
            <MediaControlCard props={datademo}/>
            <MediaControlCard props={datademo}/>
        </Box>
        <div className="basis-32 border-t border-dotted border-color1 pb-4">
            <div className="flex-row-nowrap-between min-h-[10%] px-4">
                <Typography variant="h6" className="text-color2" gutterBottom>Tổng</Typography>
                <Typography variant="h6" className="text-color2 text-2xl" gutterBottom>5.000.000 đ</Typography>
            </div>
            <div className="flex-row-nowrap-between min-h-[10%] px-4">
                <Button variant="outlined" startIcon={<VisibilityOutlined />}>
                    Xóa
                </Button>
                <Button variant="contained" endIcon={<ShoppingCartOutlined />}>
                    Thanh Toán
                </Button>
            </div>
        </div>
    </Box>
};
export default CartToggleDrawer;
