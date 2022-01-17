import {useAuth} from 'hooks/use-auth';
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/slices/userSlice';
import {useHistory } from "react-router-dom";
import Button from '@mui/material/Button';

const ButtonAuth = () => {

    const dispatch = useDispatch();
    const {isAuth, email} = useAuth();
    const history = useHistory();

    return isAuth ?(
        
        <Button color="inherit" variant="outlined" onClick={()=> dispatch(removeUser())} >Выход {email}</Button>
    ) : (
        <>
        <Button color="inherit" variant="outlined" onClick={() => history.push("/login")}>Войти</Button>
        <Button color="secondary" variant="contained" onClick={() => history.push("/register")}>Регистрация</Button>
        </>                  
    )
    
}

export default ButtonAuth
