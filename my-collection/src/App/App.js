import * as React from 'react';
import './App.css';
import HomePage from 'pages/HomePage/HomePage';
import Login from 'components/Login/Login';
import ChangerLanguage from 'components/ChangerLanguage/ChangerLanguage';
import {Switch, Route} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SignUp from 'components/SignUp/SignUp';
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });



function App() {

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  
  return (
    <>
    <Box
    sx={{
      display: 'flex',
      width: '100%',
      flexDirection:'row',
      justifyContent: 'flex-end',
      alignItems:'center',
      bgcolor: 'background.default',
      color: 'text.primary',
      borderRadius: 1,
     marginRight: 3
    }}
  >
     <ChangerLanguage/>
    {theme.palette.mode} mode
    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  </Box>

   <Switch>
     <Route exact path="/" component={HomePage}/>
     <Route exact path="/login" component={Login}/>
     <Route exact path="/register" component={SignUp}/>
   </Switch>
   </>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
