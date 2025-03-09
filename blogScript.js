document.addEventListener("DOMContentLoaded", () => {
    const blogData = document.getElementById("blog-data");
    const tagsList = document.getElementById("tags-list");
    const noFilterButton = document.getElementById("no-filter"); // "No Filter" button
    const uniqueTags = new Set();

    // Fetch posts from the JSON file
    fetch("posts.json")
        .then((response) => response.json())
        .then((data) => {
            data.posts.forEach((post) => {
                // Create the blog post structure
                const article = document.createElement("article");
                article.classList.add("blog-post");
                article.setAttribute("data-tags", post.tags.join(", "));
                article.innerHTML = `
                    <h2>${post.title}</h2>
                    <p class="post-date">${post.date}</p>
                    <p class="post-snippet">${post.snippet} <a href="${post.id}.html">Read more...</a></p>
                    <p class="post-tags">Tags: ${post.tags.map(tag => `<a href="#${encodeURIComponent(tag)}">${tag}</a>`).join(", ")}</p>
                `;
                blogData.appendChild(article);

                // Collect unique tags
                post.tags.forEach(tag => uniqueTags.add(tag));
            });

            // Populate the sidebar with unique tags
            uniqueTags.forEach(tag => {
                const listItem = document.createElement("li");
                const tagLink = document.createElement("a");
                tagLink.textContent = tag;
                tagLink.href = `#${encodeURIComponent(tag)}`;
                tagLink.setAttribute("data-tag", tag); // Store the tag name
                listItem.appendChild(tagLink);
                tagsList.appendChild(listItem);
            });

            // Add click event listener for "No Filter" button
            noFilterButton.addEventListener("click", (event) => {
                event.preventDefault(); // Prevent the default anchor behavior
                filterPostsByTag(null); // Pass `null` to show all posts
                window.location.hash = ""; // Clear the URL fragment
            });

            // Add click event listener to filter posts by tags
            tagsList.addEventListener("click", (event) => {
                const tag = event.target.getAttribute("data-tag");
                if (tag) {
                    event.preventDefault(); // Prevent default anchor behavior
                    filterPostsByTag(tag);
                    window.location.hash = tag; // Update the URL fragment
                }
            });

            // Function to filter blog posts by a tag
            function filterPostsByTag(tag) {
                document.querySelectorAll(".blog-post").forEach(post => {
                    if (!tag || post.getAttribute("data-tags").split(", ").includes(tag)) {
                        post.style.display = "block"; // Show all or matching posts
                    } else {
                        post.style.display = "none"; // Hide non-matching posts
                    }
                });
            }

            // Check for a URL fragment and filter on page load
            const urlTag = decodeURIComponent(window.location.hash.substring(1));
            if (urlTag) {
                filterPostsByTag(urlTag);
            }
        })
        .catch((error) => console.error("Error loading blog posts or tags:", error));
});
