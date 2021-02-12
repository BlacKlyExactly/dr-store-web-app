import encoding from "encoding";

const encode = ( name: string ): string => 
    encoding.convert(name, "Windows 1252").toString();

export default encode;

