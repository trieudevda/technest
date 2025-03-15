import { AddOutlined, DeleteOutline, FileDownloadOutlined } from "@mui/icons-material";
import { Button, Menu, MenuItem, Pagination } from "@mui/material";
import { GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton, GridValidRowModel } from "@mui/x-data-grid";
import exportToExcel from "../export/export";
import React from "react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import CustomSnackbar from "../../notification/notification-snackbar";

interface toolbar {
  data: {
    textAdd: string;
    pathAdd: string;
    textDel: string;
    pathDel: string;
  }
  textExcel: string;
  rows: GridValidRowModel[];
  column: GridColDef[];
  paginationModel: any,
  setPaginationModel: any,
  rowSelectionModel: string
}
/**
 * 
 * @param json {textAdd: string, path: string, textExport: string, rows: any[], columnProduct: any[]}
 * Dùng cho Grid data
 */
const ToolbarGridData = (json: toolbar) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const {pageSize} = json.paginationModel;
  const handleClickExport = (event: any) => setAnchorEl(event.currentTarget);
  const handleClickDelete = () => {
    const dataRow = json.rowSelectionModel.length;
    if(dataRow != 0){
      deleteApi(json.data.pathDel,json.rowSelectionModel)
    }
    else{
      // enqueueSnackbar("Xoá sản phẩm thành công!",{variant : 'success'});
      enqueueSnackbar('Custom Snackbar!', {
        content: (key) => <CustomSnackbar id={key} message="Xoá sản phẩm thành công!" variant="success" />,
      });
      router.refresh();
    }    
  }
  const handleClose = () => setAnchorEl(null);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    json.setPaginationModel({ ...json.paginationModel, page: value - 1 });
    setPage(value);
  }
  
  return <div className="flex items-center justify-between">
    <GridToolbarContainer>
      <Button variant="text" color="primary" onClick={() => router.push(json.data.pathAdd)}>
        <AddOutlined />
        {json.data.textAdd}
      </Button>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      {/* <GridToolbarDensitySelector /> */}
      <Button variant="text" color="primary" onClick={handleClickExport}>
        <FileDownloadOutlined />
        Xuất file
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => exportToExcel(json.rows, json.column)}><FileDownloadOutlined />{json.textExcel}</MenuItem>
      </Menu>
      <Button variant="text" color="primary" onClick={handleClickDelete}>
        <DeleteOutline />
        {json.data.textDel}
      </Button>
    </GridToolbarContainer>
    <Pagination
      className="pagination-custom"
      count={Math.ceil(json.rows.length / pageSize)}
      page={page}
      onChange={handlePageChange}
      color="primary"
    />
  </div>
}
export default ToolbarGridData;

function deleteApi(pathDel: string, rowSelectionModel: string) {
  throw new Error("Function not implemented.");
}
