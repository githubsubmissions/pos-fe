import React, {useEffect, useState} from "react";
import {GridColDef} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import {Paper, Theme, useMediaQuery} from "@mui/material";
import {ItemCategory} from "../../../domain/entities/ItemCategory";
import {CustomMuiToolbar} from "../../components/reusable/toolbar/CustomMuiToobar";
import {StripedDataGrid} from "../../components/reusable/StripedDataGrid";
import DateFormatterServiceImpl from "../../../domain/services/DateFormatterServiceImpl";
import AddCategoryDialog from "../../components/category/categoryaddmodal/AddCategoryDialog";
import EditCategoryDialog from "../../components/category/categoryeditmodal/EditCategoryDialog";
import {toast} from "react-toastify";
import container from "../../../container";
import ItemCategoryRepository from "../../../domain/repositories/ItemCategoryRepository";

const CategoryPage = () => {
  const navigate = useNavigate();
  const itemCategoryRepository = container.resolve<ItemCategoryRepository>('ItemCategoryRepository');
  const dateFormatterService = container.resolve<DateFormatterServiceImpl>('DateFormatterService');

  const [itemCategories, setItemCategories] = useState<ItemCategory[]>([])
  const [editableRowData, setEditableRowData] = React.useState<ItemCategory | null>(null);
  const [pageSize, setPageSize] = React.useState(100);
  const [categoryAddDialogOpen, setCategoryAddDialogOpen] = React.useState(false);
  const [categoryEditDialogOpen, setCategoryEditDialogOpen] = React.useState(false);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    getItemCategories();
  }, []);

  const columns: GridColDef[] = [
    {field: "id", headerName: "Id", hide: true},
    {field: "index", headerName: "#", maxWidth: 50},
    {field: "name", headerName: "Name", flex: 1,},
    {field: "status", headerName: "Status", flex: 1},
    {
      field: "updateDate", headerName: "Last Update", flex: 1,
      renderCell: (row: any) => dateFormatterService.format(row.row.createdAt)
    },
    {
      field: "creationDate", headerName: "Creation Date", flex: 1,
      renderCell: (row: any) => dateFormatterService.format(row.row.updatedAt),
    }
  ].map(column => ({
    ...column,
    flex: 1
  }));

  const data = {rows: itemCategories, columns: columns};

  const rowClickHandler = (gridData: any) => {
    setEditableRowData(gridData.row);
  };


  const getItemCategories = () => {
    itemCategoryRepository.getItemCategories()
      .then((items: [ItemCategory]) => {
        setItemCategories(items)
      })
      .catch((error: any) => {
        console.log(error)
        if (!error.response) toast.error("API might be down!");
        if (error.response.data.statusCode === 401) navigate("/");
        // const message = error.response.data.detailedMessage;
        // toast.error(message);
      });
  };

  const CustomToolbar = () => (
    <CustomMuiToolbar
      onAddClick={() => {
        setCategoryAddDialogOpen(true);
      }}
      onEditClick={() => {
        setCategoryEditDialogOpen(true);
      }}
      onDeleteClick={() => console.log("delete clicked")}
      onResetClick={() => null}
      enableEdit={true}
      title={'Categories'}
    />
  );

  return <Paper
    sx={{
      height: "85%"
    }}
  >
    <AddCategoryDialog
      open={categoryAddDialogOpen}
      onClose={() => setCategoryAddDialogOpen(false)}
      categories={itemCategories}
      setCategories={setItemCategories}
    />

    <EditCategoryDialog
      open={categoryEditDialogOpen}
      onClose={() => setCategoryEditDialogOpen(false)}
      editableRowData={editableRowData}
      categories={itemCategories}
      setCategories={setItemCategories}
    />

    <StripedDataGrid
      {...data}
      disableColumnFilter={isMobile}
      // disableColumnSelector
      // disableDensitySelector
      // columns={columns} // works with regular DataGrid
      // disableColumnMenu
      components={{Toolbar: CustomToolbar}}
      rowsPerPageOptions={[50, 100, 200]}
      pageSize={pageSize}
      onRowClick={rowClickHandler}
      onRowDoubleClick={() => {
        setCategoryEditDialogOpen(true)
      }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      onPageSizeChange={(size) => setPageSize(size)}
      sx={{
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
            id: false
          },
        },
        // sorting: {
        //     sortModel: [{field: 'name', sort: 'asc'}],
        // },
      }}
      density="comfortable"
    />
  </Paper>
};

export default CategoryPage;
