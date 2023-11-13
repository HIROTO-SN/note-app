import axios from "axios";

const ENDPOINT_URL = 'http://localhost:3001/notes';

const noteApi = {
	async getAll() {
		const result = await axios.get(ENDPOINT_URL);
		return result.data;
	},
	async post(note) {
		const result = await axios.post(ENDPOINT_URL, note);
		return result.data;
	},
	async delete(note) {
		const result = await axios.delete(ENDPOINT_URL + '/' + note.id);
		return result.data;
	},
	async patch(note) {
		const result = await axios.put(ENDPOINT_URL + '/' + note.id, note);
		return result.data;
	}
}

export default noteApi;