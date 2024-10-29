import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AppBar, Button, Dialog, Grid, IconButton, Slide, Toolbar, Typography} from "@mui/material";
import {toast} from "react-toastify";
import container from "../../../container";
import ItemRepository from "../../../domain/repositories/ItemRepository";
import {Status} from "../../../domain/enums/Status";
import {Item} from "../../../domain/entities/Item";
import {StripedDataGrid} from "../reusable/StripedDataGrid";
import {GridColDef, GridRenderCellParams, GridSelectionModel} from "@mui/x-data-grid";
import CurrencyFormatterServiceImpl from "../../../domain/services/CurrencyFormatterServiceImpl";
import {MenuProduct} from "../../../domain/entities/MenuProduct";
import {TransitionProps} from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import {MenuItemTimeAvailability} from "../../../domain/props/MenuItemTimeAvailability";
import MenuRepository from "../../../domain/repositories/MenuRepository";
import {CustomMuiToolbar} from "../reusable/toolbar/CustomMuiToobar";
import DateFormatterServiceImpl from "../../../domain/services/DateFormatterServiceImpl";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DisplayedRowData {
  id: number;
  name: string;
  quantity: number;
  timeAvailable: string;
}

const AddMenuItemDialog = (props: {
  onClose: () => void;
  open: boolean;
  setMenuItems: React.Dispatch<React.SetStateAction<MenuProduct[]>>;
}) => {
  const {open, onClose, setMenuItems} = props;
  const navigate = useNavigate();
  const itemRepository = container.resolve<ItemRepository>("ItemRepository");
  const currencyFormatterService = container.resolve<CurrencyFormatterServiceImpl>("CurrencyFormatterService");
  const menuRepository = container.resolve<MenuRepository>("MenuRepository");
  const dateFormatterService = container.resolve<DateFormatterServiceImpl>("DateFormatterService");

  const [items, setItems] = useState<Item[]>([]);
  const [pageSize, setPageSize] = React.useState(100);
  const [selectedRowsId, setSelectedRowsId] = useState<GridSelectionModel>([]);
  // const [displayedRowData, setDisplayedRowData] = useState<DisplayedRowData[]>([]);
  const [selectedMenuItems, setSelectedMenuItems] = useState<MenuItemTimeAvailability[]>([]);

  const getItems = () => {
    itemRepository.getItems(Status.ENABLED)
      .then((items: Item[]) => {
        setItems(items);
      })
      .catch((error: any) => {
        console.log(error);
        if (!error.response) toast.error("API might be down!");
        // if (error.response.data.statusCode === 401) navigate("/");
      });
  };

  const handleSelectionModelChange = (selectionModel: GridSelectionModel) => {
    setSelectedRowsId(selectionModel);
  };

  const handleClick = (rowId: number, time: string) => {
    const updatedMenuItems = [...selectedMenuItems];
    const existingItemIndex = updatedMenuItems.findIndex((item) => item.itemId === rowId);

    if (existingItemIndex !== -1) {
      const selectedItem = updatedMenuItems[existingItemIndex];
      const timeIndex = selectedItem.timesAvailable.findIndex((t) => t === time);

      if (timeIndex !== -1) {
        selectedItem.timesAvailable.splice(timeIndex, 1);
      } else {
        selectedItem.timesAvailable.push(time);
      }
    } else {
      updatedMenuItems.push({
        itemId: rowId,
        timesAvailable: [time],
        quantity: -1,
        createdAt: new Date().toISOString()
      });
    }

    const filteredMenuItemsNoEmptyTimesArray = updatedMenuItems.filter(item => item.timesAvailable.length > 0);
    console.log('filteredMenuItemsNoEmptyTimesArray', filteredMenuItemsNoEmptyTimesArray);
    setSelectedMenuItems(filteredMenuItemsNoEmptyTimesArray);
  };

  const renderTimeIcons = (params: GridRenderCellParams<any, any, any>) => {
    const rowId = params.row.id;
    const selectedItem = selectedMenuItems.find((menuItemTimeAvailability) => menuItemTimeAvailability.itemId === rowId);
    const selectedTimes = selectedItem ? selectedItem.timesAvailable : [];

    const getIconColor = (time: string) => {
      return selectedTimes.includes(time) ? "green" : "red";
    };

    // info: unnecessary but wild
    const handleIconClick = (time: string) => {
      handleClick(rowId, time);
    };

    return (
      <Grid container spacing={2}>
        <Grid item xs={4} onClick={() => handleIconClick("MORNING")}>
          <BeachAccessIcon style={{color: getIconColor("MORNING")}} />
        </Grid>
        <Grid item xs={4} onClick={() => handleIconClick("AFTERNOON")}>
          <WbSunnyIcon style={{color: getIconColor("AFTERNOON")}} />
        </Grid>
        <Grid item xs={4} onClick={() => handleIconClick("EVENING")}>
          <NightsStayIcon style={{color: getIconColor("EVENING")}} />
        </Grid>
      </Grid>
    );
  };

  const columns: GridColDef[] = [
    {field: "id", headerName: "Id", hide: true},
    {field: "name", headerName: "Name", minWidth: 100},
    {
      field: "price",
      headerName: "Price",
      minWidth: 50,
      renderCell: (params: GridRenderCellParams<any, any, any>) => currencyFormatterService.format(params.row.price),
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 10,
      renderCell: (table: { row: Item }) => table.row.itemCategoryDo.name,
    },
    {
      field: "timeAvailable",
      headerName: "Times Available",
      minWidth: 150,
      renderCell: renderTimeIcons,
    },
  ].map((column) => ({
    ...column,
    flex: 1,
  }));

  const saveClickHandler = () => {
    menuRepository.addTodaysMenu(selectedMenuItems)
      .then(r => {
        console.log(r)
        // toast.success("Success");
        onClose();
      })
      .catch((error: any) => {
        toast(error)
        console.log(error)
        if (!error.response) toast.error("API might be down!");
        if (error.response.data.statusCode === 401) navigate("/");
        // const message = error.response.data.detailedMessage;
        // toast.error(message);
      });
  };
  const CustomToolbar = () => (
    <CustomMuiToolbar
      onAddClick={() => null}
      onEditClick={() => null}
      onDeleteClick={() => null}
      onResetClick={() => null}
      enableIcons={false}
      enableExport={false}
    />
  );

  useEffect(() => {
    getItems();
  }, []);

  return (
    <React.Fragment>
      <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
        <AppBar sx={{position: "relative"}}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
              Add Item
            </Typography>
            <Button autoFocus color="inherit" onClick={saveClickHandler}>
              confirm
            </Button>
          </Toolbar>
        </AppBar>
        <StripedDataGrid
          columns={columns}
          rows={items}
          onSelectionModelChange={handleSelectionModelChange}
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          components={{Toolbar: CustomToolbar}}
          rowsPerPageOptions={[15, 30, 100]}
          pageSize={pageSize}
          getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
          onPageSizeChange={(size) => setPageSize(size)}
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "primary.dark",
            "& .MuiDataGrid-cell:hover": {
              color: "warning.main",
            },
          }}
          initialState={{}}
          density="compact"
        />
      </Dialog>
    </React.Fragment>
  );
};

export default AddMenuItemDialog;
