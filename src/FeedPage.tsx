import {Outlet, useNavigate} from "react-router"
import "./index.css";
import {useEffect, useState} from "react";

export function FeedPage() {
    const [allPosts, setAllPosts] = useState<Post[]>([])
    const [query, setQuery] = useState("")
    const [newTitle, setNewTitle] = useState("")
    const [newBody, setNewBody] = useState("")

    const navigate= useNavigate();


    useEffect(() => {
        fetch('https://dummyjson.com/posts?limit=30')
            .then(res => res.json())
                .then(json => setAllPosts(json.posts))
    }, [])

    async function deletePost(id: number){
        const res = await fetch(`https://dummyjson.com/posts/${id}`, {
            method: 'DELETE',
        })
        const data = await res.json()

        if (data.isDeleted) {
            setAllPosts(prev => prev.filter(post => post.id !== id))
        }
    }

    async function createPost() {
        const res = await fetch('https://dummyjson.com/posts/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'} ,
            body: JSON.stringify({
                title: newTitle,
                body: newBody,
                userId: 1
            })
        })
        const newPost = await res.json()

        const completePost: Post = {
            ...newPost,
            reactions: newPost.reactions ?? { likes: 0, dislikes: 0},
            views: newPost.views ?? 0,
            tags: newPost.tags ?? [],
        }

        setAllPosts(prev => [completePost, ...prev])
        setNewTitle("")
        setNewBody("")
    }

    const q = query.trim().toLowerCase()
    const feed = q
        ? allPosts.filter(post =>
            post.title.toLowerCase().includes(q) ||
            post.body.toLowerCase().includes(q) ||
            post.tags.some(tag => tag.toLowerCase().includes(q))
        )
        : allPosts

    function openPostPage(id: number) {
        navigate(`/feed/${id}`)
    }

    return (
        <div className="feed">
            <input value={newTitle} onChange={e =>
                setNewTitle(e.target.value)} placeholder="Title" />
            <input value={newBody} onChange={e =>
                setNewBody(e.target.value)} placeholder="Body" />
            <button onClick={createPost}>Add Post</button>

            <input
            className="search-input"
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            />

            {feed.map(f => (
                <div className="post-card" key={f.id}>
                    <h3 onClick={() => openPostPage(f.id)} className="post-title">{f.title}</h3>
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
                    <button className="delete-button" onClick={() => deletePost(f.id)}>
                        Delete
                    </button>
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