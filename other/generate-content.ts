import { faker } from '@faker-js/faker'
import fs from 'node:fs'
import path from 'node:path'

const stylesDir = `./src/content/styles-dev`
const contentDir = (pathname: string) => path.join(stylesDir, pathname)

const topLevelContentDirs = ['hip-hop', 'house', 'afrodance', 'jazz-funk']

async function populateFile(dir: string) {
  const id = faker.string.uuid()
  const title = faker.word.words({ count: { min: 1, max: 5 } })
  const slug = faker.helpers.slugify(title.toLowerCase())
  const image = `/styles/movements/dance4.webp`

  const fileTemplate = `
---
id: ${id} 
title: ${title} 
slug: ${slug} 
images:
  - altText: ${title} alt text
    src: ${image} 
---
`.trim()

  await fs.promises.writeFile(`${contentDir(dir)}/${slug}.md`, fileTemplate)
}

async function addContent(dir: string) {
  const d = contentDir(dir)
  if (!fs.existsSync(d)) {
    await fs.promises.mkdir(d).then(() => console.info(`Created dir '${d}'`))
  }
  const len = faker.number.int({ min: 1, max: 5 })
  for (let i = 0; i <= len; i++) {
    await populateFile(dir)
  }
}

async function addStyles() {
  if (!fs.existsSync(stylesDir)) {
    await fs.promises.mkdir(stylesDir).then(() => console.info(`Created styles dir`))
  }

  const populateFile = () => {
    const start = `---\nstyles:\n`
    const body = topLevelContentDirs
      .map(dir => `\t- name: ${dir.toUpperCase()}\n\tpath: ${dir}\n`)
      .join('')
    const end = `---`
    return start + body + end
  }
  await fs.promises.writeFile(`${stylesDir}/styles.md`, populateFile())
}

async function go() {
  if (process.env.NODE_ENV !== 'development') {
    console.error("NODE_ENV must be set to 'development'")
    process.exit(1)
  }
  await addStyles()
  await Promise.all(topLevelContentDirs.map(dir => addContent(dir)))
  process.exit(0)
}

go()
