import React, {useEffect, useState} from "react";
import {Item} from "../../../domain/entities/Item";
import {GridColDef} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import {Checkbox, Paper, Theme, useMediaQuery} from "@mui/material";
import CurrencyFormatterServiceImpl from "../../../domain/services/CurrencyFormatterServiceImpl";
import DateFormatterServiceImpl from "../../../domain/services/DateFormatterServiceImpl";
import {ItemCategory} from "../../../domain/entities/ItemCategory";
import {CustomMuiToolbar} from "../../components/reusable/toolbar/CustomMuiToobar";
import {StripedDataGrid} from "../../components/reusable/StripedDataGrid";
import AddItemDialog from "../../components/item/itemaddmodal/AddItemModal";
import EditItemDialog from "../../components/item/itemeditmodal/EditItemModal";
import {toast} from "react-toastify";
import container from "../../../container";
import ItemCategoryRepository from "../../../domain/repositories/ItemCategoryRepository";
import ItemRepository from "../../../domain/repositories/ItemRepository";


const Items = () => {
  const navigate = useNavigate();
  const currencyFormatterService = container.resolve<CurrencyFormatterServiceImpl>('CurrencyFormatterService');
  const dateFormatterService = container.resolve<DateFormatterServiceImpl>('DateFormatterService');
  const itemRepository = container.resolve<ItemRepository>('ItemRepository');
  const itemCategoryRepository = container.resolve<ItemCategoryRepository>('ItemCategoryRepository');

  const [itemAddDialogOpen, setItemAddDialogOpen] = React.useState(false);
  const [itemEditDialogOpen, setItemEditDialogOpen] = React.useState(false);
  const [allItems, setAllItems] = useState<any>([]);
  const [pageSize, setPageSize] = React.useState(100);
  const [editData, setEditData] = React.useState(null);
  const [itemCategories, setItemCategories] = useState<[ItemCategory?]>([]);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    getItems();
    getItemCategories();
  }, []);

  const columns: GridColDef[] = [
    {field: "id", headerName: "Id", hide: true},
    {field: "index", headerName: "#", maxWidth: 50},
    {field: "name", headerName: "Name", minWidth: 150},
    {
      field: "price", headerName: "Price", minWidth: 50, // info why nothing here for width
      renderCell: (params: { row: Item }) => currencyFormatterService.format(params.row.price),
    },
    {field: "category", headerName: "Category", minWidth: 50},
    {field: "minStockLevel", headerName: "Min Stock"},
    {field: "status", headerName: "Status", minWidth: 50},
    {field: "imagePath", headerName: "Image"},
    {field: "stock", headerName: "Stock"},
    {
      field: "trackStock",
      headerName: "Track",
      renderCell: (params: { row: Item; }) => (
        <Checkbox
          checked={params.row.trackStock}
          onChange={() => handleTrackStockChange(params.row)}
          inputProps={{'aria-label': 'Track Stock Checkbox'}}
        />
      ),
    },
    {
      field: "updateDate", headerName: "Last Update",
      renderCell: (params: { row: any }) => dateFormatterService.format(params.row.updateDate),
    },
    {
      field: "creationDate", headerName: "Creation Date",
      renderCell: (params: { row: any }) => dateFormatterService.format(params.row.creationDate),
    }
  ].map(column => ({
    ...column,
    flex: 1
  }));
  const data = {rows: allItems, columns: columns};

  const rowClickHandler = (gridData: any) => {
    setEditData(gridData.row);
  };

  const getItems = () => {
    itemRepository.getAllItems()
      .then((items: [Item]) => {
        const formattedItems = formatItems(items);
        setAllItems(formattedItems);
      })
      .catch((error: any) => {
        console.log(error)
        if (!error.response) toast.error("API might be down!");
        if (error.response.data.statusCode === 401) navigate("/");
        // const message = error.response.data.detailedMessage;
        // toast.error(message);
      });
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
      onAddClick={() => setItemAddDialogOpen(true)}
      onEditClick={() => setItemEditDialogOpen(true)}
      onDeleteClick={() => console.log("delete clicked")}
      onResetClick={() => null}
      enableEdit={true}
      enabledDelete={true}
      title={'Items'}
    />
  );

  const handleTrackStockChange = (item: Item) => {
    const updatedItem = {...item, trackStock: !item.trackStock};
    itemRepository.updateItem(updatedItem)
      .then(() => {
        setAllItems((prevItems: any[]) =>
          prevItems.map((i) =>
            i.id === item.id ? updatedItem : i
          )
        );
        toast.success("Item updated successfully");
      })
      .catch((error: any) => {
        console.log(error);
        toast.error("Failed to update item");
      });
  };

  // FIXME: should be in the columns variable part of the grid
  const formatItems = (itemObjects: [Item]) => {
    const tableContent = itemObjects.map((item, index) => ({
      index: ++index,
      id: item.id,
      itemCategoryId: item.itemCategoryDo.id,
      name: item.name,
      price: currencyFormatterService.format(item.price),
      imagePath: item.imagePath,
      category: item.itemCategoryDo.name,
      minStockLevel: item.minStockLevel,
      status: item.status,
      updateDate: dateFormatterService.format(item.updatedAt),
      creationDate: dateFormatterService.format(item.createdAt),
      trackStock: item.trackStock,
      stock: item.stock
    }));
    return tableContent;
  };

  return <Paper
    sx={{height: "85%"}}
  >
    <AddItemDialog
      itemCategories={itemCategories}
      open={itemAddDialogOpen}
      onClose={() => setItemAddDialogOpen(false)}
      allItems={allItems}
      setItems={setAllItems} // TODO update items in allItems manually without reload => DONE partially, cleanup needed
    />

    <EditItemDialog
      allItems={allItems}
      setItems={setAllItems} // TODO update items in allItems manually without reload => DONE partially, cleanup needed
      editData={editData}
      onClose={() => setItemEditDialogOpen(false)}
      open={itemEditDialogOpen}
      itemCategories={itemCategories}
      setItemCategories={setItemCategories}
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
      onRowDoubleClick={() => setItemEditDialogOpen(true)}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      onPageSizeChange={(size) => setPageSize(size)}
      sx={{
        // height: '85%',
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
      density="compact"
    />
  </Paper>
};
export default Items;
