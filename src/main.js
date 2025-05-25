import './style.css'
import { marked } from 'marked'

// Dynamically import all markdown files in the ./posts directory
// `as: 'raw'` tells Vite to import the file content as a plain string (not a module)
const postModules = import.meta.glob('./posts/*.md', { as: 'raw' })

// Main function to load all markdown posts and display them
async function loadAndRenderPosts() {
  // Create a container where posts will be rendered
  const content = document.createElement('div')
  content.id = 'content'

  // Load all posts in parallel, convert markdown to HTML using `marked`
  const posts = await Promise.all(
    Object.values(postModules).map(loader =>
      loader().then(marked) // Load each post, then parse markdown to HTML
    )
  )

  // For each post's HTML, create a <div> and append it to the container
  posts.forEach(html => {
    const post = document.createElement('div')
    post.className = 'post' // Add a class for optional styling
    post.innerHTML = html   // Inject parsed HTML content
    content.appendChild(post)
  })

  // Set the initial HTML structure of the page
  document.querySelector('#app').innerHTML = `
    <div>
      <h1>Blog Posts</h1>
    </div>
  `

  // Append the content (all posts) under the #app container
  document.querySelector('#app').appendChild(content)
}

// Kick off the loading and rendering of posts
loadAndRenderPosts()
