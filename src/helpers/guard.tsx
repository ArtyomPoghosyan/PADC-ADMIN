import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const Guard: React.FC = () => {
    const accessToken: string = cookies.get('accessToken');
    if(accessToken){

    }
    return (
        accessToken ? <Outlet /> : <Navigate to="/auth/login" />
    )


}