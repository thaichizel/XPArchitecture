document.addEventListener("DOMContentLoaded", () => {
    const postId = "post1"; // Change this for each post (e.g., post1, post2)

    // Fetch posts from JSON
    fetch("posts.json")
        .then((response) => response.json())
        .then((data) => {
            // Find the post with the matching ID
            const post = data.posts.find((p) => p.id === postId);
            if (post) {
                // Update the page content
                document.getElementById("post-title").textContent = post.title;
                document.title = post.title; // Update the browser tab title
                document.getElementById("post-date").textContent = post.date;

                // Populate the tags
                const tagsContainer = document.getElementById("post-tags");
                post.tags.forEach((tag) => {
                    const tagLink = document.createElement("a");
                    tagLink.href = `tags.html#${encodeURIComponent(tag)}`;
                    tagLink.textContent = tag;
                    tagsContainer.appendChild(tagLink);
                    tagsContainer.appendChild(document.createTextNode(", "));
                });
                tagsContainer.textContent = tagsContainer.textContent.slice(0, -2); // Remove trailing comma

                // Populate the content
                document.getElementById("post-body").textContent = post.content;
            }
        })
        .catch((error) => console.error("Error loading post data:", error));
});
