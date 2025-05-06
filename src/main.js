import './style.css'
import { marked } from 'marked'

const posts = import.meta.glob('./posts/*.md', { as: 'raw' })

async function loadAllContent() {
  const contentContainer = document.querySelector('#content')
  contentContainer.innerHTML = ''

  for (const path in posts) {
    const rawMarkdown = await posts[path]()
    const html = marked(rawMarkdown)

    const postDiv = document.createElement('div')
    postDiv.classList.add('post')
    postDiv.innerHTML = html
    contentContainer.appendChild(postDiv)
  }
}

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Blog Posts</h1>
    <div id="content"></div>
  </div>
`

loadAllContent()
