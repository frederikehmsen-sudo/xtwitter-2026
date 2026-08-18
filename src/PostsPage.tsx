import {Component} from "react";
import {FeedPage} from "@/FeedPage.tsx";
import {Outlet} from "react-router";

export function PostsPage() {
    return <div>This is the posts
        <Outlet/>
    </div>
}