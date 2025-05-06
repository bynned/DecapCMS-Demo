import './style.css'
import { marked } from 'marked'

document.addEventListener('DOMContentLoaded', () => {
  const posts_en = import.meta.glob('./posts/en/*.md', { as: 'raw' })
  const posts_fi = import.meta.glob('./posts/fi/*.md', { as: 'raw' })

  const postsByLang = {
    en: posts_en,
    fi: posts_fi,
  }

  let currentLang = 'en'

  document.querySelector('#app').innerHTML = `
    <div>
      <h1>Blog Posts</h1>
      <label for="lang">Language:</label>
      <select id="lang">
        <option value="en">English</option>
        <option value="fi">Finnish</option>
      </select>
      <div id="content"></div>
    </div>
  `

  document.querySelector('#lang').addEventListener('change', (e) => {
    currentLang = e.target.value
    loadAllContent()
  })

  async function loadAllContent() {
    const contentContainer = document.querySelector('#content')
    contentContainer.innerHTML = ''

    const posts = postsByLang[currentLang]

    for (const path in posts) {
      const rawMarkdown = await posts[path]()
      const html = marked(rawMarkdown)

      const postDiv = document.createElement('div')
      postDiv.classList.add('post')
      postDiv.innerHTML = html
      contentContainer.appendChild(postDiv)
    }
  }

  loadAllContent()
})
