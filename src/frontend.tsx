/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import {Component, StrictMode} from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import {createBrowserRouter, RouterProvider} from "react-router";
import {APITester} from "@/APITester.tsx";
import {FeedPage} from "@/FeedPage.tsx";
import {PostsPage} from "@/PostsPage.tsx";

const elem = document.getElementById("root")!;
const app = (
<RouterProvider router={createBrowserRouter([
    {
        path: "/",
        element:<APITester />
    },
    {
path:"/feed",
element: <FeedPage />,
children: [
    {
        path: ':id',
        element: <PostsPage />
    }
]
    }
])}>
</RouterProvider>
);

// https://bun.com/docs/bundler/hot-reloading#import-meta-hot-data
(import.meta.hot.data.root ??= createRoot(elem)).render(app);
