import {
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter
} from "@mui/x-data-grid";
import {AddIcon, DeleteIcon, EditIcon, ResetIcon} from "../svgicons/SvgIcons";
import {green, grey, red, yellow} from "@mui/material/colors";
import * as React from "react";
import {Grid, Typography} from "@mui/material";

// https://fontawesomeicons.com/svg/icons/edit-box-fill

const iconSize = 30;
const exportHeight = 15;

export function CustomMuiToolbar(props:
                                   {
                                     onAddClick: () => void,
                                     onEditClick: (e: any) => void
                                     onDeleteClick: () => void
                                     onResetClick: () => void
                                     enableIcons?: boolean
                                     enableExport?: boolean
                                     title?: string
                                     enableEdit?: boolean
                                     enableAdd?: boolean
                                     enabledDelete?: boolean
                                     enabledReset?: boolean
                                   }) {
  const {
    enableIcons = true,
    enableExport = true,
    title,
    enableAdd = true,
    enableEdit,
    enabledDelete,
    enabledReset
  } = props;


  return <GridToolbarContainer>
    <Grid container justifyContent="space-between" spacing={1} alignItems={'center'}>

      <Grid item xs={12} md={4} lg={4} alignItems={"flex-start"}>
        {/*<GridToolbarColumnsButton sx={{fontSize: filterSize}} />*/}
        <GridToolbarFilterButton sx={{fontSize: exportHeight}} />
        <GridToolbarDensitySelector sx={{fontSize: exportHeight}} />
        {enableExport && <GridToolbarExport sx={{fontSize: exportHeight, color: green[500]}} />}
      </Grid>

      {title && title.length > 0 &&
        <Grid item xs={12} md={3} lg={3} container alignItems="center" justifyContent={'center'}>
          <Typography variant="h5">
            {title}
          </Typography>
        </Grid>}

      <Grid item xs={12} md={5} lg={5} container justifyContent={'space-around'} alignItems="center">
        {/*{localStorage.getItem("token") && (*/}
        {enableIcons &&
          <>
            {enableAdd &&
              <Grid item xs={1}>
                <AddIcon sx={{fontSize: iconSize, color: green[500]}} onClick={props.onAddClick} />
              </Grid>}
            {enableEdit &&
              <Grid item xs={1}>
                <EditIcon sx={{fontSize: iconSize, color: yellow[700]}} onClick={props.onEditClick} />
              </Grid>}
            {enabledDelete &&
              <Grid item xs={1}>
                <DeleteIcon sx={{fontSize: iconSize, color: red[500]}} onClick={props.onDeleteClick} />
              </Grid>}
            {enabledReset &&
              <Grid item xs={1}>
                <ResetIcon sx={{fontSize: iconSize, color: grey[900]}} onClick={props.onResetClick} />
              </Grid>}
          </>
        }
        <Grid item xs={8} md={8} lg={8}>
          <GridToolbarQuickFilter debounceMs={500}
                                  InputProps={{style: {height: '43px'}}}
                                  sx={{
                                    fontSize: iconSize,
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                  }} fullWidth
                                  variant="outlined" />
        </Grid>
      </Grid>


    </Grid>
  </GridToolbarContainer>;
}