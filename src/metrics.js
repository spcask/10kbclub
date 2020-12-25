const phantomas = require('phantomas')

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
  console.log('contentSize:', contentSize)
  console.log('extraSize:', extraSize)
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

function textSummary(urlMetrics) {
  return [
    (urlMetrics.totalSize / 1024).toFixed(1) + ' KB',
    (urlMetrics.contentSize / 1024).toFixed(1) + ' KB',
    contentRatio = urlMetrics.contentRatio.toFixed(0) + '%'
  ]
}

function htmlSummary(urlMetrics) {
  let [totalKB, contentKB, contentRatio] = textSummary(urlMetrics)
  return [
    totalKB.replace(' ', '&nbsp;'),
    contentKB.replace(' ', '&nbsp;'),
    contentRatio.replace(' ', '&nbsp;')
  ]
}

async function main() {
  const args = process.argv.slice(2)
  for (const arg of args) {
    const urlMetrics = await fetchURL(arg)
    const [totalKB, contentKB, contentRatio] = textSummary(urlMetrics)
    console.log('total size:', totalKB)
    console.log('content size:', contentKB)
    console.log('content ratio:', contentRatio)
    console.log()
  }
}

if (require.main === module) {
  main()
}

module.exports = {
  fetchURL: fetchURL,
  textSummary: textSummary,
  htmlSummary: htmlSummary
}
