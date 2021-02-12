const logger = async( log: string ) => {
    try {
        console.log(log);
    } catch (error) {
        console.log(error);
    }
}

export default logger;