"use client";

import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

export default function Loading(){
    return <div className="absolute inset-0 z-40 w-full-screen h-full-screen">
        <CircularProgress size="3rem" />
        </div>
}