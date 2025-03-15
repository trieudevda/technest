'use client';
import { useLoading } from "@/public/utils/helpers/context/loading-context";
import React from "react"
import Grid from '@mui/material/Grid2';
import { Badge, Box, Divider, Stack, TextField, Tooltip } from "@mui/material";
// import Editor from "@/public/utils/helpers/editor/tiptap";
import dynamic from "next/dynamic";
import { ImageOutlined } from "@mui/icons-material";
const Editor = dynamic(() => import("@/public/utils/helpers/editor/tiptap"), { ssr: false });
export default function App() {
    const { setLoading } = useLoading();
    const formRef = React.useRef<HTMLFormElement>(null);
    const [valueEditor, setValueEditor] = React.useState("");
    React.useEffect(() => {
        setLoading(false);
    }, []);
    const handleClick = () => {
        if (formRef.current) {
            // Tạo FormData từ form
            const formData = new FormData(formRef.current);
            const product = {
                name: formData.get('productname'),
                editordata: valueEditor,
            };
            console.log(formData.get('editor-data'));
            console.log('Dữ liệu sản phẩm:', product);
            // Ở đây bạn có thể chuyển product sang JSON và gửi lên API
        }
    };
    return <form ref={formRef} action={''} method="" className="form-edit" encType="multipart/form-data">
        <Grid container spacing={2}>
            <Grid size={8} container direction={"column"} spacing={2} className={"p-2"}>
                <Box component={"div"} className="bg-white p-2 rounded">
                    <Box component={"div"}>
                        <Box component={"p"}>
                            Tên sản phẩm
                        </Box>
                        <TextField fullWidth label="Tên sản phẩm" name="productname" />
                    </Box>
                    <Box component={"div"}>
                        <Box component={"p"}>
                            Mô tả
                        </Box>
                        <Editor setvalueEditorTip={setValueEditor} />
                    </Box>
                </Box>
                <Box component={"div"} className="bg-white p-2 rounded">
                    <Box component={"div"}>
                        <Box component={"p"}>
                            Thư viện
                        </Box>
                    </Box>
                    <Divider />
                    <Box component={"div"}>
                        <Box component={"h3"}>
                            Ảnh đại diện
                        </Box>
                        <Box component={"p"}>
                            Thêm ảnh đại diện.
                        </Box>
                        <Stack spacing={3} direction="row" className="justify-center my-4">
                            <Tooltip title={"Thêm hình ảnh"} placement="right-end" arrow>
                                <Badge badgeContent={<ImageOutlined />} anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                    className="stack-bottom"
                                >
                                    <Box component="span" className="rounded" sx={{ bgcolor: 'var(--color3)', width: 80, height: 80 }} />
                                </Badge>
                            </Tooltip>
                        </Stack>
                    </Box>
                    <Divider />
                    <Box component={"div"}>
                        <Box component={"h3"}>
                            Danh sách hình ảnh
                        </Box>
                        <Box component={"p"}>
                            Thêm danh sách hình ảnh.
                        </Box>
                    </Box>
                </Box>
                <Box component={"div"} className="bg-white p-2 rounded">
                    <Box component={"div"}>
                        <Box component={"p"}>
                            Product Gallery
                        </Box>
                    </Box>
                    <Divider />
                    <Box component={"div"}>
                        <Box component={"h3"}>
                            Product Image
                        </Box>
                        <Box component={"p"}>
                            Add Product main Image.
                        </Box>
                    </Box>
                    <Divider />
                    <Box component={"div"}>
                        <Box component={"h3"}>
                            Product Image
                        </Box>
                        <Box component={"p"}>
                            Add Product main Image.
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid size={4}>
                <button type="button" onClick={handleClick}>submit</button>
            </Grid>
        </Grid>
    </form>
}