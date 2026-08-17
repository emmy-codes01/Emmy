import React, { useState, useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import model from '../assets/images/image.png'
import { Heart, ThumbsDown, Calendar, ArrowLeft, Share2, Home, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  doc,
  increment,
  arrayUnion,
  arrayRemove,
  getDoc,
  where
} from 'firebase/firestore';

// Firebase configuration - using your existing config
const firebaseConfig = {
  apiKey: "AIzaSyAxzSXt3KkWBT7mAhq-EeVDRNz9Gmh39xg",
  authDomain: "emmy-codes.firebaseapp.com",
  projectId: "emmy-codes",
  storageBucket: "emmy-codes.firebasestorage.app",
  messagingSenderId: "266870836039",
  appId: "1:266870836039:web:c5b8919bf492cc4f471a62",
  measurementId: "G-X2D2RQ06F9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* Same system as Home.jsx / Projectsgoal.jsx / Brands.jsx */
const display = { fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" }
const ACCENT = '#E8A853'
const eyebrow = 'text-[10px] tracking-[0.16em] uppercase text-white/35 font-medium'
const body = 'text-sm text-white/50 font-light leading-relaxed'

/* ============================================================
   Everything below is defined at MODULE scope, not inside Blog.
   That's the fix: previously PostActions / BlogPostsList /
   BlogPostDetail (and these helper functions) were declared
   inside the Blog component body, so every re-render — which
   Firestore's onSnapshot fires constantly — created brand new
   function references. React treats a new function reference as
   a new component type and remounts the whole subtree instead of
   just re-rendering with new props, which is what caused the
   "glitching" (full unmount/remount + replayed entrance
   animations) on every snapshot tick. Stable, module-level
   references fix that: React now just re-renders with new props.
   ============================================================ */

// Real verified badge — amber gradient fill, white check, instead of the generic bluecheck.png
const VerifiedBadge = ({ size = 14, gradientId = 'verified-badge' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Verified">
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8A853" />
        <stop offset="100%" stopColor="#f2d6a3" />
      </linearGradient>
    </defs>
    <path
      d="M12 2l2.34 1.51 2.78-.46 1.14 2.58 2.58 1.14-.46 2.78L22 12l-1.62 2.45.46 2.78-2.58 1.14-1.14 2.58-2.78-.46L12 22l-2.34-1.51-2.78.46-1.14-2.58-2.58-1.14.46-2.78L2 12l1.62-2.45-.46-2.78 2.58-1.14 1.14-2.58 2.78.46L12 2z"
      fill={`url(#${gradientId})`}
    />
    <path
      d="M8.3 12.4l2.3 2.3 4.6-5.1"
      stroke="#0a0a0b"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

const formatDate = (timestamp) => {
  if (!timestamp) return 'Just now';

  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

const truncateText = (text, maxLength = 140) => {
  if (!text || text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

const stripFormatting = (text) => {
  if (!text) return '';
  return text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/\n/g, ' ');
};

const renderContent = (content) => {
  if (!content) return '';

  let formatted = content.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[#E8A853] hover:underline">$1</a>'
  );

  formatted = formatted.replace(
    /\*\*(.*?)\*\*/g,
    '<strong>$1</strong>'
  );

  formatted = formatted.replace(
    /\*(.*?)\*/g,
    '<em>$1</em>'
  );

  formatted = formatted.replace(/\n/g, '<br>');

  return <div dangerouslySetInnerHTML={{ __html: formatted }} />;
};

const renderFeaturedImage = (imageUrl, altText = "Blog post image") => {
  if (!imageUrl) return null;

  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-auto"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/800x400/1a1a1a/E8A853?text=Image+Unavailable";
        }}
      />
    </div>
  );
};

// Now takes its handlers as props instead of closing over Blog's state.
const PostActions = ({ post, size = 15, onLike, onDislike, onShare }) => (
  <div className="flex items-center gap-4">
    <button
      className={`flex items-center gap-1.5 transition-colors duration-300 ${
        post.likedByCurrentUser ? 'text-[#E8A853]' : 'text-white/50 hover:text-[#E8A853]'
      }`}
      onClick={() => onLike(post.id)}
      aria-label="Like"
    >
      <Heart size={size} className={post.likedByCurrentUser ? 'fill-[#E8A853]' : ''} />
      <span className="text-xs">{post.likes || 0}</span>
    </button>

    <button
      className={`flex items-center gap-1.5 transition-colors duration-300 ${
        post.dislikedByCurrentUser ? 'text-red-400' : 'text-white/50 hover:text-red-400'
      }`}
      onClick={() => onDislike(post.id)}
      aria-label="Dislike"
    >
      <ThumbsDown size={size} className={post.dislikedByCurrentUser ? 'fill-red-400' : ''} />
      <span className="text-xs">{post.dislikes || 0}</span>
    </button>

    <button
      className="flex items-center gap-1.5 text-white/50 hover:text-[#E8A853] transition-colors duration-300"
      onClick={() => onShare(post.id)}
      aria-label="Share"
    >
      <Share2 size={size} />
    </button>
  </div>
);

// ---- Post grid (Behance-style cards, matching Projects/Brands) ----
const BlogPostsList = ({ isLoading, blogPosts, onSelectPost, onLike, onDislike, onShare }) => (
  <>
    {isLoading ? (
      <div className="flex justify-center py-16">
        <div className="size-8 rounded-full border-2 border-white/10 border-t-[#E8A853] animate-spin" />
      </div>
    ) : blogPosts.length === 0 ? (
      <div className="text-center py-14 bg-white/[0.03] rounded-3xl border border-white/[0.08]">
        <p className="text-white/50 text-sm">No posts available yet.</p>
      </div>
    ) : (
      <div className="grid gap-5 sm:grid-cols-2">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="post-reveal group flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-white/[0.03] overflow-hidden transition-all duration-500 hover:border-[#E8A853]/30"
          >
            <button onClick={() => onSelectPost(post)} className="text-left w-full">
              {post.imageUrl ? (
                <div className="relative overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-auto grayscale-[25%] group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/800x500/1a1a1a/E8A853?text=Insight";
                    }}
                  />
                  <span
                    className="absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white/60"
                    style={display}
                  >
                    {formatDate(post.timestamp)}
                  </span>
                </div>
              ) : (
                <div className="px-5 pt-5">
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/[0.1] text-white/40" style={display}>
                    {formatDate(post.timestamp)}
                  </span>
                </div>
              )}

              <div className="px-5 pt-4">
                <h3 className="text-[1.05rem] leading-snug text-white line-clamp-2" style={display}>{post.title}</h3>
                <p className={`${body} mt-1.5 line-clamp-2`}>{stripFormatting(truncateText(post.content, 140))}</p>
              </div>
            </button>

            <div className="flex items-center justify-between px-5 py-4 mt-3">
              <PostActions post={post} onLike={onLike} onDislike={onDislike} onShare={onShare} />
              <button
                onClick={() => onSelectPost(post)}
                className="shrink-0 flex items-center gap-1 text-xs text-white/60 border border-white/[0.1] group-hover:text-[#E8A853] group-hover:border-[#E8A853]/40 px-3 py-2 rounded-full transition-colors duration-300"
              >
                Expand <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </>
);

// ---- Full post reveal ----
const BlogPostDetail = ({ selectedPost, onBack, onLike, onDislike, onShare }) => {
  if (!selectedPost) return null;

  return (
    <div key={selectedPost.id} className="w-full animate-post-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-white/50 hover:text-[#E8A853] mb-5 transition-colors duration-300"
      >
        <ArrowLeft size={16} />
        Back to feed
      </button>

      <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.08]">
          <img src={model} alt="Emmanuel Ayeni" className="size-10 rounded-full object-cover ring-1 ring-white/[0.1]" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-white/90" style={display}>Moyinoluwa E. Ayeni</span>
              <VerifiedBadge size={14} gradientId="badge-detail" />
            </div>
            <span className="text-xs text-white/40">elias@monolithstudios</span>
          </div>
        </div>

        {selectedPost.imageUrl && (
          <div className="px-6 pt-5">
            {renderFeaturedImage(selectedPost.imageUrl, selectedPost.title)}
          </div>
        )}

        <div className="px-6 pt-5">
          <h2 className="text-xl leading-snug text-white" style={display}>{selectedPost.title}</h2>
        </div>

        <div className="px-6 mt-4 text-white/60 text-[15px] leading-relaxed">
          {renderContent(selectedPost.content)}
        </div>

        <div className="flex items-center gap-1.5 px-6 pt-5 pb-1 text-white/35 text-xs">
          <Calendar size={13} />
          {formatDate(selectedPost.timestamp)}
        </div>

        <div className="px-6 py-5 border-t border-white/[0.08] mt-3">
          <PostActions post={selectedPost} size={18} onLike={onLike} onDislike={onDislike} onShare={onShare} />
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  useEffect(() => {
    document.title = "Insights";
    return () => {
      document.title = "Moyinoluwa E. Ayeni";
    };
  }, []);

  const currentYear = new Date().getFullYear();

  // State for blog posts
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');

  // State for user ID
  const [userId, setUserId] = useState('');

  // Generate a unique user ID for the current session if not already set
  useEffect(() => {
    const storedUserId = localStorage.getItem('blogUserId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('blogUserId', newUserId);
      setUserId(newUserId);
    }
  }, []);

  // Fetch all blog posts
  useEffect(() => {
    const postsRef = collection(db, "blogPosts");
    const postsQuery = query(postsRef, orderBy("timestamp", "desc"));

    try {
      const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
          likedByCurrentUser: doc.data().likedBy?.includes(userId) || false,
          dislikedByCurrentUser: doc.data().dislikedBy?.includes(userId) || false
        }));

        setBlogPosts(postsData);
        setIsLoading(false);
      }, (error) => {
        console.error("Error listening to posts:", error);
        setError('Failed to load blog posts: ' + error.message);
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up blog posts listener:", err);
      setError('Failed to connect to database');
      setIsLoading(false);
    }
  }, [userId]);

  // Reveal post cards as they scroll into view.
  // Depends on blogPosts.length (not the array itself) so liking/disliking a post —
  // which replaces the array reference without changing how many posts exist —
  // doesn't re-trigger ScrollReveal and flicker every card on the page.
  useEffect(() => {
    if (!isLoading && !selectedPost) {
      ScrollReveal().reveal('.post-reveal', {
        distance: '20px',
        duration: 700,
        interval: 80,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: 0,
        reset: false,
      });
    }
  }, [isLoading, blogPosts.length, selectedPost]);

  const handleLikePost = async (postId) => {
    try {
      const postRef = doc(db, "blogPosts", postId);
      const postSnap = await getDoc(postRef);

      if (!postSnap.exists()) {
        setError('Post not found');
        setTimeout(() => setError(null), 3000);
        return;
      }

      const postData = postSnap.data();
      const alreadyLiked = postData.likedBy?.includes(userId);
      const alreadyDisliked = postData.dislikedBy?.includes(userId);

      if (alreadyLiked) {
        await updateDoc(postRef, {
          likes: increment(-1),
          likedBy: arrayRemove(userId)
        });

        setBlogPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId
              ? {...post, likes: Math.max(0, post.likes - 1), likedByCurrentUser: false}
              : post
          )
        );

        if (selectedPost && selectedPost.id === postId) {
          setSelectedPost(prev => ({
            ...prev,
            likes: Math.max(0, prev.likes - 1),
            likedByCurrentUser: false
          }));
        }
        return;
      }

      if (alreadyDisliked) {
        await updateDoc(postRef, {
          likes: increment(1),
          dislikes: increment(-1),
          likedBy: arrayUnion(userId),
          dislikedBy: arrayRemove(userId)
        });

        setBlogPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId
              ? {
                  ...post,
                  likes: post.likes + 1,
                  dislikes: Math.max(0, post.dislikes - 1),
                  likedByCurrentUser: true,
                  dislikedByCurrentUser: false
                }
              : post
          )
        );

        if (selectedPost && selectedPost.id === postId) {
          setSelectedPost(prev => ({
            ...prev,
            likes: prev.likes + 1,
            dislikes: Math.max(0, prev.dislikes - 1),
            likedByCurrentUser: true,
            dislikedByCurrentUser: false
          }));
        }
        return;
      }

      await updateDoc(postRef, {
        likes: increment(1),
        likedBy: arrayUnion(userId)
      });

      setBlogPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? {...post, likes: post.likes + 1, likedByCurrentUser: true}
            : post
        )
      );

      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost(prev => ({
          ...prev,
          likes: prev.likes + 1,
          likedByCurrentUser: true
        }));
      }
    } catch (err) {
      console.error("Error liking post:", err);
      setError('Failed to like post');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDislikePost = async (postId) => {
    try {
      const postRef = doc(db, "blogPosts", postId);
      const postSnap = await getDoc(postRef);

      if (!postSnap.exists()) {
        setError('Post not found');
        setTimeout(() => setError(null), 3000);
        return;
      }

      const postData = postSnap.data();
      const alreadyDisliked = postData.dislikedBy?.includes(userId);
      const alreadyLiked = postData.likedBy?.includes(userId);

      if (alreadyDisliked) {
        await updateDoc(postRef, {
          dislikes: increment(-1),
          dislikedBy: arrayRemove(userId)
        });

        setBlogPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId
              ? {...post, dislikes: Math.max(0, post.dislikes - 1), dislikedByCurrentUser: false}
              : post
          )
        );

        if (selectedPost && selectedPost.id === postId) {
          setSelectedPost(prev => ({
            ...prev,
            dislikes: Math.max(0, prev.dislikes - 1),
            dislikedByCurrentUser: false
          }));
        }
        return;
      }

      if (alreadyLiked) {
        await updateDoc(postRef, {
          likes: increment(-1),
          dislikes: increment(1),
          likedBy: arrayRemove(userId),
          dislikedBy: arrayUnion(userId)
        });

        setBlogPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId
              ? {
                  ...post,
                  likes: Math.max(0, post.likes - 1),
                  dislikes: post.dislikes + 1,
                  likedByCurrentUser: false,
                  dislikedByCurrentUser: true
                }
              : post
          )
        );

        if (selectedPost && selectedPost.id === postId) {
          setSelectedPost(prev => ({
            ...prev,
            likes: Math.max(0, prev.likes - 1),
            dislikes: prev.dislikes + 1,
            likedByCurrentUser: false,
            dislikedByCurrentUser: true
          }));
        }
        return;
      }

      await updateDoc(postRef, {
        dislikes: increment(1),
        dislikedBy: arrayUnion(userId)
      });

      setBlogPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? {...post, dislikes: (post.dislikes || 0) + 1, dislikedByCurrentUser: true}
            : post
        )
      );

      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost(prev => ({
          ...prev,
          dislikes: (prev.dislikes || 0) + 1,
          dislikedByCurrentUser: true
        }));
      }
    } catch (err) {
      console.error("Error disliking post:", err);
      setError('Failed to dislike post');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleSharePost = (postId) => {
    const shareUrl = `${window.location.origin}/blog/${postId}`;

    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopySuccess('Link copied!');
        setTimeout(() => setCopySuccess(''), 3000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
        setError('Failed to copy link');
        setTimeout(() => setError(null), 3000);
      });
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-[#f2f0ec] overflow-hidden">
      {/* same film-grain texture as the rest of the site */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="pointer-events-none fixed -top-32 left-[10%] w-[36rem] h-[36rem] z-0 opacity-[0.13] blur-[110px]"
        style={{ background: 'radial-gradient(circle, #E8A853, transparent 65%)' }}
      />
      <div
        className="pointer-events-none fixed top-60 right-[6%] w-[28rem] h-[28rem] z-0 opacity-[0.1] blur-[110px]"
        style={{ background: 'radial-gradient(circle, #7C6FF0, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-[900px] mx-auto pt-8 pb-24 px-5 sm:px-8">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-[11px] text-white/40 mb-6" style={display}>
          <Link to="/" className="hover:text-[#E8A853] transition-colors duration-300">Home</Link>
          <ChevronRight size={12} className="text-white/20" />
          <span className="text-white/70">Blog</span>
        </nav>

        {/* Header */}
        <div className="pb-8 mb-8 border-b border-white/[0.08]">
          <p className={eyebrow}>Insights</p>
          <h1 className="text-[1.8rem] md:text-[2.2rem] leading-tight mt-3" style={display}>
            Insights, articles &amp; <span className="bg-gradient-to-r from-[#E8A853] to-[#f2d6a3] bg-clip-text text-transparent">everything else.</span>
          </h1>
          <div className="flex items-center gap-2.5 mt-5">
            <img src={model} alt="Emmanuel Ayeni" className="size-8 rounded-full object-cover ring-1 ring-white/[0.1]" />
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-white/70" style={display}>Moyinoluwa E. Ayeni</span>
              <VerifiedBadge size={14} gradientId="badge-header" />
            </div>
          </div>
        </div>

        {/* Main content */}
        {error && (
          <div className="mb-5 py-2.5 px-4 bg-red-500/10 border border-red-500/20 rounded-xl text-sm">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {selectedPost ? (
          <BlogPostDetail
            selectedPost={selectedPost}
            onBack={() => setSelectedPost(null)}
            onLike={handleLikePost}
            onDislike={handleDislikePost}
            onShare={handleSharePost}
          />
        ) : (
          <BlogPostsList
            isLoading={isLoading}
            blogPosts={blogPosts}
            onSelectPost={setSelectedPost}
            onLike={handleLikePost}
            onDislike={handleDislikePost}
            onShare={handleSharePost}
          />
        )}

        {/* Footer */}
        <footer className="pt-8 mt-14 border-t border-white/[0.08] text-center">
          <p className="text-xs text-white/30">
            <span className="text-white/60" style={display}>Moyinoluwa E. Ayeni</span> © {currentYear} All rights reserved.
          </p>
        </footer>
      </div>

      {/* Floating home button */}
      <Link
        to="/"
        aria-label="Back to home"
        className="fixed bottom-22 right-6 z-20 flex items-center justify-center size-13 rounded-full bg-[#E8A853] hover:bg-[#f2d6a3] hover:scale-105 transition-all duration-300"
        style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.4), 0 0 20px rgba(232,168,83,0.15)' }}
      >
        <Home size={22} className="text-black" />
      </Link>

      {/* Copy success notification */}
      {copySuccess && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#E8A853] text-black py-2 px-4 rounded-full text-sm font-medium shadow-lg z-30">
          {copySuccess}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        @keyframes post-in {
          from { opacity: 0; transform: translateY(14px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-post-in { animation: post-in 500ms cubic-bezier(0.4, 0, 0.2, 1); }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-post-in { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default Blog;