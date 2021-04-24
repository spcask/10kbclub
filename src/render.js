const fs = require('fs')
const path = require('path')
const metrics = require('./metrics')

function makeDiscussionHTML (discussions) {
  let html = `
    <p>
      See the following discussions on content from this website:
    </p>
    <ul>
`
  for (const d of discussions) {
    let where
    let points
    if (d.url.startsWith('https://news.ycombinator.com/')) {
      where = 'HN'
      points = d.points
    } else if (d.url.startsWith('https://www.reddit.com/')) {
      where = 'r/' + d.url.split('/')[4]
      points = `&approx; ${d.points}`
    } else if (d.url.startsWith('https://lobste.rs/')) {
      where = 'Lobsters'
      points = d.points
    }
    html += `<li>
      <a href="${d.url}">${d.title}</a>
      (${points} points on ${where})
    </li>`
  }
  html += '</ul>'
  return html
}

function makeRowHTML (rank, urlMetrics, discussions) {
  const url = urlMetrics.url
  const website = url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const totalSize = urlMetrics.totalSize
  const contentSize = urlMetrics.contentSize
  const [totalKB, contentKB, contentRatio] = metrics.htmlSummary(urlMetrics)
  const discussionHTML = makeDiscussionHTML(discussions)
  return `  <tr class="data" id="data${rank}">
    <td class="rank">${rank}.</td>
    <td class="url"><a href="${url}" id="url${rank}">${website}</a></td>
    <td class="total" title="${totalSize} bytes">${totalKB}</td>
    <td class="content" title="${contentSize} bytes">${contentKB}</td>
    <td class="ratio">${contentRatio}</td>
  </tr>
  <tr class="info" id="info${rank}">
    <td colspan="5">
      ${discussionHTML}
    </td>
  </tr>\n`
}

function main () {
  const urlMap = {}
  const urlPath = path.join(__dirname, 'urls.json')
  const urlData = JSON.parse(fs.readFileSync(urlPath, 'utf8'))
  for (const urlItem of urlData) {
    urlMap[urlItem.url] = urlItem
  }

  const metricsPath = path.join(__dirname, '..', 'metrics.json')
  const urlMetrics = JSON.parse(fs.readFileSync(metricsPath, 'utf8'))

  let rowsHTML = ''
  for (const [i, m] of urlMetrics.metricsList.entries()) {
    rowsHTML += makeRowHTML(i + 1, m, urlMap[m.url].discussions)
  }
  console.log('rowsHTML:\n', rowsHTML)

  const metricsTime = urlMetrics.metricsTime
  const date = metricsTime.substring(0, 16)
  const time = metricsTime.substring(17, 22) + metricsTime.substring(25)
  console.log('date:', date)
  console.log('time:', time)

  const templatePath = path.join(__dirname, 'template.html')
  const template = fs.readFileSync(templatePath, 'utf8')
  const output = eval('`' + template + '`') // eslint-disable-line no-eval
  const outputPath = path.join(__dirname, '..', 'index.html')
  fs.writeFileSync(outputPath, output, 'utf8')
  console.log('Done rendering index.html')
}

main()
