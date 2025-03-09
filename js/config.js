// config.js

const paths = {
    images: "images/", // Base path for all images
    blogImages: "images/blog/", // Folder for blog-specific images
    portfolioImages: "images/portfolio/", // (Optional) Folder for portfolio images
    content: "data/content/", // Folder for blog content files
    json: "data/posts.json" // Path to your main JSON file
};

// Export `paths` so other scripts can use it (if you're using modern JS)
export default paths; // For ES6 modules

// Or just use it as a global variable if not using modules
