import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCollection from 'components/Collection/AddCollection';
import { Button } from "@mui/material";
import { useAuth } from 'hooks/use-auth';
import { useDispatch } from 'react-redux';
import { Fragment, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link, useHistory} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";


const MenuUser = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const history = useHistory();
  const {t} = useTranslation();
  const {email, isAuth} = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () =>{
    // dispatch(removeUser());
    // console.log("removeUser");
    const auth = getAuth();
    
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    console.log("signOut")
    history.push("/");
    console.log("history.push");
    handleClose();
    console.log("handleClose");
  };
  
    return (
       <div hidden={!isAuth}>
        <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar />  <Link to="/mycollections">My Collection</Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <AddCollection onClick={handleClose}/>
        </MenuItem>
        <MenuItem>
          <Button type='link' onClick={logOut} >{t('button.ButtonLogOut')} {email}</Button>
        </MenuItem>
      </Menu>
    </Fragment>
    </div>
  );

        
    
}
export default MenuUser