import i18n from "i18n";
import Button from '@mui/material/Button';

const ChangerLanguage = () => {

    const changeLanguage = (ln) => {
        return () => {
            i18n.changeLanguage(ln);
        }
    }
    return (
        <div>          
        <Button variant="text" onClick = {changeLanguage('en')} > en </Button> 
        <Button variant="text" onClick = {changeLanguage('ru')} > ru </Button> 
        </div>  
        
    )
}

export default ChangerLanguage
