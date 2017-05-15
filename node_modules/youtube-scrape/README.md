# youtube-scrape
Current usage is searching youtube for videos (only as of yet)

```

var yts = require('youtube-scrape')
yts('Gangnam Style').then((data) => {
  // data is an array with the first page of results
  console.log(data)
}, (error) => {
  // An error occurred
  console.log(error)
})


// Example data object
{
  content:
  [
    {
      title: 'OK Go - Red Star Macalline Commercial',
      link: 'https://www.youtube.com/watch?v=PjquJ5hi6zE',
      thumbnail: '//i.ytimg.com/vi/PjquJ5hi6zE/mqdefault.jpg',
      user: {
        name: 'OK Go',
        link: 'https://www.youtube.com/user/OkGo',
        verified: true
      },
      views: 1408415,
      length: '1:48',
      description: 'This is a commercial we did for the Chinese furniture store Red Star Macalline. It\'s a visual reference to our video "The Writing\'s on&nbsp;...'
    }
    //More entries in similar format
  ]
}
```
