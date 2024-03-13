import ConfigAxios from "../variabels/ConfigAxios";

export default class BagianFunction {

    constructor(checkStatus) {
        this.checkStatus = checkStatus
    }

    async show (id){
        try{
            const response = await ConfigAxios.get(`/api/bagian/${id}`);
            return response.data.data
        }catch(e){
            return this.checkStatus(e);
        }
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

    async update(e, bagian_id) {
        try {
            e.preventDefault()
            const formData = new FormData(e.target);
            const response = await ConfigAxios.put(`/api/bagian/${bagian_id}`, formData);
            e.target.reset()
            return response.data.data;
        } catch (e) {
            return this.checkStatus(e);
        }
    }

    async destroy(id) {
        try {
            await ConfigAxios.delete(`/api/bagian/${id}`);
        } catch (e) {
            return this.checkStatus(e);
        }
    }


}