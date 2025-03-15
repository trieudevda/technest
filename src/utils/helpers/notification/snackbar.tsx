"use client";
import { SnackbarProvider } from "notistack"

function SnackbarLayout ({ children }: { children: React.ReactNode }){
    return (
    <SnackbarProvider 
    maxSnack={3} 
    autoHideDuration={3000} 
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
        {children}
        </SnackbarProvider>)
}
export default SnackbarLayout