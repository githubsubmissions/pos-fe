import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CurrencyFormatterServiceImpl from "../../../domain/services/CurrencyFormatterServiceImpl";
import DateFormatterServiceImpl from "../../../domain/services/DateFormatterServiceImpl";
import {CustomMuiToolbar} from "../reusable/toolbar/CustomMuiToobar";
import {StripedDataGrid} from "../reusable/StripedDataGrid";
import {toast} from "react-toastify";
import container from "../../../container";
import MenuRepository from "../../../domain/repositories/MenuRepository";
import {MenuProduct} from "../../../domain/entities/MenuProduct";
import {GridColDef} from "@mui/x-data-grid";
import {Button, Grid, Theme, useMediaQuery} from "@mui/material";
import AddMenuItemDialog from "./AddMenuItemDialog";
import AccessAlarmsTwoToneIcon from '@mui/icons-material/AccessAlarmsTwoTone';
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";


const MenuTable = () => {
  const navigate = useNavigate();
  const currencyFormatterService = container.resolve<CurrencyFormatterServiceImpl>('CurrencyFormatterService')
  const dateFormatterService = container.resolve<DateFormatterServiceImpl>('DateFormatterService')
  const menuRepository = container.resolve<MenuRepository>('MenuRepository')

  const [itemAddDialogOpen, setItemAddDialogOpen] = React.useState(false);
  const [itemEditDialogOpen, setItemEditDialogOpen] = React.useState(false);
  const [menu, setMenu] = useState<MenuProduct[]>([]);
  const [pageSize, setPageSize] = React.useState(100);
  const [editData, setEditData] = React.useState(null);

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    getTodayItems();
  }, []);

  const handleIconClickProcess = (itemId: number, time: string) => {
    const updatedMenuItems = [...menu];
    const itemIndex = updatedMenuItems.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      const selectedItem = updatedMenuItems[itemIndex];
      const timeIndex = selectedItem.timeOfDay.findIndex((t) => t === time);

      if (timeIndex !== -1) {
        selectedItem.timeOfDay.splice(timeIndex, 1);
      } else {
        selectedItem.timeOfDay.push(time);
      }
      setMenu(updatedMenuItems);

      menuRepository.updateItem({
        id: selectedItem.id,
        itemId: selectedItem.item.id,
        timesAvailable: selectedItem.timeOfDay,
        quantity: selectedItem.quantity,
        createdAt: selectedItem.createdAt
      })
        .then(res => {
          // toast.error("ido")
        })
        .catch((error: any) => {
          toast.error(error)
          if (!error.response) toast.error("API might be down!");
          if (error.response.data.statusCode === 401) navigate("/");
        });
    }
  };


  const columns: GridColDef[] = [
    {field: "id", headerName: "Id", hide: true},
    {field: "index", headerName: "#", maxWidth: 50, hide: true}, // fixme hide for now... show number list later
    {
      field: "name", headerName: "Name", minWidth: 160,
      renderCell: (table: { row: MenuProduct }) => table.row.item.name
    },
    {
      field: "timeOfDay",
      headerName: "Time of Day",
      minWidth: 100,
      renderCell: (table: { row: MenuProduct }) => {
        const handleIconClick = (time: string) => {
          handleIconClickProcess(table.row.id, time);
        };

        return (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <AccessAlarmsTwoToneIcon
                style={{
                  color: table.row.timeOfDay.some((timeOfDay) => timeOfDay === "MORNING") ? "blue" : "whitesmoke"
                }}
                onClick={() => handleIconClick("MORNING")}
              />
            </Grid>
            <Grid item xs={4}>
              <WbSunnyIcon
                style={{
                  color: table.row.timeOfDay.some((timeOfDay) => timeOfDay === "AFTERNOON") ? "blue" : "whitesmoke"
                }}
                onClick={() => handleIconClick("AFTERNOON")}
              />
            </Grid>
            <Grid item xs={4}>
              <NightsStayIcon
                style={{
                  color: table.row.timeOfDay.some((timeOfDay) => timeOfDay === "EVENING") ? "blue" : "whitesmoke"
                }}
                onClick={() => handleIconClick("EVENING")}
              />
            </Grid>
          </Grid>
        );
      }
    },

    {
      field: "price", headerName: "Price", minWidth: 70,// info why nothing here for width
      renderCell: (table: { row: MenuProduct }) => currencyFormatterService.format(table.row.item.price)
    },
    {
      field: "rateUs", headerName: "Rate This Dish", minWidth: 100,
      renderCell: (table: { row: MenuProduct }) => <Button
        onClick={() => toast.info("Sorry 😛 Available Soon.")}>⭐⭐⭐⭐⭐</Button>,
    },
    {
      field: "date", headerName: "Date", minWidth: 100,
      renderCell: (table: { row: MenuProduct }) => dateFormatterService.dateOnly(table.row.date)
    },
    {
      field: "updateAt", headerName: "Last Update", minWidth: 100,
      renderCell: (table: { row: MenuProduct }) => dateFormatterService.timeOnly(table.row.updatedAt),
    },
    {
      field: "Quantity", headerName: "Quantity", minWidth: 100,
      renderCell: (table: { row: MenuProduct }) => table.row.quantity < 0 ? "" : table.row.quantity
    },
  ].map(column => ({
    ...column,
    flex: 1
  }));

  const rowClickHandler = (gridData: any) => {
    // console.log(gridData.row)
    setEditData(gridData.row);
  };

  const getTodayItems = () => {
    menuRepository.getTodayItems()
      .then((menu: MenuProduct[]) =>
        setMenu(menu))
      .catch((error: any) => {
        console.log(error)
        if (!error.response) toast.error("API might be down!");
        if (error.response.data.statusCode === 401) navigate("/");
      });
  };

  const CustomToolbar = () => (
    <CustomMuiToolbar
      onAddClick={() => setItemAddDialogOpen(true)}
      onEditClick={() => setItemEditDialogOpen(true)}
      onDeleteClick={() => console.log("delete clicked")}
      onResetClick={() => null}
      title={"Today's Menu"}
    />
  );

  return <>
    <AddMenuItemDialog
      open={itemAddDialogOpen}
      onClose={() => setItemAddDialogOpen(false)}
      setMenuItems={setMenu} // TODO update items in menu manually without reload => DONE partially, cleanup needed
    />

    <StripedDataGrid
      columns={columns}
      rows={menu}
      density={"compact"}
      disableColumnFilter={isMobile}
      disableColumnSelector
      // disableDensitySelector
      disableColumnMenu
      components={{Toolbar: CustomToolbar}}
      rowsPerPageOptions={[15, 30, 100]}
      pageSize={pageSize}
      onRowClick={rowClickHandler}
      onRowDoubleClick={() => setItemEditDialogOpen(true)}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      onPageSizeChange={(size) => setPageSize(size)}
      sx={{
        boxShadow: 2,
        border: 2,
        borderColor: 'primary.dark',
        '& .MuiDataGrid-cell:hover': {
          color: 'warning.main',
        },
        // width: '100%'
      }}
      initialState={{
        // sorting: {
        //     sortModel: [{field: 'firstname', sort: 'asc'}],
        // },
      }}
    />
  </>
};
export default MenuTable;
