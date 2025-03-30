self.onmessage = async function(event) {
	const { feedUrls } = event.data;
	
	const fetchFeed = (url) => {
		const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
		return fetch(proxyUrl)
			.then(res => res.json())
			.then(data => JSON.parse(data.contents))
			.catch(() => null);
	};
	
	try {
		const results = await Promise.all(feedUrls.map(fetchFeed));
		self.postMessage({ success: true, data: results });
	} catch (error) {
		self.postMessage({ success: false, error: "Gagal mengambil feed!" });
	}
};