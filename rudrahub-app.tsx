"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  Bell, Bookmark, Check, Compass, Heart, Home, Image as ImageIcon,
  MessageCircle, MoreHorizontal, Search, Settings,
  Share2, Smile, Sparkles, Users, Video,
} from "lucide-react";

type NavItem = "Home" | "Explore" | "Messages" | "Bookmarks" | "Profile";
type Post = {
  id: number;
  initials: string;
  name: string;
  handle: string;
  time: string;
  color: string;
  text: string;
  kind?: "design" | "community";
  likes: number;
  comments: number;
  liked: boolean;
  verified?: boolean;
};

const initialPosts: Post[] = [
  {
    id: 1, initials: "AK", name: "Aarav Khanna", handle: "@aaravcreates", time: "18 min ago",
    color: "#e9e2ff", text: "A little reminder for anyone building something from scratch: keep showing up, keep learning, and let the small wins add up. ✨\n\nWhat are you working on this week?",
    kind: "design", likes: 128, comments: 24, liked: false, verified: true,
  },
  {
    id: 2, initials: "MS", name: "Mira Sen", handle: "@mirasen", time: "42 min ago",
    color: "#fdebdc", text: "Communities become special when people feel comfortable sharing ideas, asking questions, and helping one another. Here's to creating more spaces like that. 🌱",
    kind: "community", likes: 86, comments: 13, liked: false,
  },
  {
    id: 3, initials: "RV", name: "Rohan Verma", handle: "@rohanv", time: "1 hr ago",
    color: "#dff0f0", text: "What's one skill you started learning that changed how you think? Mine was building for the web. The best part is that there is always something new to explore.",
    likes: 54, comments: 9, liked: false,
  },
];

const navigation: { label: NavItem; icon: typeof Home; count?: string }[] = [
  { label: "Home", icon: Home },
  { label: "Explore", icon: Compass },
  { label: "Messages", icon: MessageCircle, count: "3" },
  { label: "Bookmarks", icon: Bookmark },
  { label: "Profile", icon: Users },
];

const people = [
  { initials: "NJ", name: "Neha Joshi", handle: "@nehaj", color: "#f9e4ec" },
  { initials: "DK", name: "Dev Kapoor", handle: "@devbuilds", color: "#e3edff" },
  { initials: "AS", name: "Anaya Shah", handle: "@anayashah", color: "#e8f1d8" },
];

function Avatar({ initials, color, className = "" }: { initials: string; color: string; className?: string }) {
  return <span className={`avatar ${className}`} style={{ background: color, color: "#514b70" }}>{initials}</span>;
}

export function RudraHubApp() {
  const [activeNav, setActiveNav] = useState<NavItem>("Home");
  const [posts, setPosts] = useState(initialPosts);
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [following, setFollowing] = useState<string[]>([]);
  const [toast, setToast] = useState("");

  const visiblePosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return posts;
    return posts.filter((post) => `${post.name} ${post.handle} ${post.text}`.toLowerCase().includes(query));
  }, [posts, search]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function publishPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setPosts((current) => [{
      id: Date.now(), initials: "AS", name: "Abhiram Sinkar", handle: "@abhiram", time: "just now",
      color: "#e9e4ff", text, likes: 0, comments: 0, liked: false,
    }, ...current]);
    setDraft("");
    notify("Your demo post has been added to this preview.");
  }

  function toggleLike(postId: number) {
    setPosts((current) => current.map((post) => post.id === postId
      ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) }
      : post));
  }

  function toggleFollow(handle: string) {
    setFollowing((current) => current.includes(handle)
      ? current.filter((item) => item !== handle)
      : [...current, handle]);
  }

  function selectNav(item: NavItem) {
    setActiveNav(item);
    if (item !== "Home") notify(`${item} is part of the next development stage.`);
  }

  const pageTitle = activeNav === "Home" ? "Your space" : activeNav;
  const pageDescription = activeNav === "Home"
    ? "Good things happen when people connect."
    : `The ${activeNav.toLowerCase()} experience is coming together.`;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand" aria-label="RudraHub home">
          <div className="brand-mark">R</div>
          <div><div className="brand-name">RudraHub</div><div className="brand-sub">A space to connect</div></div>
        </div>
        <label className="top-search">
          <Search size={15} aria-hidden="true" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search people, posts, topics..." aria-label="Search demo posts" />
        </label>
        <div className="top-actions">
          <button className="icon-button" aria-label="Settings" onClick={() => notify("Settings will be added in a later stage.")}><Settings size={17} /></button>
          <button className="icon-button" aria-label="Notifications" onClick={() => notify("You're all caught up in this preview.")}><Bell size={17} /><i className="notification-dot" /></button>
          <Avatar initials="AS" color="#e9e4ff" className="avatar-me" />
        </div>
      </header>

      <div className="workspace">
        <aside className="left-column">
          <nav className="nav-card" aria-label="Main navigation">
            <div className="nav-label">Menu</div>
            {navigation.map(({ label, icon: Icon, count }) => (
              <button key={label} className={`nav-item ${activeNav === label ? "active" : ""}`} onClick={() => selectNav(label)}>
                <Icon size={17} strokeWidth={activeNav === label ? 2.3 : 1.9} /> {label}
                {count && <span className="nav-count">{count}</span>}
              </button>
            ))}
            <div className="nav-divider" />
            <div className="nav-label">Your account</div>
            <button className="nav-item" onClick={() => notify("Account settings will be available after authentication is connected.")}><Settings size={17} /> Settings</button>
          </nav>
          <div className="profile-mini">
            <Avatar initials="AS" color="#e9f3d3" />
            <div><strong>Abhiram Sinkar</strong><span>@abhiram</span></div>
          </div>
          <div className="sidebar-note">A fresh social space from <a href="#about">Rudra Works</a>.<br />Made for meaningful connections.</div>
        </aside>

        <section className="center-column" aria-label="Social feed">
          <div className="page-heading">
            <div><h1>{pageTitle}</h1><p>{pageDescription}</p></div>
            <span className="demo-pill">Preview mode</span>
          </div>

          <div className="stories" aria-label="Community highlights">
            {[
              { name: "Your story", initials: "+", color: "#f0edff" },
              { name: "Aarav", initials: "AK", color: "#e9e2ff" },
              { name: "Mira", initials: "MS", color: "#fdebdc" },
              { name: "Dev", initials: "DK", color: "#e3edff" },
              { name: "Anaya", initials: "AS", color: "#e8f1d8" },
              { name: "Rohan", initials: "RV", color: "#dff0f0" },
            ].map((story, index) => (
              <button className="story" key={story.name} onClick={() => notify(index === 0 ? "Stories will be built after the core feed." : `${story.name}'s story is demo content.`)}>
                <span className="story-ring"><span className="story-ring-inner" style={{ background: story.color }}>{story.initials}</span></span>
                <span className="story-name">{story.name}</span>
              </button>
            ))}
          </div>

          <form className="composer" onSubmit={publishPost}>
            <div className="composer-top">
              <Avatar initials="AS" color="#e9e4ff" />
              <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Share something with your community..." aria-label="Write a post" maxLength={500} />
            </div>
            <div className="composer-bottom">
              <div className="composer-tools">
                <button className="soft-tool" type="button" onClick={() => notify("Photo sharing will be added with media storage.")}><ImageIcon size={15} /><span>Photo</span></button>
                <button className="soft-tool" type="button" onClick={() => notify("Video sharing will be added with media storage.")}><Video size={15} /><span>Video</span></button>
                <button className="soft-tool" type="button" onClick={() => notify("Reactions are coming soon.")}><Smile size={15} /><span>Feeling</span></button>
              </div>
              <button className="primary-button" type="submit" disabled={!draft.trim()}>Post</button>
            </div>
          </form>

          <div className="feed-toolbar"><strong>Community feed</strong><button onClick={() => notify("You're viewing the latest demo posts.")}><Sparkles size={13} /> For you</button></div>

          {visiblePosts.length === 0 ? <div className="post-card empty-state">No demo posts match “{search}”. Try another search.</div> : visiblePosts.map((post) => (
            <article className="post-card" key={post.id}>
              <div className="post-header">
                <Avatar initials={post.initials} color={post.color} />
                <div className="post-author"><strong>{post.name} {post.verified && <Check className="verified" size={13} />}</strong><span>{post.handle} · {post.time}</span></div>
                <button className="more-button" aria-label={`More options for ${post.name}'s post`} onClick={() => notify("More post actions will be available in a future update.")}><MoreHorizontal size={19} /></button>
              </div>
              <p className="post-copy">{post.text}</p>
              {post.kind === "design" && <div className="post-visual design"><div className="visual-kicker">Create · Connect · Grow</div><div className="visual-title">Ideas are better when shared.</div><div className="visual-footer"><Sparkles size={13} /> MAKE SOMETHING MEANINGFUL</div></div>}
              {post.kind === "community" && <div className="post-visual community"><div className="community-mark">together<span style={{ color: "#8aaf55" }}>.</span></div><div className="community-line">Good people. Better conversations.</div></div>}
              <div className="post-actions">
                <button className={`post-action ${post.liked ? "liked" : ""}`} onClick={() => toggleLike(post.id)} aria-label={post.liked ? "Unlike post" : "Like post"}><Heart size={16} fill={post.liked ? "currentColor" : "none"} /> {post.likes}</button>
                <button className="post-action" onClick={() => notify("Comments will be enabled when posts are connected to the database.")}><MessageCircle size={16} /> {post.comments}</button>
                <button className="post-action share" onClick={() => { void navigator.clipboard?.writeText("RudraHub — a space to connect"); notify("RudraHub link copied (preview text)."); }}><Share2 size={15} /> Share</button>
              </div>
            </article>
          ))}
        </section>

        <aside className="right-column">
          <section className="welcome-card"><div className="eyebrow">Welcome to RudraHub</div><h2>Your people. Your ideas. Your space.</h2><p>A new place to discover communities, share what matters, and build meaningful connections.</p><span className="welcome-tag">A RUDRA WORKS PROJECT</span></section>
          <section className="side-card">
            <div className="side-card-head"><strong>People to discover</strong><button onClick={() => notify("People discovery will be connected to real profiles later.")}>See all</button></div>
            {people.map((person) => {
              const isFollowing = following.includes(person.handle);
              return <div className="person-row" key={person.handle}><Avatar initials={person.initials} color={person.color} /><div className="person-info"><strong>{person.name}</strong><span>{person.handle}</span></div><button className={`follow-button ${isFollowing ? "following" : ""}`} onClick={() => toggleFollow(person.handle)}>{isFollowing ? "Following" : "Follow"}</button></div>;
            })}
          </section>
          <section className="side-card">
            <div className="side-card-head"><strong>Topics to explore</strong><button onClick={() => notify("Topic discovery will be personalized later.")}>Explore</button></div>
            {[
              ["01", "Design & creativity", "2.4k conversations"],
              ["02", "Technology", "1.8k conversations"],
              ["03", "Learning together", "960 conversations"],
            ].map(([number, title, detail]) => <div className="trend-row" key={number}><span className="trend-number">{number}</span><div><strong>{title}</strong><span>{detail}</span></div></div>)}
          </section>
          <div className="right-footer" id="about">About · Guidelines · Privacy · Help<br />© 2026 RudraHub by Rudra Works<br />This is a UI preview with sample content.</div>
        </aside>
      </div>

      <nav className="mobile-bottom" aria-label="Mobile navigation">
        {navigation.slice(0, 5).map(({ label, icon: Icon }) => <button key={label} className={`mobile-nav-item ${activeNav === label ? "active" : ""}`} onClick={() => selectNav(label)}><Icon size={19} /><span>{label}</span></button>)}
      </nav>
      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  );
}
