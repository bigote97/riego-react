export async function getCiudad() {
	let ciudad = localStorage.getItem("ciudad")
  return ciudad && ciudad !== null ? JSON.parse(ciudad) : null

};

export async function postCiudad(body) {
	localStorage.setItem('ciudad', JSON.stringify(body));
	let ciudad = JSON.parse(localStorage.getItem("ciudad"))
	return ciudad
}

export async function deleteCiudad() {
	localStorage.removeItem('ciudad');
	return 'SUCCESS'
}