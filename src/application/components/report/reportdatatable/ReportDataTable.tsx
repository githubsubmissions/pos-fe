import {GridColDef} from "@mui/x-data-grid";
import {ReportResponse} from "../../../../domain/responses/ReportResponse";
import React from "react";
import {StripedDataGrid} from "../../reusable/StripedDataGrid";
import {CustomMuiToolbar} from "../../reusable/toolbar/CustomMuiToobar";
import CurrencyFormatterServiceImpl from "../../../../domain/services/CurrencyFormatterServiceImpl";
import container from "../../../../container";
import {Theme, useMediaQuery} from "@mui/material";


const ReportDataTable: React.FC<{ responseData: ReportResponse | null, grandTotal: number }> = (props) => {
  const {grandTotal} = props;

  const currencyFormatter = container.resolve<CurrencyFormatterServiceImpl>('CurrencyFormatterService');
  const [pageSize, setPageSize] = React.useState(50);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const rows = (props.responseData?.reportDetail || []).map((reportDetail, index) => {
    const employees = (reportDetail.employees.reduce((acc, employee) =>
      (acc + employee.userDo.firstname + " " + employee.userDo.lastname + ", "), ""))
      .trim()
      .slice(0, -1);

    return {
      index: ++index,
      id: reportDetail.lastSaleDetailId,
      name: reportDetail.itemDo.name,
      category: reportDetail.itemDo.itemCategoryDo.name,
      quantitySold: reportDetail.quantity,
      price: currencyFormatter.format(reportDetail.price),
      total: currencyFormatter.format(reportDetail.total),
      paymentMethod: reportDetail.paymentMethod,
      cashiers: employees,
    };
  });

  const columns: GridColDef[] = [
    {field: "lastSaleDetailId", headerName: "Id", maxWidth: 50},
    {field: "index", headerName: "#", maxWidth: 50},
    {field: "name", headerName: "Item", minWidth: 150},
    {field: "paymentMethod", headerName: "Payment Method", type: "string"},
    {
      field: "total",
      headerName: "Total",
      type: "number",
      flex: 1,
      renderCell: (row: { row: any }) => <strong>{row.row.total}</strong>,
    },
    {field: "quantitySold", headerName: "Quantity Sold", type: "number", minWidth: 50},
    {field: "price", headerName: "Price", type: "number", flex: 1},
    {field: "category", headerName: "Category", flex: 1},
    {field: "cashiers", headerName: "Cashier(s)", type: "string"},
  ].map(column => ({
    ...column,
    flex: 1
  }));
  const data = {rows: rows, columns: columns};

  const rowClickHandler = (gridData: any) => {
    console.log(gridData.row);
  };

  const CustomToolbar = () => (
    <CustomMuiToolbar
      onAddClick={() => console.log("add clicked")}
      onEditClick={() => null}
      onDeleteClick={() => console.log("delete clicked")}
      onResetClick={() => null}
      title={isMobile ? currencyFormatter.format(grandTotal) : `TOTAL: GH¢ ${currencyFormatter.format(grandTotal)}`}
      enableAdd={false}
    />
  );


  return (
    <StripedDataGrid
      {...data}
      // disableColumnFilter
      // disableColumnSelector
      // disableDensitySelector
      // columns={columns} // works with regular DataGrid
      // disableColumnMenu
      components={{Toolbar: CustomToolbar}}
      rowsPerPageOptions={[15, 50, 100]}
      pageSize={pageSize}
      onRowClick={rowClickHandler}
      // autoHeight={true}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      onPageSizeChange={(size) => setPageSize(size)}
      sx={{
        height: '100%',
        boxShadow: 2,
        border: 2,
        borderColor: "primary.light",
        "& .MuiDataGrid-cell:hover": {
          color: "primary.main",
        },
      }}
      initialState={{
        columns: {
          columnVisibilityModel: {
            // Hide column lastSaleDetailId, the other columns will remain visible
            lastSaleDetailId: false,
          },
        },
        sorting: {
          sortModel: [{field: 'name', sort: 'asc'}],
        },
      }}
      density="compact"
    />
  );
};
export default ReportDataTable;

