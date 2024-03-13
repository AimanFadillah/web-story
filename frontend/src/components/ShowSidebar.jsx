import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataContext from "../variabels/Context";
import Modal from "./Modal";
import Input from "./Input";
import CloseModal from "../functions/CloseModal";
import Page404 from "../pages/404";

export default function ShowSidebar(props) {
    const [show,setShow] = useState({bagians:[]});
    const {bagianFunction,bukuFunction} = useContext(DataContext);
    const id = useParams().id;
    const nav = useNavigate();

    useEffect(() => {
        document.body.removeAttribute("style");
        getBuku();
    },[]);

    const getBuku = useCallback(async () => {
        setShow(await bukuFunction.show(id));
    },[]);

    return show != null ? <>
            <header className="navbar sticky-top bg-primary p-1 shadow ">
                <div className="navbar text-decoration-none fw-bold me-0 px-3 fs-5 col-md-12 col-10 text-white">
                    <div>
                        {show.nama}   
                    </div>
                    <div className="d-none d-md-flex gap-4 ">
                        <i data-bs-toggle="modal" data-bs-target="#editBuku" className="bi bi-pencil"></i>
                        <i onClick={async (e) => {
                            if(confirm("Yakin ingin menghapus buku ini?")){
                                await bukuFunction.destroy(id);
                                nav("/")
                            }
                        }} className="bi bi-trash"></i>
                    </div>
                </div>
                <ul className="navbar-nav d-md-none">
                    <li className="nav-item text-nowrap">
                        <button
                            className="nav-link px-3 text-white"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#sidebarMenu"
                            aria-controls="sidebarMenu"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <i className="bi bi-list fs-3"></i>
                        </button>
                    </li>
                </ul>
            </header>

            <div className="container-fluid ">
                <div className="row">
                    <div className="sidebar col-md-3 col-lg-2 p-0 bg-dark fixed-top h-md-100 mt-5 z-md-2" >
                        <div
                            className="offcanvas-md offcanvas-end bg-dark"
                            tabIndex="-1"
                            id="sidebarMenu"
                            aria-labelledby="sidebarMenuLabel"
                        >
                            <div className="offcanvas-header ">
                                <h5 className="offcanvas-title text-light" id="sidebarMenuLabel">Menu</h5>
                                <div style={{ cursor:"pointer" }}
                                    className="bi bi-x-lg fs-4 text-light"
                                    data-bs-dismiss="offcanvas"
                                    data-bs-target="#sidebarMenu"
                                    aria-label="Close"
                                ></div>
                            </div>
                            
                            <div className="offcanvas-body d-md-flex p-0 pt-lg-3 overflow-y-auto">
                                <ul className="nav w-100 d-block" style={{ height:window.innerHeight - 70,overflowY:"scroll" }} >
                                    <li className="nav-item my-2 d-flex align-items-center justify-content-between px-3">
                                        <div className="text-light">
                                            Bagian
                                        </div>
                                        <div className="text-light">
                                            <div className="pointer" data-bs-toggle="modal" data-bs-target="#tambahBagian" >
                                                <i className="bi bi-plus-lg"></i>
                                            </div>
                                        </div>
                                    </li>
                                    {show.bagians.map((bagian,index) => 
                                    <li key={index} className="nav-item my-2">
                                        <Link className={`nav-link d-flex align-items-center gap-2 text-light `} aria-current="page" to="/">
                                            <i className="bi bi-card-text"></i> 
                                            <div className="text-truncate">
                                                {bagian.nama}
                                            </div>
                                        </Link>
                                    </li>
                                    )}
                                </ul>
                            </div>

                        </div>
                    </div>

                    <Modal target={"editBuku"} >
                        <form onSubmit={async (e) => {
                            await bukuFunction.update(e,id)
                            CloseModal("#editBuku")
                            getBuku()
                        }} >
                        <h2 className="text-center text-primary fw-bold " >Edit Buku </h2>
                            <div className="mb-3">
                                <Input type="text" required={true} value={show.nama} name="nama" />
                            </div>
                            <button className="text-center btn btn-primary mt-2 shadow w-100" >Buat ✨</button>
                        </form>
                    </Modal>

                    <Modal target={"tambahBagian"} >
                        <form onSubmit={async (e) => {
                            await bagianFunction.store(e,show.id)
                            CloseModal("#tambahBagian")
                            getBuku()
                        }} >
                        <h2 className="text-center text-primary fw-bold " >Tambah Bagian</h2>
                            <div className="mb-3">
                                <Input type="text" required={true} name="nama" />
                            </div>
                            <button className="text-center btn btn-primary mt-2 shadow w-100" >Tambah ✨</button>
                        </form>
                    </Modal>

                    <main className={`col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3 ${props.className}`}>
                        {props.children}
                    </main>
                </div>
            </div>
        </> : <Page404/>
}