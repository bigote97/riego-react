export async function getRiegos() {
	let channels = localStorage.getItem("channels")
	return channels ? JSON.parse(channels) : null
};

export async function putRiego(riegoID, status) {
    console.log(`Cambiar estado del riego ${riegoID} a ${status}`)
    return status
}
