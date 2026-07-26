import React, { useEffect, useState } from 'react'
import { IconButton } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


const Theme = ({currentTheme, changeTheme}) => {
  



  return (
    <IconButton onClick={changeTheme}>
        {currentTheme=== "light" ? <DarkModeIcon/> : <LightModeIcon style={{ color: "var(--text-primary)" }}/>}
    </IconButton>
  )
}

export default Theme

