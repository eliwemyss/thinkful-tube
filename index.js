const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
var nextPage
var prevPage
var searchedTerm

function getApi(searchTerm, pageToken, callback) { 
	const query = {
		q: `${searchTerm}`,
		key: 'AIzaSyAguHxr44JrJWdif4UWRZD8NRTzrMRf5g4',
		part: 'snippet', 
		maxResults: 9,
    pageToken: pageToken
	}
  searchedTerm = searchTerm
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback)
};

function renderResults(result){ 
	return `
  <div class="result">
			<a href="https://www.youtube.com/watch?v=${result.id.videoId}"><img class="js-img" src="${result.snippet.thumbnails.medium.url}"></a>
			<div class="col">
				<p class="caption"><a href="https://www.youtube.com/watch?v=${result.snippet.channelId}">More videos by ${result.snippet.channelTitle}<p>
			</div>
		</div>
		`;
}

//getData happens for each item we come across
function getData(data){
  $('.js-results').html(data.items.map(renderResults)).append(renderPageNav(data))

console.log(data)
console.log(searchedTerm)
}

function listenSubmit(){ 
	$('.js-search-form').submit(function(event) {
		event.preventDefault();
		const searchTarget = $(event.currentTarget).find('.js-search-box'); 
		const search = searchTarget.val(); 
		searchTarget.val(""); 
		getApi(search, undefined, getData);
    $('.container').css('visibility', 'visible')
	});
};

function listenPageNav(data) {
  $('.js-results').on('click', '#next', function(event){
    getApi(searchedTerm, nextPage, getData)
  });
  $('.js-results').on('click', '#prev', function(event){
    getApi(searchedTerm, prevPage, getData)
  });
}

function renderPageNav (data) {
  nextPage = data.nextPageToken;
  prevPage = data.prevPageToken;
  let startTag = `<div class="pageNav"><form><fieldset>`;
  let endTag = `</fieldset></form></div>`;
  if (prevPage) {
    startTag += `<button type="button" id="prev" value="Prev">Prev</button>`
  }
  if (nextPage) {
    startTag += `<button type="button" id="next" value="Next">Next</button>`
  }
  return startTag + endTag
}

$(listenPageNav);
$(listenSubmit);