fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nitinmanocha16')
   .then((res) => res.json())
   .then((data) => {
      // Filter for acctual posts. Comments don't have categories, therefore can filter for items with categories bigger than 0
      const res = data.items //This is an array with the content. No feed, no info about author etc..
      const posts = res.filter(item => item.categories.length > 0) // That's the main trick* !

      // Functions to create a short text out of whole blog's content
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

      // Put things in right spots of markup
      let output = '';
      posts.forEach((item) => {
         output += `
          <div class="aboutItem col-md-6 col-sm-6 col-xs-12 clearfix" data-scroll-reveal="enter right move">
                        <div class="aboutText">
							• <h4>${shortenText(item.title, 0, 50)+ '...'} </h4>
							<div>
								<img src="${item.thumbnail}"  style="width:300px; height:150px;"></img>
							</div>
							
										<h6><i class="fa fa-user fa-2x black"></i>  ${item.author} &nbsp &nbsp
										<i class="fa fa-clock-o fa-2x black"></i>  ${shortenText(item.pubDate,0 ,10)}</a></h6>
							
								<div class="aboutSeparator"></div>
								  <b><p class="blog__intro bold">${'...' + shortenText(toText(item.content),60, 300)+ '...'}</p></b>
								<a href="${item.link}" class="btn btn-default btn-black">Read More</a>
							</div>
						</div>
					</div><br><br>
		 ` 
		 

      })
      document.querySelector('.blogsection').innerHTML = output
})

