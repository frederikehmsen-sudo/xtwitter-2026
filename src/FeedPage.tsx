import {Outlet} from "react-router"
import "./index.css";
import {useEffect, useState} from "react";

export function FeedPage() {
    const [feed, setFeed] = useState<Post[]>([])
    const [query, setQuery] = useState("")

    useEffect(() => {
        const url = query.trim()
            ? `https://dummyjson.com/posts/tag/${encodeURIComponent(query)}`
            : 'https://dummyjson.com/posts'
        fetch(url)
            .then(res => res.json())
                .then(json => setFeed(json.posts))
    }, [query])

    return (
        <div className="feed">
            <input
            className="search-input"
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            />

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
                            <span
                                className="post-tag"
                                key={tag}
                                onClick={() => setQuery(tag)}
                                style={{cursor: 'pointer'}}>
                                #{tag}
                            </span>
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