import { ListItemButton, ListItemIcon, ListItemText, SxProps, Theme } from "@mui/material";
import React from "react";
import { useLoading } from "../../../context/loading-context";

interface ItemButtonProps {
    primary?: string;
    onclick?: () => void;
    iconbefore?: React.ReactNode;
    iconafter?: React.ReactNode;
    sxList?: SxProps<Theme>;
}
const ItemButton: React.FC<ItemButtonProps> = ({ primary, onclick, iconbefore, iconafter, sxList }) =>{
    const { setLoading } = useLoading();
    return <ListItemButton sx ={sxList} onClick={onclick}>
        <ListItemIcon> {iconbefore} </ListItemIcon>
        <ListItemText primary={primary ?? ''} />
        {iconafter}
    </ListItemButton>
}
export default ItemButton