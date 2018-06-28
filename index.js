const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function buildApi(searchTerm, callback) { 
	const query = {
		q: `${searchTerm}`,
		key: 'AIzaSyAguHxr44JrJWdif4UWRZD8NRTzrMRf5g4',
		part: 'snippet', 
		maxResults: 8,
	}
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback)
};

function renderResults(result){ 
	return `
		<div class="col thumb">
			<a href="https://www.youtube.com/watch?v=${result.id.videoId}"><img class="js-img" src="${result.snippet.thumbnails.medium.url}"></a>
			<div class="col-4">
				<p class="channel"><a href="https://www.youtube.com/watch?v=${result.snippet.channelId}">More videos by ${result.snippet.channelTitle}<p>
			</div>
		</div>
		`
}



//getData happens for each item we come across
function getData(data){ 
	console.log(data); //so we can see the object we get
	const results = data.items.map((item) => renderResults(item)); 
	$('.js-results').html(results); 
}

function listenSubmit(){ 
	$('.js-search-form').submit(event => {
		event.preventDefault();
		const searchTarget = $(event.currentTarget).find('.js-search-box'); 
		const search = searchTarget.val(); 
		searchTarget.val(""); 
		buildApi(search, getData); 
	});
};


$(listenSubmit);