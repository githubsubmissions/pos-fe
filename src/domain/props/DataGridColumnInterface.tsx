import {GridColDef} from "@mui/x-data-grid";

export interface ExtendedGridColDef extends GridColDef {
  cellRenderer: (params: any) => void
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
