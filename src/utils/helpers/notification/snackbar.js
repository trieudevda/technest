"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const notistack_1 = require("notistack");
function SnackbarLayout({ children }) {
    return (<notistack_1.SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        {children}
        </notistack_1.SnackbarProvider>);
}
exports.default = SnackbarLayout;
