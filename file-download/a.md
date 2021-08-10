a[download] 下载文件：
  下载 img（所有图片类型）、txt、json: 
    跨域下载（默认会在标签页内直接打开，而不是下载。需要先 xhr 下载后借助 Blob 转成同域名）
    同域下载（直接下载）
    
  docx/mp3: 不论是否跨域，都可直接下载

``` js
download('https://avatar-static.segmentfault.com/907/368/907368143-59924ba3762d6_huge128')
function download(url) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.send()
  xhr.responseType = 'blob'
  xhr.onload = function (e) {
    console.log(e, xhr.response)
    const fileName = 'demo.png'
    downloadImg(fileName, xhr.response)
  }
}

function downloadImg(fileName, blob) {
  const link = document.createElement('a')
  let blobUrl = window.URL.createObjectURL(blob)
  link.download = fileName
  link.href = blobUrl
  link.click()
  link.remove()
  window.URL.revokeObjectURL(blobUrl)
}
```
