import React, { useState, useEffect } from 'react';
import model from '../assets/images/model.webp'
import bluecheck from '../assets/images/bluecheck.png'
import { Heart, ThumbsDown, User, Home, Calendar, ArrowLeft, Share2, CheckCircle } from 'lucide-react';
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

const Blog = () => {
  React.useEffect(() => {
    // Set page title when component mounts
    document.title = "Emmanuel's Blog";
    
    // Reset title when component unmounts
    return () => {
      document.title = "Emmanuel Ayeni";
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
  
  const handleLikePost = async (postId) => {
    try {
      // Get the post document
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
      
      // If already liked, remove the like
      if (alreadyLiked) {
        await updateDoc(postRef, {
          likes: increment(-1),
          likedBy: arrayRemove(userId)
        });
        
        // Update local state
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
      
      // If already disliked, remove dislike and add like
      if (alreadyDisliked) {
        await updateDoc(postRef, {
          likes: increment(1),
          dislikes: increment(-1),
          likedBy: arrayUnion(userId),
          dislikedBy: arrayRemove(userId)
        });
        
        // Update local state
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
      
      // Otherwise just add a like
      await updateDoc(postRef, {
        likes: increment(1),
        likedBy: arrayUnion(userId)
      });
      
      // Update local state
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
      // Get the post document
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
      
      // If already disliked, remove the dislike
      if (alreadyDisliked) {
        await updateDoc(postRef, {
          dislikes: increment(-1),
          dislikedBy: arrayRemove(userId)
        });
        
        // Update local state
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
      
      // If already liked, remove like and add dislike
      if (alreadyLiked) {
        await updateDoc(postRef, {
          likes: increment(-1),
          dislikes: increment(1),
          likedBy: arrayRemove(userId),
          dislikedBy: arrayUnion(userId)
        });
        
        // Update local state
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
      
      // Otherwise just add a dislike
      await updateDoc(postRef, {
        dislikes: increment(1),
        dislikedBy: arrayUnion(userId)
      });
      
      // Update local state
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
    
    // Copy to clipboard
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

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  // Truncate text for blog previews
  const truncateText = (text, maxLength = 280) => {
    if (!text || text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  // Content with Markdown-like rendering for simple formatting
  const renderContent = (content) => {
    if (!content) return '';

    // Replace URLs with clickable links
    let formatted = content.replace(
      /(https?:\/\/[^\s]+)/g, 
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:underline">$1</a>'
    );
    
    // Replace **bold** with <strong>
    formatted = formatted.replace(
      /\*\*(.*?)\*\*/g, 
      '<strong>$1</strong>'
    );
    
    // Replace *italic* with <em>
    formatted = formatted.replace(
      /\*(.*?)\*/g, 
      '<em>$1</em>'
    );
    
    // Replace newlines with <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    return <div dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  // Render featured image for blog post
  const renderFeaturedImage = (imageUrl, altText = "Blog post image") => {
    if (!imageUrl) return null;
    
    return (
      <div className="rounded-lg overflow-hidden">
        <img 
          src={imageUrl} 
          alt={altText} 
          className="w-full h-auto object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/800x400/6b21a8/ffffff?text=Image+Unavailable";
          }}
        />
      </div>
    );
  };

  const BlogPostsList = () => (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin"></div>
        </div>
      ) : blogPosts.length === 0 ? (
        <div className="text-center py-8 bg-black/50 rounded-3xl border border-white/10">
          <p className="text-white/60">No posts available yet.</p>
        </div>
      ) : (
        blogPosts.map((post) => (
          <div 
            key={post.id} 
            className="bg-black/80 border border-white/7 rounded-3xl overflow-hidden transition-all duration-300 hover:border-indigo-500/50"
          >
            {/* Post header with author info */}
            <div className="flex items-center px-4 py-3 border-b border-white/7">
              <div className="w-10 h-10 rounded-full bg-indigo-600/30 flex items-center justify-center">
                {/* <User size={18} className="text-indigo-400" /> */}
                <img src={model} alt="Emmy" className='rounded-full'/>
              </div>
              <div className="ml-3 flex items-center">
                <div className="text-white font-medium flex flex-col text-[12px]">Emmanuel Ayeni <span className='opacity-70 font-light text-xs'>@emmy</span></div>
                <div className="text-indigo-400 ml-1 mt-[-1.2rem]">
                  {/* <CheckCircle size={14} /> */}
                  <img src={bluecheck} alt="checkcircle" className='rounded-full size-4'/>
                </div>
              </div>
            </div>
            
            {/* Post title */}
            <div className="px-4 pt-3">
              <h3 className="text-lg font-medium text-white mb-2">{post.title}</h3>
            </div>
            
            {/* Post content */}
            <div className="px-4 text-white/80 text-sm leading-relaxed">
              {renderContent(truncateText(post.content, 280))}
            </div>
            
            {/* Featured image */}
            {post.imageUrl && (
              <div className="mt-3">
                {renderFeaturedImage(post.imageUrl, post.title)}
              </div>
            )}
            
            {/* Post date */}
            <div className="flex items-center px-4 pt-3">
              <Calendar size={14} className="text-gray-400 mr-1" />
              <div className="text-gray-400 text-xs">
                {formatDate(post.timestamp)}
              </div>
            </div>
            
            {/* Post actions */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/7 mt-3">
              <div className="flex space-x-5">
                <button 
                  className={`flex items-center ${
                    post.likedByCurrentUser 
                      ? 'text-indigo-400' 
                      : 'text-white/60 hover:text-indigo-400'
                  } transition-colors`}
                  onClick={() => handleLikePost(post.id)}
                >
                  <Heart 
                    size={16} 
                    className={`mr-1.5 ${post.likedByCurrentUser ? 'fill-indigo-400' : ''}`} 
                  />
                  <span className="text-sm">{post.likes || 0}</span>
                </button>
                
                <button 
                  className={`flex items-center ${
                    post.dislikedByCurrentUser 
                      ? 'text-red-400' 
                      : 'text-white/60 hover:text-red-400'
                  } transition-colors`}
                  onClick={() => handleDislikePost(post.id)}
                >
                  <ThumbsDown 
                    size={16} 
                    className={`mr-1.5 ${post.dislikedByCurrentUser ? 'fill-red-400' : ''}`} 
                  />
                  <span className="text-sm">{post.dislikes || 0}</span>
                </button>

                <button 
                  className="flex items-center text-white/60 hover:text-indigo-400 transition-colors"
                  onClick={() => handleSharePost(post.id)}
                >
                  <Share2 size={16} className="mr-1.5" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
              
              <button 
                onClick={() => setSelectedPost(post)}
                className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors"
              >
                View post
              </button>
            </div>
          </div>
        ))
      )}
      
      {/* Copy success notification */}
      {copySuccess && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-indigo-900 text-white py-2 px-4 rounded-full text-sm shadow-lg">
          {copySuccess}
        </div>
      )}
    </div>
  );
    
  const BlogPostDetail = () => {
    if (!selectedPost) return null;
    
    return (
      <div className="w-full">
        <button 
          onClick={() => setSelectedPost(null)}
          className="flex items-center text-white/60 hover:text-indigo-400 mb-4 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to feed
        </button>
        
        <div className="bg-black/80 border border-gray-800 rounded-3xl overflow-hidden">
          {/* Post header with author info */}
          <div className="flex items-center px-5 py-4 border-b border-gray-800">
            <div className="w-10 h-10 rounded-full bg-indigo-600/30 flex items-center justify-center">
              <User size={18} className="text-indigo-400" />
            </div>
            <div className="ml-3 flex items-center">
              <div className="text-white font-medium">Emmanuel Ayeni</div>
              <div className="text-indigo-400 ml-1">
                <CheckCircle size={14} />
              </div>
            </div>
          </div>
          
          {/* Post title */}
          <div className="px-5 pt-4">
            <h2 className="text-xl font-medium text-white mb-2">{selectedPost.title}</h2>
          </div>
          
          {/* Post content */}
          <div className="px-5 text-white/80 text-base leading-relaxed">
            {renderContent(selectedPost.content)}
          </div>
          
          {/* Featured image */}
          {selectedPost.imageUrl && (
            <div className="mt-4 px-5">
              {renderFeaturedImage(selectedPost.imageUrl, selectedPost.title)}
            </div>
          )}
          
          {/* Post date */}
          <div className="flex items-center px-5 pt-4 pb-2">
            <Calendar size={14} className="text-gray-400 mr-1" />
            <div className="text-gray-400 text-sm">
              {formatDate(selectedPost.timestamp)}
            </div>
          </div>
          
          {/* Post actions */}
          <div className="flex items-center px-5 py-4 border-t border-gray-800 mt-2">
            <button 
              className={`flex items-center mr-6 ${
                selectedPost.likedByCurrentUser 
                  ? 'text-indigo-400' 
                  : 'text-white/60 hover:text-indigo-400'
              } transition-colors`}
              onClick={() => handleLikePost(selectedPost.id)}
            >
              <Heart 
                size={18} 
                className={`mr-1.5 ${selectedPost.likedByCurrentUser ? 'fill-indigo-400' : ''}`} 
              />
              <span>{selectedPost.likes || 0}</span>
            </button>
            
            <button 
              className={`flex items-center mr-6 ${
                selectedPost.dislikedByCurrentUser 
                  ? 'text-red-400' 
                  : 'text-white/60 hover:text-red-400'
              } transition-colors`}
              onClick={() => handleDislikePost(selectedPost.id)}
            >
              <ThumbsDown 
                size={18} 
                className={`mr-1.5 ${selectedPost.dislikedByCurrentUser ? 'fill-red-400' : ''}`} 
              />
              <span>{selectedPost.dislikes || 0}</span>
            </button>

            <button 
              className="flex items-center text-white/60 hover:text-indigo-400 transition-colors"
              onClick={() => handleSharePost(selectedPost.id)}
            >
              <Share2 size={18} className="mr-1.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-black min-h-screen pt-3 pb-20">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-800 mb-4 sticky top-0 bg-black/90 backdrop-blur-md z-10">
        <h1 className="text-2xl font-semibold text-white">Insights</h1>
        <p className='text-white opacity-70 text-[10px]'>Memes, Expert Tips, Articles & Everything That's On My Mind</p>
      </div>
      
      {/* Main content container */}
      <div className="px-4">
        {/* Error message */}
        {error && (
          <div className="mb-4 py-2 px-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm">
            <p className="text-red-400">{error}</p>
          </div>
        )}
        
        {/* Main content - either post list or single post */}
        {selectedPost ? <BlogPostDetail /> : <BlogPostsList />}
      </div>
      
      {/* Floating action button */}
      <div className="fixed bottom-22 right-6.5 bg-indigo-600 rounded-full p-3.5 shadow-lg shadow-indigo-500/30 cursor-pointer hover:bg-indigo-700 transition-colors">
        <Link to='/'>
          <Home size={25} className="text-white" />
        </Link>
      </div>

      {/* Copy success notification */}
      {copySuccess && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-indigo-900 text-white py-2 px-4 rounded-full text-sm shadow-lg">
          {copySuccess}
        </div>
      )}

      {/* Footer */}
      <footer className="px-4 py-4 border-t border-gray-800 mt-10 text-center text-xs text-gray-400">
        <p>Emmanuel Ayeni © {currentYear} All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Blog;