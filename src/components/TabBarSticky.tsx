import React, { PropsWithChildren, useEffect, useState } from "react";

const waitForElement = (sel: "ion-tab-bar", cb: (el: HTMLIonTabBarElement) => void) => {
    const el = document.querySelector(sel);

    if (!el || !el.offsetHeight)
    {
        requestAnimationFrame(() => waitForElement(sel, cb));
    } else
    {
        cb(el);
    }
};

const TabBarSticky = ({ children }: PropsWithChildren<{}>) => {
    const [top, setTop] = useState(0);

    useEffect(() => {
        waitForElement("ion-tab-bar", (tabBar) => {
            if (tabBar)
            {
                const box = tabBar.getBoundingClientRect();
                setTop(window.innerHeight - box.top);
            }
        });
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                bottom: `${top}px`,
                width: "100%",
                zIndex: 1000,
            }}
        >
            {children}
        </div>
    );
};

export default TabBarSticky;
