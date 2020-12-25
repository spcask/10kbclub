const fs = require('fs')
const path = require('path')
const urls = require('./urls')
const metrics = require('./metrics')

function htmlRow (rank, urlMetrics, info) {
  const url = urlMetrics.url
  const website = url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const totalSize = urlMetrics.totalSize
  const contentSize = urlMetrics.contentSize
  const [totalKB, contentKB, contentRatio] = metrics.htmlSummary(urlMetrics)
  return `  <tr class="data" id="data${rank}">
    <td class="rank">${rank}.</td>
    <td class="url"><a href="${url}" id="url${rank}">${website}</a></td>
    <td class="total" title="${totalSize} bytes">${totalKB}&nbsp;KB</td>
    <td class="content" title="${contentSize} bytes">${contentKB}&nbsp;KB</td>
    <td class="ratio">${contentRatio}%</td>
  </tr>
  <tr class="info" id="info${rank}">
    <td colspan="5">
      ${info}
    </td>
  </tr>\n`
}

function main () {
  const metricsPath = path.join(__dirname, '..', 'metrics.json')
  const urlMetrics = JSON.parse(fs.readFileSync(metricsPath, 'utf8'))
  const urlMap = {}
  for (const urlItem of urls) {
    urlMap[urlItem.url] = urlItem
  }

  let htmlRows = ''
  for (const [i, m] of urlMetrics.metricsList.entries()) {
    htmlRows += htmlRow(i + 1, m, urlMap[m.url].info.trim())
  }
  console.log('htmlRows:\n', htmlRows)

  const metricsTime = urlMetrics.metricsTime
  const date = metricsTime.substring(0, 16)
  const time = metricsTime.substring(17, 22) + metricsTime.substring(25)

  const templatePath = path.join(__dirname, 'template.html')
  const template = fs.readFileSync(templatePath, 'utf8')
  const output = eval('`' + template + '`') // eslint-disable-line no-eval
  const outputPath = path.join(__dirname, '..', 'index.html')
  fs.writeFileSync(outputPath, output, 'utf8')
  console.log('Done rendering index.html')
}

main()
