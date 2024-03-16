import { useState } from "react"

const useDisclosure = () =>{
    const [open, setOpen] = useState(false);
    const onOpen = ()=>setOpen(true);
    const onClose = ()=>setOpen(false);
    return{
        isOpen: open, onOpen, onClose
    }
}

export default useDisclosure;