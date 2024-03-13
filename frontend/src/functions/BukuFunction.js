import ConfigAxios from "../variabels/ConfigAxios";

export default class BukuFunction {

    constructor(buku, setBuku, checkStatus) {
        this.buku = buku
        this.setBuku = setBuku
        this.checkStatus = checkStatus;
    }

    async get() {
        try {
            const response = await ConfigAxios.get("/api/buku");
            this.setBuku(response.data.data);
        } catch (e) {
            this.checkStatus(e);
        }
    }

    async show(id) {
        try {
            const response = await ConfigAxios.get(`/api/buku/${id}`);
            return response.data.data;
        } catch (e) {
            this.checkStatus(e);
        }
    }

    async store(e) {
        try {
            e.preventDefault();
            const response = await ConfigAxios.post("/api/buku", new FormData(e.target));
            this.setBuku([response.data.data, ...this.buku]);
            e.target.reset()
        } catch (e) {
            this.checkStatus(e);
        }
    }

    async update(e, id) {
        try {
            e.preventDefault();
            const response = await ConfigAxios.put(`/api/buku/${id}`, new FormData(e.target));
        } catch (e) {
            this.checkStatus(e);
        }
    }

    async destroy(id) {
        try {
            await ConfigAxios.delete(`/api/buku/${id}`);
            this.setBuku(this.buku.filter((buku) => buku.id != id));
        } catch (e) {
            this.checkStatus(e);
        }
    }



}
