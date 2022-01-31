import {useAuth} from 'hooks/use-auth';
import {useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';

const ButtonAuth = () => {

    const {isAuth} = useAuth();
    const history = useHistory();
    const {t} = useTranslation();
    const hidden = false;

         
    return isAuth ?(
         <>
         <div hidden={true}>
    <Button  color="inherit" variant="outlined" onClick={() => history.push("/login")}>{t('button.Enter')}</Button>
    <Button color="secondary" variant="contained" onClick={() => history.push("/register")}>{t('button.Registration')}</Button>
    </div>
         </>
     ) : (
        <>
        <Button color="inherit" variant="outlined" onClick={() => history.push("/login")}>{t('button.Enter')}</Button>
        <Button color="secondary" variant="contained" onClick={() => history.push("/register")}>{t('button.Registration')}</Button>
        </>                  
    )
    
}

export default ButtonAuth
