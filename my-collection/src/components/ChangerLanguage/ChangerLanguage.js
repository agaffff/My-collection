import i18n from "i18n";

const ChangerLanguage = () => {

    const changeLanguage = (ln) => {
        return () => {
            i18n.changeLanguage(ln);
        }
    }
    return (
        <div>          
        <button onClick = {changeLanguage('en')} > en </button> 
        <button onClick = {changeLanguage('ru')} > ru </button> 
        </div>  
        
    )
}

export default ChangerLanguage
