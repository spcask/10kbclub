const fs = require('fs')
const path = require('path')
const urls = require('./urls')
const metrics = require('./metrics')

async function refreshMetrics (urlList) {
  const metricsList = []
  for (const [index, url] of urlList.entries()) {
    console.log('Fetching URL', (index + 1), 'of', urlList.length)
    const urlMetrics = await metrics.fetchURL(url)
    if (urlMetrics.totalSize <= 10240) {
      metricsList.push(urlMetrics)
    } else {
      console.log('Ignoring', url, 'because totalSize is too large\n')
    }
  }
  return metricsList.sort((a, b) => a.totalSize - b.totalSize)
}

function writeMetrics (metricsList) {
  const urlMetrics = {
    metricsTime: new Date().toUTCString(),
    metricsList: metricsList
  }
  const jsonString = JSON.stringify(urlMetrics, null, 2) + '\n'
  const metricsPath = path.join(__dirname, '..', 'metrics.json')
  fs.writeFileSync(metricsPath, jsonString, 'utf8')
  console.log('Updated metrics.json with latest data')
}

async function main () {
  const urlList = urls.map(item => item.url)
  const metricsList = await refreshMetrics(urlList)
  writeMetrics(metricsList)
}

main()
