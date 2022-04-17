import React from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useMatches
} from "@remix-run/react";

import type { LinksFunction, MetaFunction } from "@remix-run/node";

import tailwind from "./styles/app.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "RockSpec Stack",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwind }
  ]
}

export default function App() {
  let location = useLocation();
  let matches = useMatches();

  let isMount = true;
  React.useEffect(() => {
    let mounted = isMount;
    isMount = false;
    if ("serviceWorker" in navigator) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller?.postMessage({
          type: "REMIX_NAVIGATION",
          isMount: mounted,
          location,
          matches,
          manifest: window.__remixManifest,
        });
      } else {
        let listener = async () => {
          await navigator.serviceWorker.ready;
          navigator.serviceWorker.controller?.postMessage({
            type: "REMIX_NAVIGATION",
            isMount: mounted,
            location,
            matches,
            manifest: window.__remixManifest,
          });
        };
        navigator.serviceWorker.addEventListener("controllerchange", listener);
        return () => {
          navigator.serviceWorker.removeEventListener(
            "controllerchange",
            listener
          );
        };
      }
    }
  }, [location]);

  return (
    <html lang="en"> 
      <head>  
        <Meta /> 
        <link rel="manifest" href="/resources/manifest.json" />
        <Links /> 
      </head> 
      <body>
        <Outlet /> 
        <ScrollRestoration /> 
        <Scripts /> 
        <LiveReload /> 
      </body> 
    </html>
  );
}
