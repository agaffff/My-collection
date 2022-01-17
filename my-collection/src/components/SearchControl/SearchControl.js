import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const SearchControl = () => {
    
    return (
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      <TextField id="standard-basic" label="search" variant="standard" />
    </Box>
        
    )
};

export default SearchControl
