import axios from "axios";

/**
 * Recursively get the data from the given URL. 
 * Keep fetching the data as long as the returning results
 * contains a "next page". Parse the results into an array.
 *
 * @param {string} url This is the starting URL we need to fetch 
 * 		data from.
 * @return {Promise} This returns a promise that yields the
 *      (future) fetched array. 
 */
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
			})
		}
	})
} 

/**
 * Fetch data from the given URL. 
 * Parse the result into an object
 *
 * @param {string} url This is the URL we need to fetch 
 * 		data from.
 * @return {Promise} This returns a promise that yields the
 *      (future) fetched object. 
 */
export function fetchItem(url) {
	return axios.get(url)
	.then(function(res) {
		return res.data;
	})
}