import React from 'react';
import './Blogs.css';

const Blogs = () => {
  return (
    <section id="blogs" className="blogs-section">
      <h2>Latest Blog Posts</h2>
      <div className="blogs-grid">
        <div className="blog-card">
          <h3>Blog Post Title 1</h3>
          <p className="blog-date">January 1, 2024</p>
          <p className="blog-excerpt">Short description of the blog post...</p>
          <a href="/blog/post-1" className="read-more">Read More</a>
        </div>
        <div className="blog-card">
          <h3>Blog Post Title 2</h3>
          <p className="blog-date">January 2, 2024</p>
          <p className="blog-excerpt">Short description of the blog post...</p>
          <a href="/blog/post-2" className="read-more">Read More</a>
        </div>
      </div>
    </section>
  );
};

export default Blogs; 