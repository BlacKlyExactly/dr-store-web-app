import useUser from "hooks/useUser";

export default async ( ctx: any ) => {
    const { data, isLoged } = useUser(ctx);
    
    return {
        props: {
            userData: data,
            isLoged
        }, 
    }
}