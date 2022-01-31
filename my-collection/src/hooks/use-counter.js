import {useSelector} from 'react-redux';

export function useCounter(){
    const{count} = useSelector(state=>state.counter);

    return{
        count,
    };
}