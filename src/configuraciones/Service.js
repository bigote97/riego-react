export async function getConfigurations() {
	let api_key = localStorage.getItem("api_key")
	let channels = localStorage.getItem("channels")
  const configs = {
    api_key: api_key && api_key !== null ? JSON.parse(api_key) : null,
		channels: channels ? JSON.parse(channels) : null,
  };
  return configs;
};

export async function postApiKey(body) {
	localStorage.setItem('api_key', JSON.stringify(body));
	let api_key = JSON.parse(localStorage.getItem("api_key"))
	return api_key
}

export async function deleteApiKey() {
	localStorage.removeItem('api_key');
	return 'SUCCESS'
}

export async function postChannel(body) {
	localStorage.setItem('channels', JSON.stringify(body));
	let channels = JSON.parse(localStorage.getItem("channels"))
	return channels
}
