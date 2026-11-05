import React, { useState, useEffect } from "react";
import { CalendarDays, Trash2, PenLine } from "lucide-react";

const Blog = () => {
  // Load posts from localStorage or use an empty array
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("blogPosts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  const [newPost, setNewPost] = useState({ title: "", date: "", content: "" });

  useEffect(() => {
    // Save posts to localStorage whenever posts change
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  }, [posts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleAddPost = () => {
    if (newPost.title && newPost.date && newPost.content) {
      const updatedPosts = [...posts, newPost];
      setPosts(updatedPosts);
      setNewPost({ title: "", date: "", content: "" });
    }
  };

  const handleDeletePost = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
  };

  return (
    <section className="page">
      <span className="eyebrow">Blog</span>
      <h1 className="heading mt-4">Notes &amp; stories</h1>
      <p className="mt-2 muted">Write about what you are learning. Posts are saved in your browser.</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-5">
          {posts.length === 0 && (
            <div className="card border-dashed p-10 text-center muted">No posts yet. Write your first one!</div>
          )}
          {posts.map((post, index) => (
            <article key={index} className="card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{post.title}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                    <CalendarDays size={14} /> {post.date}
                  </p>
                </div>
                <button
                  onClick={() => handleDeletePost(index)}
                  className="btn-danger px-3 py-2"
                  aria-label="Delete post"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-slate-300">{post.content}</p>
            </article>
          ))}
        </div>

        <div className="card h-fit p-6 lg:sticky lg:top-24">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <PenLine size={18} className="text-brand-300" /> Add New Post
          </h3>
          <div className="mt-5 space-y-3">
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="input"
            />
            <input
              type="date"
              name="date"
              value={newPost.date}
              onChange={handleInputChange}
              className="input [color-scheme:dark]"
            />
            <textarea
              name="content"
              value={newPost.content}
              onChange={handleInputChange}
              placeholder="Content"
              rows={6}
              className="input resize-y"
            />
            <button onClick={handleAddPost} className="btn-primary w-full">
              Add Post
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
