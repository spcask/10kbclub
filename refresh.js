const phantomas = require('phantomas')
const fs = require('fs')

async function fetchURL (url) {
  console.log('url:', url)
  const r = await phantomas(url)
  const m = r.getMetrics()

  const contentSize = m.htmlSize + m.jsonSize + m.imageSize +
                      m.base64Size + m.videoSize
  const extraSize = m.cssSize + m.jsSize + m.webfontSize + m.otherSize
  const totalSize = contentSize + extraSize
  const contentRatio = 100 * (contentSize / totalSize)

  console.log('htmlSize:', m.htmlSize)
  console.log('jsonSize:', m.jsonSize)
  console.log('imageSize:', m.imageSize)
  console.log('base64Size:', m.base64Size)
  console.log('videoSize:', m.videoSize)
  console.log('cssSize:', m.cssSize)
  console.log('jsSize:', m.jsSize)
  console.log('webfontSize:', m.webfontSize)
  console.log('otherSize:', m.otherSize)
  console.log('extraSize:', extraSize)
  console.log('contentSize:', contentSize)
  console.log('totalSize:', totalSize)
  console.log()

  return {
    url: url,
    contentSize: contentSize,
    extraSize: extraSize,
    totalSize: totalSize,
    contentRatio: contentRatio
  }
}

async function refreshMetrics (urls) {
  const metricsList = []
  for (const [index, url] of urls.entries()) {
    console.log('Fetching URL', (index + 1), 'of', urls.length)
    const metrics = await fetchURL(url)
    if (metrics.totalSize <= 10240) {
      metricsList.push(metrics)
    } else {
      console.log('Ignoring', url, 'because totalSize is too large\n')
    }
  }
  return metricsList.sort((a, b) => a.totalSize - b.totalSize)
}

function writeMetrics (metricsList) {
  const metrics = {
    metricsTime: new Date().toUTCString(),
    metricsList: metricsList
  }
  const jsonString = JSON.stringify(metrics, null, 2) + '\n'
  fs.writeFileSync('metrics.json', jsonString)
  console.log('Updated metrics.json with latest data')
}

async function main () {
  const lines = fs.readFileSync('urls.txt', 'utf8')
  const urls = lines.split('\n').filter(url => url !== '')
  const metricsList = await refreshMetrics(urls)
  writeMetrics(metricsList)
}

main()
