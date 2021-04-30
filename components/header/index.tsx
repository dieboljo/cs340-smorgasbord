// components/header/index.tsx

import cn from "classnames"
import styles from "./header.module.scss"
import Link from "next/link"
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react"

const convertCrumb = string => {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .replace(/\?.*$/, '')
    .toUpperCase();
};

export const Header = (): JSX.Element => {
    const router = useRouter();
    const [crumbs, setCrumbs] = useState(null);
    useEffect(() => {
        if (router) {
            const linkPath = router.asPath.split('/');
            linkPath.shift();

            const pathArray = [];
            linkPath.forEach((path, i) => {
                if (path) {
                    pathArray.push({ 
                        breadCrumb: path, 
                        href: '/' + linkPath.slice(0, i + 1).join('/') 
                    });
                }
            });

            setCrumbs(pathArray);
        }
    }, [router]);

    return (
        <header className={styles.header}>
            <Link href='/'>
                <a>HOME</a>
            </Link>
            {crumbs && crumbs.map((crumb, crumbIdx) => (
                <Link href={crumb.href} key={crumb.href}>
                    <a>{'/ ' + convertCrumb(crumb.breadCrumb)}</a>
                </Link>
            ))}
        </header>
    )
}

export default Header
