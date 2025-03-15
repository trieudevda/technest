"use client";
import generateUrl from "@/utils/helpers/generate/url";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import React from "react";

const BreadcrumbsAdmin = () => {
    const pathname = usePathname()
    const [path, setPath] = React.useState<Array<string>>();
    let pathCustom = "";
    React.useEffect(() => {
        const url = generateUrl(pathname);
        setPath(url);
    }, [pathname])
    return <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs-data capitalize">
        {
            path
                ? path.map((item, index) => {
                    if(index === 0) {
                        pathCustom += `/${path[index]}`;
                        return <Link key={index} underline="hover" color="inherit" href={`/${path[index]}`} >
                                {path[index]}
                            </Link>
                    }
                    else{
                        if(index === path.length-1 || (index === path.length-1 && path.length-1 === 2)) {                        
                            pathCustom += `/${path[index]}`;
                            return <Typography key={index} color="text.primary">{item}</Typography>
                        }
                        else{                        
                            pathCustom += `/${path[index]}`;
                            // console.log(pathCustom);
                            return <Link
                                key={index}
                                underline="hover"
                                color="inherit"
                                href={pathCustom}
                            >
                                {item}
                            </Link>
                        }
                    }
                })
                : ''
        }
    </Breadcrumbs>
}
export default BreadcrumbsAdmin