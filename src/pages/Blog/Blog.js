import React from "react";
import "./Blog.css";

const blogs = [
  {
    id: 1,
    title: "Top 5 Real Estate Investment Tips",
    image:
      "https://assets-news.housing.com/news/wp-content/uploads/2021/11/25203239/Indian-property-market-shutterstock_1700575657-1200x700-compressed.jpg",
    excerpt:
      "Learn how to maximize your returns and choose the best properties for investment.",
    link: "https://www.investopedia.com/investing/simple-ways-invest-real-estate/",
  },
  {
    id: 2,
    title: "Modern Home Design Trends 2026",
    image:
      "https://lambiehomes.com/wp-content/uploads/2025/01/ADP_8771-1024x682.jpg",
    excerpt:
      "Discover the latest design trends that make homes functional, stylish, and sustainable.",
    link: "https://www.homedit.com/category/architecture/",
  },
  {
    id: 3,
    title: "How to Sell Your Property Fast",
    image:
      "https://images.agentloft.com/rr-images/uploads/rr-blogs-migrated/Sell-Buy-Same-Time.png",
    excerpt:
      "A step-by-step guide to attract buyers and sell your property quickly.",
    link: "https://www.ghar.tv/blog/complete-guide-to-selling-your-property-fast-in-india-expert-tips-strategies/artid3471",
  },
];

const Blog = () => {
  return (
    <section className="blog-section">
      <div className="blog-container">
        <h2 className="section-title">Our Blog</h2>

        <div className="blog-grid">
          {blogs.map((blog) => (
            <div className="blog-card" key={blog.id}>
              <img
                src={blog.image}
                alt={blog.title}
                className="blog-image"
                loading="lazy"
              />

              <div className="blog-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>

                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-btn"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
