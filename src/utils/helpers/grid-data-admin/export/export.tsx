
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
const exportToExcel = (rows: any, columns: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Thêm tiêu đề cột
    worksheet.addRow(columns.map(col => col.headerName));

    // Thêm dữ liệu từng hàng
    rows.forEach(row => {
        worksheet.addRow(columns.map(col => row[col.field] || ""));
    });

    // Định dạng tiêu đề cột
    worksheet.getRow(1).eachCell(cell => {
        cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "4F81BD" } };
    });

    // Xuất file Excel
    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "data.xlsx");
    });
};
export default exportToExcel;