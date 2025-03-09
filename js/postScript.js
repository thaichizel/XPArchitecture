fetch("data/posts.json")
    .then(response => response.json())
    .then(data => {
        const postId = "post1"; // Example: Dynamically determine this based on the URL or context
        const post = data.posts.find(p => p.id === postId);

        if (post) {
            // Update metadata
            document.title = post.title;
            document.getElementById("post-title").textContent = post.title;
            document.getElementById("post-date").textContent = post.date;
            document.getElementById("post-tags").innerHTML = `Tags: ${post.tags.map(tag => `<a href="#${encodeURIComponent(tag)}">${tag}</a>`).join(", ")}`;

            // Fetch and render the content from the external .txt file
            fetch(post.content)
                .then(response => response.text())
                .then(content => {
                    document.getElementById("post-body").innerHTML = content;
                });

            // Render images
            const postBody = document.getElementById("post-body");
            post.images.forEach(image => {
                const imgElement = document.createElement("img");
                imgElement.src = image.src;
                imgElement.alt = image.alt;
                imgElement.classList.add("blog-image");
                postBody.appendChild(imgElement);
            });
        } else {
            console.error("Post not found!");
        }
    })
    .catch(error => console.error("Error fetching post:", error));
