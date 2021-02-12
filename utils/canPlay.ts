import Swal from "sweetalert2";
import { UserData } from "../hooks/useUser";

const canPlay = ( userData: UserData, rate: number, data: any ): boolean => {
    if(!userData){
        Swal.fire({
            title: "Aby grać na ruletce musisz się zalogować!",
            icon: "error"
        })
        
        return false;
    }

    if(rate < 1){
        Swal.fire({
            title: "Wybierz stawkę zanim zaczniesz grać na ruletce!",
            icon: "error"
        })

        return false;
    }

    if(data && data.coins < rate){
        Swal.fire({
            title: "Nie masz tylu fajek, aby zagrać!",
            text: "Przykro mi :(",
            icon: "error"
        })

        return false;
    }

    return true;
}

export default canPlay;