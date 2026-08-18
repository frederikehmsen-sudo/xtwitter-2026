import {Outlet} from "react-router"
import "./index.css";
import {useEffect, useState} from "react";

export function FeedPage() {
    const [feed, setFeed] = useState<Post[]>([])

    useEffect(() => {
        fetch('https://dummyjson.com/posts').then(res => {
            res.json().then(json => {
                setFeed(json.posts)
            })
        })
    }, [])

    return (
        <div className="feed">
            {feed.map(f => (
                <div className="post-card" key={f.id}>
                    <h3 className="post-title">{f.title}</h3>
                    <p className="post-body">{f.body}</p>
                    <div className="post-meta">
                        <span>👍 {f.reactions.likes}</span>
                        <span>👎 {f.reactions.dislikes}</span>
                        <span>👁 {f.views} views</span>
                    </div>
                    <div className="post-tags">
                        {f.tags.map(tag => (
                            <span className="post-tag" key={tag}>#{tag}</span>
                        ))}
                    </div>
                </div>
            ))}
            <Outlet/>
        </div>
    )
}

export interface Posts {
    posts: Post[]
    total: number
    skip: number
    limit: number
}

export interface Post {
    id: number
    title: string
    body: string
    tags: string[]
    reactions: Reactions
    views: number
    userId: number
}

export interface Reactions {
    likes: number
    dislikes: number
}