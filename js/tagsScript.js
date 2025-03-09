document.addEventListener("DOMContentLoaded", () => {
    const tagsList = document.getElementById("tags-list");
    const blogData = document.getElementById("blog-data");
    const uniqueTags = new Set();

    // Step 1: Fetch posts from the JSON file
    fetch("data/posts.json")
        .then((response) => response.json())
        .then((data) => {
            // Step 2: Collect unique tags and create blog posts dynamically
            data.posts.forEach((post) => {
                // Add blog post to the blog-data section
                const article = document.createElement("article");
                article.classList.add("blog-post");
                article.setAttribute("data-tags", post.tags.join(", "));
                article.innerHTML = `
                    <h2>${post.title}</h2>
                    <p class="post-date">${post.date}</p>
                    <p class="post-snippet">${post.snippet} <a href="${post.id}.html">Read more...</a></p>
                `;
                blogData.appendChild(article);

                // Collect unique tags
                post.tags.forEach((tag) => uniqueTags.add(tag));
            });

            // Step 3: Populate the tags list dynamically
            uniqueTags.forEach((tag) => {
                const listItem = document.createElement("li");
                const tagLink = document.createElement("a");
                tagLink.textContent = tag;
                tagLink.href = `#${encodeURIComponent(tag)}`; // Link with the tag as a hash fragment
                tagLink.setAttribute("data-tag", tag); // Store the tag name
                listItem.appendChild(tagLink);
                tagsList.appendChild(listItem);
            });

            // Step 4: Check for a tag in the URL and filter posts accordingly
            const urlTag = decodeURIComponent(window.location.hash.substring(1)); // Remove the "#" from the fragment
            if (urlTag) {
                filterPostsByTag(urlTag);
            }

            // Step 5: Add click event listener to tags for filtering
            tagsList.addEventListener("click", (event) => {
                event.preventDefault(); // Prevent default anchor behavior
                const tag = event.target.getAttribute("data-tag");
                if (tag) {
                    filterPostsByTag(tag);
                    window.location.hash = tag; // Update the URL fragment
                }
            });

            // Function to filter blog posts by a tag
            function filterPostsByTag(tag) {
                document.querySelectorAll(".blog-post").forEach((post) => {
                    const postTags = post.getAttribute("data-tags").split(", ");
                    if (postTags.includes(tag)) {
                        post.style.display = "block"; // Show matching posts
                    } else {
                        post.style.display = "none"; // Hide non-matching posts
                    }
                });
            }
        })
        .catch((error) => console.error("Error loading blog posts or tags:", error));
});
