'use strict'
let jsdom = require('jsdom')
let blingjs = require('./lib/bling.js')

let parseResults = (url) => {
  return new Promise(function(resolve, reject) {
    jsdom.env({
      url: url,
      src: [blingjs],
      done: (e, window) => {
        try {
          if (e) throw e
            // Instance of bling.js
          let $ = window.$

          let results = []
          $('ol.item-section>li').forEach((elem) => {
            let qs = elem.querySelectorAll.bind(elem)
            let innerElems = {
              title: qs('h3.yt-lockup-title > a')[0],
              thumb: qs('.yt-thumb-simple > img')[0],
              user: qs('.yt-lockup-byline > a')[0],
              views: qs('.yt-lockup-meta-info li')[1],
              verified: qs('.yt-channel-title-icon-verified')[0],
              length: qs('.video-time')[0],
              description: qs('.yt-lockup-description')[0],
              nextpage: qs('[data-link-type="next"]')[0]
            }

            let result = {
              title: innerElems.title.innerHTML,
              link: innerElems.title.href,
              thumbnail: (() => {
                let pre = innerElems.thumb.getAttribute('data-thumb')
                return (pre ? pre : innerElems.thumb.src)
              })(),
              user: {
                name: innerElems.user.innerHTML,
                link: innerElems.user.href,
                verified: !!innerElems.verified
              },
              views: parseInt(innerElems.views.innerHTML.replace(/,/g, '')),
              length: innerElems.length.innerHTML,
              description: innerElems.description.innerHTML
            }
            results.push(result)
          })
          resolve({
            nextpage: ()=>{
              return parseResults(innerElems.nextpage.href)
            },
            results: results
          })
        } catch (e) {
          if (e) reject(e)
        }
      }
    })
  })
}

let search = (query) => {
  query = query || ''
  query.replace(/\s/g, '+')
  let url = 'https://www.youtube.com/results?sp=EgIQAQ%253D%253D&q=' + query
  return parseResults(url)
}

module.exports = search

search('ok go').then((t)=>{
  // get page 2
  t.nextpage().then((k)=>{
    console.log(k)
  })
})
