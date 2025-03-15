"use client";
import { CircularProgress } from "@mui/material";
import React from "react";
import { createContext, useContext, useState } from "react";

const LoadingContext = createContext({
  loading: false,
  setLoading: (value: boolean) => { },
});

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  function GradientCircularProgress() {
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
      </React.Fragment>
    );
  }
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading &&
        <div className="absolute inset-0 z-40 flex justify-center items-center bg-opacity-50 bg-gray-300">
          <GradientCircularProgress />
        </div>}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
