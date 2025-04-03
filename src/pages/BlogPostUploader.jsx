import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Upload, Check, AlertCircle, ArrowLeft, Image as ImageIcon, X, Plus } from 'lucide-react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const BlogPostUploader = () => {
  // State for form inputs
  const [content, setContent] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  
  // State for multiple image handling
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [currentUploadIndex, setCurrentUploadIndex] = useState(0);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  // Debug state
  const [debugInfo, setDebugInfo] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Check each file
    const validFiles = files.filter(file => {
      // Check file type
      if (!file.type.match('image.*')) {
        setNotification({
          type: 'warning',
          message: `File ${file.name} is not an image and will be skipped.`
        });
        setTimeout(() => setNotification(null), 3000);
        return false;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setNotification({
          type: 'warning',
          message: `Image ${file.name} is larger than 5MB and will be skipped.`
        });
        setTimeout(() => setNotification(null), 3000);
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    // Add new files to existing ones
    setImageFiles(prev => [...prev, ...validFiles]);
    
    // Create previews for new files
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove a specific image
  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Remove all images
  const removeAllImages = () => {
    setImageFiles([]);
    setImagePreviews([]);
    setImageUploadProgress(0);
    setCurrentUploadIndex(0);
  };

  // Upload a single image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    // Create form data for upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'blog_uploads'); // You'll need to create this upload preset in your Cloudinary dashboard
    
    try {
      // Make API request to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/ddq9cwjkr/image/upload`, // Replace YOUR_CLOUD_NAME with your Cloudinary cloud name
        {
          method: 'POST',
          body: formData
        }
      );
      
      if (!response.ok) {
        throw new Error(`Cloudinary upload failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.secure_url; // Return the secure URL for the uploaded image
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

  // Upload all images to Cloudinary
  const uploadToCloudinary = async (files) => {
    setDebugInfo("Preparing to upload images to Cloudinary...");
    
    if (files.length === 0) return [];
    
    const imageUrls = [];
    setCurrentUploadIndex(0);
    
    try {
      for (let i = 0; i < files.length; i++) {
        setCurrentUploadIndex(i);
        setDebugInfo(`Uploading image ${i+1} of ${files.length}...`);
        
        // Calculate progress based on completed uploads and current upload progress
        // Each file is worth (100 / total files) percent of the total progress
        const baseProgress = (i / files.length) * 100;
        setImageUploadProgress(baseProgress);
        
        const url = await uploadImageToCloudinary(files[i]);
        imageUrls.push(url);
        
        // Update progress after successful upload
        setImageUploadProgress(((i + 1) / files.length) * 100);
      }
      
      setDebugInfo(`All images uploaded successfully! Count: ${imageUrls.length}`);
      return imageUrls;
    } catch (error) {
      console.error("Image upload error:", error);
      setDebugInfo(`Image upload error: ${error.message}`);
      // Return any successfully uploaded images
      return imageUrls;
    }
  };

  // Function to handle post submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setNotification({
        type: 'error',
        message: 'Content is required.'
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setIsSubmitting(true);
    setDebugInfo("Starting post submission...");

    try {
      let imageUrls = [];
      
      // First, upload images to Cloudinary if any are selected
      if (imageFiles.length > 0) {
        try {
          imageUrls = await uploadToCloudinary(imageFiles);
          setDebugInfo(`Image uploads successful: ${imageUrls.length} images uploaded`);
        } catch (imageError) {
          console.error("Error with image uploads:", imageError);
          setDebugInfo(`Some image uploads failed: ${imageError.message}`);
          
          setNotification({
            type: 'warning',
            message: 'Some image uploads failed. Proceeding with successful uploads.'
          });
          setTimeout(() => setNotification(null), 3000);
          // Continue with any successfully uploaded images
        }
      }
      
      // Now create the post in Firestore with the image URLs
      const db = getFirestore();
      setDebugInfo("Creating post in Firestore...");
      
      const docRef = await addDoc(collection(db, "blogPosts"), {
        content,
        readTime,
        imageUrls, // Array of Cloudinary URLs
        timestamp: serverTimestamp(),
        likes: 0,
        likedBy: []
      });
      
      setDebugInfo(`Post created successfully with ID: ${docRef.id}`);
      setNotification({
        type: 'success',
        message: 'Post published successfully!'
      });

      // Reset form
      setContent('');
      setReadTime('5 min read');
      setImageFiles([]);
      setImagePreviews([]);
      setImageUploadProgress(0);
      setCurrentUploadIndex(0);
      
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Error publishing post:", error);
      setDebugInfo(`Error: ${error.message}`);
      setNotification({
        type: 'error',
        message: 'Failed to publish post: ' + error.message
      });
      setTimeout(() => setNotification(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Alternative submission method that bypasses image upload
  const handleSubmitWithoutImage = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setNotification({
        type: 'error',
        message: 'Content is required.'
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create post without images
      const db = getFirestore();
      await addDoc(collection(db, "blogPosts"), {
        content,
        readTime,
        imageUrls: [], // Empty array for no images
        timestamp: serverTimestamp(),
        likes: 0,
        likedBy: []
      });
      
      setNotification({
        type: 'success',
        message: 'Post published without images!'
      });
      
      // Reset form
      setContent('');
      setReadTime('5 min read');
      setImageFiles([]);
      setImagePreviews([]);
      setCurrentUploadIndex(0);
      
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Error publishing post:", error);
      setNotification({
        type: 'error',
        message: 'Failed to publish post: ' + error.message
      });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderNotification = () => {
    if (!notification) return null;

    const { type, message } = notification;
    const bgColor = type === 'success' ? 'bg-green-500/10' : type === 'warning' ? 'bg-yellow-500/10' : 'bg-red-500/10';
    const borderColor = type === 'success' ? 'border-green-500/20' : type === 'warning' ? 'border-yellow-500/20' : 'border-red-500/20';
    const textColor = type === 'success' ? 'text-green-400' : type === 'warning' ? 'text-yellow-400' : 'text-red-400';
    const Icon = type === 'success' ? Check : AlertCircle;

    return (
      <div className={`mb-6 flex items-center justify-center py-3 ${bgColor} border ${borderColor} rounded-xl transition-all`}>
        <Icon size={18} className={`${textColor} mr-2`} />
        <p className={textColor}>{message}</p>
      </div>
    );
  };

  // Render content with simple formatting
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

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-indigo-500/20 rounded-2xl p-6 mt-12 shadow-xl shadow-indigo-500/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="flex items-center">
          <div className="absolute -left-2 -top-2 w-10 h-10 bg-indigo-500 rounded-full blur-xl opacity-30"></div>
          <Upload className="text-indigo-400 mr-3" size={22} />
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Create New Post</h1>
            <p className="text-white/60 text-sm">Share your thoughts with the world</p>
          </div>
        </div>
        
        <Link
         to="/blogs"
          className="flex items-center text-white/60 hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          All posts
        </Link>
      </div>

      {renderNotification()}
      
      {/* Debug info */}
      {debugInfo && (
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <h3 className="text-blue-400 font-medium mb-2">Debug Info:</h3>
          <pre className="text-white/70 text-sm whitespace-pre-wrap">{debugInfo}</pre>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="content" className="block text-white mb-2">Post Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 h-56"
                placeholder="Write your post content..."
              ></textarea>
              <p className="text-white/60 text-xs mt-2">
                Formatting: Use *text* for italic, **text** for bold, and URLs will be auto-linked
              </p>
            </div>
            
            {/* Multiple image upload section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-white">Images (optional)</label>
                {imageFiles.length > 0 && (
                  <button 
                    type="button"
                    onClick={removeAllImages}
                    className="text-white/60 hover:text-red-400 text-xs transition-colors"
                  >
                    Remove all
                  </button>
                )}
              </div>
              
              {/* Image preview grid */}
              {imagePreviews.length > 0 && (
                <div className="mb-3">
                  <div className="grid grid-cols-3 gap-2">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="w-full aspect-square bg-indigo-500/20 rounded overflow-hidden">
                          <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white/80 hover:text-red-400 transition-colors"
                        >
                          <X size={16} />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white/80 text-xs p-1 truncate">
                          {imageFiles[index].name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Upload button */}
              <label className="flex items-center justify-center w-full bg-white/5 border border-dashed border-white/20 rounded-xl p-4 cursor-pointer hover:border-indigo-500/40 transition-colors">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="hidden"
                  multiple
                />
                <Plus size={20} className="text-indigo-400 mr-2" />
                <span className="text-white/80">
                  {imageFiles.length > 0 ? 'Add more images' : 'Upload images'}
                </span>
              </label>
              
              {/* Upload progress indicator */}
              {imageUploadProgress > 0 && imageUploadProgress < 100 && isSubmitting && (
                <div className="mt-2">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${imageUploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-white/60 text-xs mt-1">
                    Uploading image {currentUploadIndex + 1} of {imageFiles.length} ({Math.round(imageUploadProgress)}%)
                  </p>
                </div>
              )}
              
              {/* Image count indicator */}
              {imageFiles.length > 0 && (
                <p className="text-white/60 text-xs mt-2">
                  {imageFiles.length} {imageFiles.length === 1 ? 'image' : 'images'} selected 
                  ({(imageFiles.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024).toFixed(2)} MB total)
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="readTime" className="block text-white mb-2">Read Time</label>
              <select
                id="readTime"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="1 min read">1 min read</option>
                <option value="3 min read">3 min read</option>
                <option value="5 min read">5 min read</option>
                <option value="10 min read">10 min read</option>
                <option value="15+ min read">15+ min read</option>
              </select>
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:bg-indigo-800/50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <Upload size={18} className="mr-2" />
                    Publish Post
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleSubmitWithoutImage}
                disabled={isSubmitting}
                className="flex-none bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:bg-gray-800/50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                ) : (
                  "Skip Images"
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Preview Section */}
        <div className="lg:block">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
            <h3 className="text-lg font-medium text-white mb-2">Preview</h3>
            <div className="mt-4">
              {imagePreviews.length > 0 && (
                <div className="mb-4 space-y-3">
                  {/* Preview only the first image in the main preview */}
                  <div className="rounded-xl overflow-hidden">
                    <img src={imagePreviews[0]} alt="Main post image" className="w-full h-auto" />
                  </div>
                  
                  {/* If there are more images, show thumbnails */}
                  {imagePreviews.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {imagePreviews.slice(1).map((preview, index) => (
                        <div key={index} className="w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                          <img src={preview} alt={`Additional image ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="prose prose-lg prose-invert max-w-none text-white/90">
                {content ? (
                  renderContent(content)
                ) : (
                  <p className="text-white/50 italic">Post content will appear here...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostUploader;