import { forwardRef } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
// Sử dụng forwardRef để xử lý refForwarding
const CustomSnackbar = forwardRef(({ id, message, variant }, ref) => {
  const { closeSnackbar } = useSnackbar();
  const bgColors: any = {
    success: "success",
    error: "error",
    info: "info",
    warning: "warning",
    default: "default",
  };
const iconVariant: any = {
  success: <CheckCircleIcon style={{ color: "white", marginRight: 8 }} />,
  error: <ErrorIcon style={{ color: "white", marginRight: 8 }} />,
  warning: <WarningIcon style={{ color: "white", marginRight: 8 }} />,
  info: <InfoIcon style={{ color: "white", marginRight: 8 }} />,
};
  return (
    <Card
      ref={ref} // Truyền ref vào phần tử gốc
      className={`relative p-0 rounded-lg shadow-lg ${
        variant == 'success' ? '!bg-success' : 
        variant == 'error'? '!bg-error' :
        variant == 'info'? '!bg-info' :
        variant == 'warning'? '!bg-warning' :
        '!bg-default'
      } `}
      sx={{
        backgroundColor: bgColors[variant]
      }}
    >
      <CardContent className='!p-2 flex flex-row items-center text-white'>
        {iconVariant[variant]}
        <Typography className="text-white">{message}</Typography>
        {/* <Button className="!absolute top-0 right-0 mt-2 !text-white" onClick={() => closeSnackbar(id)}>
          x
        </Button> */}
      </CardContent>
    </Card>
  );
});

// Tên hiển thị trong React DevTools (không bắt buộc)
CustomSnackbar.displayName = 'CustomSnackbar';
export default CustomSnackbar