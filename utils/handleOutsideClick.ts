import { MutableRefObject } from "react";

const handleOutsideClick = ( 
    close, 
    ref: MutableRefObject<HTMLDivElement>, 
    target: EventTarget
) => (target === ref.current) && close();

export default handleOutsideClick;
