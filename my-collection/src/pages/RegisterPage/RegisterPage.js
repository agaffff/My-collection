import {SignUp} from "components/SignUp/SignUp";
import {Link} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import ChangerLanguage from 'components/ChangerLanguage/ChangerLanguage';

const RegisterPage = () => {
    const {t} = useTranslation();
        
    return (
         <div>
        <h1> {t('logininfo.SignUp')} </h1> 
        <ChangerLanguage/>
        <SignUp/>
        <p>
        Already have an account ? <Link to = "/login" > Sign in </Link> 
        </p> 
        </div>
    )
}

export default RegisterPage