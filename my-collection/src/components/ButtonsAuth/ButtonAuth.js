import {useAuth} from 'hooks/use-auth';
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/slices/userSlice';
import {useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import EditCollection from 'components/EditCollection/EditCollection';

const ButtonAuth = () => {

    const dispatch = useDispatch();
    const {isAuth, email} = useAuth();
    const history = useHistory();
    const {t} = useTranslation();

    return isAuth ?(
        <>
        <EditCollection/>
        <Button color="inherit" variant="outlined" onClick={()=> dispatch(removeUser())} >{t('button.ButtonLogOut')} {email}</Button>
        </>
    ) : (
        <>
        <Button color="inherit" variant="outlined" onClick={() => history.push("/login")}>Войти</Button>
        <Button color="secondary" variant="contained" onClick={() => history.push("/register")}>Регистрация</Button>
        </>                  
    )
    
}

export default ButtonAuth
