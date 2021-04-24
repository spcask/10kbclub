const fs = require('fs')
const path = require('path')

function forumPriority (forumURL) {
  if (forumURL.startsWith('https://www.reddit.com/')) {
    return 1
  } else if (forumURL.startsWith('https://news.ycombinator.com/')) {
    return 2
  } else if (forumURL.startsWith('https://lobste.rs/')) {
    return 2
  } else {
    return -1
  }
}

function main () {
  const urlPath = path.join(__dirname, 'urls.json')
  const urlData = JSON.parse(fs.readFileSync(urlPath, 'utf8'))

  let prevURL = ''
  for (const urlItem of urlData) {
    // Validate that URLs are in ascending order.
    const currURL = urlItem.url
    if (currURL < prevURL) {
      console.log('Website', currURL, 'must come earlier in the list')
      return
    }
    prevURL = currURL

    // Validate that discussion URLs are in (forum priority, date) order.
    let prevForumPriority = 0
    let prevDate = ''
    for (const d of urlItem.discussions) {
      // Validate that discussion URLs are in forum priority order.
      const currForumPriority = forumPriority(d.url)
      if (currForumPriority === -1) {
        console.log('Discussion', d.url, 'is from an unrecognized forum')
        return
      } else if (currForumPriority < prevForumPriority) {
        console.log('Discussion', d.url, 'must come earlier in the',
          'list due to forum priority')
        return
      } else if (currForumPriority > prevForumPriority) {
        prevDate = ''
      }
      prevForumPriority = currForumPriority

      // Validate that discussion URLs are in chronological order.
      const currDate = d.date
      if (currDate < prevDate) {
        console.log('Discussion', d.url, 'must come earlier in the',
          'list due to date order')
        return
      }
      prevDate = currDate
    }
  }
}

main()
