import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";
import * as React from "react";

export function UpIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
    </SvgIcon>
  );
}

export function DownIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
    </SvgIcon>
  );
}

export function AddIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
    </SvgIcon>
  );
}

export function EditIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M16.757 3l-7.466 7.466.008 4.247 4.238-.007L21 7.243V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12.757zm3.728-.9L21.9 3.516l-9.192 9.192-1.412.003-.002-1.417L20.485 2.1z" />
    </SvgIcon>
  );
}

export function DeleteIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M7 6V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5zm6.414 8l1.768-1.768-1.414-1.414L12 12.586l-1.768-1.768-1.414 1.414L10.586 14l-1.768 1.768 1.414 1.414L12 15.414l1.768 1.768 1.414-1.414L13.414 14zM9 4v2h6V4H9z" />
    </SvgIcon>
  );
}

export function ResetIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M13,3c-4.97,0-9,4.03-9,9H1l4,4l4-4H6c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7c-1.9,0-3.62-0.76-4.88-1.99L6.7,18.42 C8.32,20.01,10.55,21,13,21c4.97,0,9-4.03,9-9S17.97,3,13,3z M15,11v-1c0-1.1-0.9-2-2-2s-2,0.9-2,2v1c-0.55,0-1,0.45-1,1v3 c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1v-3C16,11.45,15.55,11,15,11z M14,11h-2v-1c0-0.55,0.45-1,1-1s1,0.45,1,1V11z" />
    </SvgIcon>
  );
}