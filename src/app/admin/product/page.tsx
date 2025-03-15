"use client";
import { DataGrid, GridRowSelectionModel, GridRowsProp } from '@mui/x-data-grid';
import { useLoading } from '@/utils/helpers/context/loading-context';
import { PATHCONST } from '@/utils/constants';
import columnProduct from '@/utils/helpers/product/col-product';
import localeTextProduct from '@/utils/helpers/product/locale-text';
import ToolbarGridData from '@/utils/helpers/grid-data-admin/toolbar-container/toolbar';
import React from 'react';

const rows: GridRowsProp = Array.from({ length: 50 }, (_, index) => ({
  slug: index + 1,
  fullname: `User ${index + 1}`,
  code: `Code_${index + 100}`,
  prices: `${(Math.random() * 1000).toFixed(2)}$`,
  status: index % 2 === 0 ? "Active" : "Inactive",
  short_description: `Description ${index + 1}`,
  avarta: `50/50`, // Ảnh avatar ngẫu nhiên
  created_at: new Date(Date.now() - index * 10000000).toISOString().split('T')[0], // Ngày tạo lùi dần
  user: `User_${index + 1}`,
  supplier: `Supplier_${index % 5}`,
  categories: `Category_${index % 3}`,
  feature: `Feature_${index % 4}`
}));
export default function App() {
  const [data, setData] = React.useState<GridRowsProp>([]);
  const [loadingGrid, setLoadingGrid] = React.useState(true);
  const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 20, });
  const [rowCount, setRowCount] = React.useState(0);
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);
  const [height, setHeight] = React.useState<string>();
  const { setLoading } = useLoading();
  const jsonProduct = {
    data: {
      textAdd: "Thêm sản phẩm",
      pathAdd: PATHCONST.ADMIN.PRODUCT.CREATE,
      textDel: "Xóa sản phẩm",
      pathDel: rowSelectionModel.length ? PATHCONST.ADMIN.PRODUCT.DELETE(rowSelectionModel.join("/")) : '',
    },
    textExcel: "Xuất file",
    rows: [...rows],
    column: columnProduct,
    paginationModel: paginationModel,
    setPaginationModel: setPaginationModel,
    rowSelectionModel: rowSelectionModel
  }
  React.useEffect(() => {
    setLoadingGrid(true);
    // Giả lập API lấy dữ liệu theo trang
    setTimeout(() => {
      const start = paginationModel.page * paginationModel.pageSize;
      const end = start + paginationModel.pageSize;
      setData(rows.slice(start, end)); // Lấy dữ liệu theo trang
      setRowCount(rows.length); // Tổng số bản ghi
      setLoadingGrid(false);
      setLoading(false);
      setHeight((paginationModel.pageSize * 54) + 'px')
    }, 500);
  }, [paginationModel]);
  return (
    <div className='w-full h-full'>
      <DataGrid
        getRowId={(row) => row.slug} // Dùng slug thay vì id
        rows={data}
        columns={columnProduct}
        rowCount={rowCount}
        loading={loadingGrid}
        pageSizeOptions={[20, 15, 13, 100]}
        disableColumnSorting
        // autoPageSize
        // paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        paginationMode="server"
        checkboxSelection
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(newSelection) => {
          setRowSelectionModel(newSelection);
        }}
        // disableRowSelectionOnClick
        localeText={localeTextProduct}
        slots={{
          toolbar: ToolbarGridData,
          footer: undefined,
        }}
        slotProps={{
          toolbar: jsonProduct,
          loadingOverlay: {
            // Tìm ở https://mui.com/x/react-data-grid/overlays/
            variant: "skeleton",
            noRowsVariant: 'skeleton',
          }
        }}
        sx={{
          minHeight: "520px",
          height: height,
        }}
      // columnVisibilityModel={{}} ẩn cột
      />
    </div>
  );
}
