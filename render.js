const fs = require('fs')

function htmlRow (rank, metrics) {
  const home = metrics.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const totalSize = metrics.totalSize
  const contentSize = metrics.contentSize
  const totalKB = (metrics.totalSize / 1024).toFixed(1)
  const contentKB = (metrics.contentSize / 1024).toFixed(1)
  const contentRatio = metrics.contentRatio.toFixed(0)
  return `  <tr>
    <td class="rank">${rank}.</a></td>
    <td class="url"><a href="${metrics.url}">${home}</a></td>
    <td class="total" title="${totalSize} bytes">${totalKB}&nbsp;KB</td>
    <td class="content" title="${contentSize} bytes">${contentKB}&nbsp;KB</td>
    <td class="ratio">${contentRatio}%</td>
  </tr>\n`
}

function main () {
  const metrics = JSON.parse(fs.readFileSync('metrics.json'))
  let htmlRows = ''
  for (const [i, m] of metrics.metricsList.entries()) {
    htmlRows += htmlRow(i + 1, m)
  }
  console.log('htmlRows:\n', htmlRows)

  const template = fs.readFileSync('template.html', 'utf8')
  const output = eval('`' + template + '`') // eslint-disable-line no-eval
  fs.writeFileSync('index.html', output, 'utf8')
  console.log('Done rendering index.html')
}

main()
