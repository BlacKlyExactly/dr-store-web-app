import Swal from "sweetalert2";

const useNotificaions = () => {
    const requestPermission = ( showAlert?: boolean ): Promise<boolean> => {
        return new Promise(async ( resolve ) => {
            if(
                Notification.permission === 'denied' ||
                Notification.permission === 'default'
            ){
                const permission: NotificationPermission = await Notification.requestPermission();

                if(permission === "granted"){
                    showAlert && Swal.fire({
                        title: "Włączyłeś powiadomienia!",
                        text: "Yay! Możesz je wyłączyć w ustawieniach przeglądarki",
                        icon: "success"
                    })

                    resolve(true);
                    return;
                }
                
                showAlert && Swal.fire({
                    title: "Odrzuciłeś powiadomienia :(",
                    text: "Jeśli się zdecydujesz na ich włączenie, włącz je w ustawieniach przeglądarki",
                    icon: "error"
                })

                resolve(false);
                return;
            }

            resolve(true);
            showAlert && Swal.fire({
                title: "Powiadomienia są już włączone!",
                text: "Możesz je wyłączyć w ustawieniach przeglądarki",
                icon: "success"
            })
        })
    }

    const createNotification = async ( title: string, msg: string ) => {
        const notifyAllowed: boolean = await requestPermission();

        notifyAllowed && new Notification(title, {
            icon: "http://localhost:3000/images/logo.png",
            body: msg
        });
    }

    return { createNotification, requestPermission }
}

export default useNotificaions;