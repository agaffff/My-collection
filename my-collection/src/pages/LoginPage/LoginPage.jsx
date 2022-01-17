import {Link} from "react-router-dom";
import {Login}from "components/Login/Login";
import {useTranslation} from 'react-i18next';
import ChangerLanguage from 'components/ChangerLanguage/ChangerLanguage';

const LoginPage = () => {
    const {t} = useTranslation();
    return (
        <div>
            <h1>{t('logininfo.Login')}</h1>
            <ChangerLanguage/>
            <Login/>
            <p> 
                or<Link to="/register">register</Link>
            </p>
        </div>
    )
}

export default LoginPage