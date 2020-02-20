fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nitinmanocha16')
   .then((res) => res.json())
   .then((data) => {
      
      const res = data.items 
      const posts = res.filter(item => item.categories.length > 0) 

      function toText(node) {
         let tag = document.createElement('div')
         tag.innerHTML = node
         node = tag.innerText
         return node
      }
      function shortenText(text,startingPoint ,maxLength) {
         return text.length > maxLength?
         text.slice(startingPoint, maxLength):
         text
      }


      let output = '';
      posts.forEach((item) => {
          var categories = ''
          item.categories.forEach((e)=>{
            categories = categories + " • " + e
          })
         output += `
                    <div class="blog-entry ftco-animate d-md-flex">
                    <a href="${item.link}" class="img img-2" style="background-image: url(${item.thumbnail});"></a>
                    <div class="text text-2 p-4">
          <h3 class="mb-2"><a href="">${shortenText(item.title, 0, 50)+ '...'}</a></h3>
          <div class="meta-wrap">
                            <p class="meta">
                  <span>${shortenText(item.pubDate,0 ,10)}</span>
                  <span><a href="${item.link}">${categories}</a></span>
                  <span> ${item.author}</span>
                  <span> </span>
              </p>
          </div>
          <p class="mb-4">${'...' + shortenText(toText(item.content),0, 300)+ '...'}</p>
          <p><a href="${item.link}" class="btn-custom">Read More <span class="ion-ios-arrow-forward"></span></a></p>
        </div>
                </div>
		 ` 
		 

      })
      document.querySelector('.blogsection').innerHTML = output
})

