import axios from "axios";


export function fetchData(url) {
	var arr = [];
	
	return new Promise(function(resolve, reject) {
		fetchOnePage(url);

		function fetchOnePage(pageUrl) {
			axios.get(pageUrl)
			.then(function(res) {
				arr = arr.concat(res.data.results);
				
				if(res.data.next) {
					fetchOnePage(res.data.next);
				}else {
					resolve(arr);
				}
			}).catch(function(err) {
				console.log(err);
			})
		}
	})
} 


export function fetchItem(url) {
	return axios.get(url)
	.then(function(res) {
		return res.data.name || res.data.title;
	}).catch(function(err) {
		console.log(err);
	})
}