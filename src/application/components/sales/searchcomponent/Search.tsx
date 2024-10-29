import React from "react";
import {alpha, InputBase, styled} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
  placeholder: string;
  setSearchText: (text: string) => void;
}

const SearchContainer = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.dark, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    fontSize: '20px',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Search({placeholder, setSearchText}: SearchProps) {

  const setSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  return (
    <SearchContainer>
      <SearchIconWrapper>
        <SearchIcon color={"primary"} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={placeholder}
        onChange={setSearchValue}
      />
    </SearchContainer>
  );
}
