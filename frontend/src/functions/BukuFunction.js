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

    async store(e) {
        try {
            e.preventDefault();
            const response = await ConfigAxios.post("/api/buku", new FormData(e.target));
            this.setBuku([response.data.data, ...this.buku]);
        } catch (e) {
            this.checkStatus(e);
        }
    }





}
