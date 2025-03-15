import {
    Box,
    Typography,
    Button, CardMedia, CardContent, Card, Tooltip
} from "@mui/material";
import { AccessTimeOutlined, ShoppingCartOutlined, VisibilityOutlined } from "@mui/icons-material";
import * as React from 'react';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import Link from 'next/link';
import { PATHCONST } from '../../constants';
function NotificationToggleDrawer(toggleDrawer: any) {
    const datademo = JSON.stringify({
        pathImg: "/images/demo/1.png",
        noti: "Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1",
        time: "17/2/2020",
    })
    const MarkAllAsRead = () => {
        // TODO: Call API mark all notification as read
        console.log("MarkAllAsRead")
    }
    return <Box
        sx={{ width: 450 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        className="max-h-full flex flex-col"
    >
        <div className="flex-row-nowrap-between basis-32 px-4 pt-4">
            <Typography variant="h5" className="text-color1" gutterBottom>Thông Báo</Typography>
            <Typography onClick = {MarkAllAsRead} className="cursor-pointer" >Đánh dấu tất cả đã đọc</Typography>
        </div>
        <Box className={"scroll-bar scroll-smooth overflow-y-auto overflow-hidden basis-192"}>
            <MediaControlCard props={datademo} />
            <MediaControlCard props={datademo} />
            <MediaControlCard props={datademo} />
            <MediaControlCard props={datademo} />
            <MediaControlCard props={datademo} />
            <MediaControlCard props={datademo} />
            <MediaControlCard props={datademo} />
            <MediaControlCard props={datademo} />
        </Box>
    </Box>
};
export default NotificationToggleDrawer;
/*
* data chứa: pathImg, noti, time
*/
function MediaControlCard(props: any) {
    const data = JSON.parse(props.props);
    return (
        <Suspense fallback={<Loading />}>
            <Link href={PATHCONST.ADMIN.PRODUCT.DETAIL('123123')} >
                <Card className='flex !shadow-none noti-item rounded pl-4 pr-2 border border-b border-dotted'>
                    <Box className="flex flex-row items-center w-full" >
                        <CardMedia
                            component="img"
                            image={data.pathImg}
                            alt="green iguana"
                        />
                        <CardContent className="w-full flex flex-col gap-1">
                            <Tooltip title={data.noti}>
                                <Typography component="div" className='text-tree-line' sx={{fontSize:"0.75rem"}}>
                                    {data.noti}
                                </Typography>
                            </Tooltip>
                            <Typography
                                variant="subtitle1"
                                component="p"
                                className='text-color1 text-xs'
                                sx={{fontSize: '10px'}}
                            >
                               <AccessTimeOutlined sx={{fontSize: '10px'}}/> {data.time}
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            </Link>
        </Suspense>
    );
}