import ConfigAxios from "../variabels/ConfigAxios";

export default class BagianFunction {

    constructor(checkStatus) {
        this.checkStatus = checkStatus
    }

    async store(e, buku_id) {
        try {
            e.preventDefault()
            const formData = new FormData(e.target);
            formData.append("buku_id", buku_id);
            const response = await ConfigAxios.post("/api/bagian", formData);
            return response.data.data;
        } catch (e) {
            return this.checkStatus(e);
        }
    }


}