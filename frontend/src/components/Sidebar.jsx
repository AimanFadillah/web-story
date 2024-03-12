import { useCallback, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import DataContext from "../variabels/Context";
import Modal from "./Modal";
import Input from "./Input";
import ConfigAxios from "../variabels/ConfigAxios";

export default function Sidebar(props) {
    const {userFunction,bukuFunction,checkStatus} = useContext(DataContext);

    useEffect(() => {
        document.body.removeAttribute("style");
    },[]);

    return (
        <>
            <header className="navbar sticky-top bg-primary p-1 shadow ">
                <Link className="navbar text-decoration-none fw-bold me-0 px-3 fs-5 col-md-12 col-10 text-white" to="/">
                    <div>
                        Write Story
                    </div>
                    <div className="d-none d-md-flex gap-4 ">
                        <i className="bi bi-search"></i>
                    </div>
                </Link>
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
                    {props.show == true ?
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
                                <ul className="nav d-block" style={{ height:window.innerHeight - 70,overflowY:"scroll" }} >
                                    {[1,1].map(() => 
                                    <li className="nav-item my-2">
                                        <Link className={`nav-link d-flex align-items-center gap-2 text-light `} aria-current="page" to="/">
                                            <i className="bi bi-card-text"></i> 
                                            <div className="text-truncate">
                                                Maling kundang adasdasd
                                            </div>
                                        </Link>
                                    </li>
                                    )}
                                </ul>
                            </div>

                        </div>
                    </div>
                    : <div className="sidebar col-md-3 col-lg-2 p-0 bg-dark fixed-top h-md-100 mt-5 z-md-2" >
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
                                <ul className="nav d-block" style={{ height:window.innerHeight - 70,overflowY:"scroll" }} >
                                    <li className="nav-item my-2">
                                        <Link className={`nav-link d-flex align-items-center gap-2 text-light `} aria-current="page" to="/">
                                            <i className="bi bi-search"></i>
                                            <div className="text-truncate">
                                                Buku-Buku
                                            </div>
                                        </Link>
                                        <Link className={`nav-link d-flex align-items-center gap-2 text-light `} aria-current="page" to="/">
                                            <i className="bi bi-journals"></i>
                                            <div className="text-truncate">
                                                Buku Saya
                                            </div>
                                        </Link>
                                        <div data-bs-toggle="modal" data-bs-target="#createBuku" className={`nav-link d-flex align-items-center gap-2 text-light `} aria-current="page">
                                            <i className="bi bi-journal-plus"></i>
                                            <div className="text-truncate">
                                                Buat Buku
                                            </div>
                                        </div>
                                        <div className={`nav-link d-flex align-items-center gap-2 text-light pointer`} aria-current="page" onClick={() => userFunction.remove()}>
                                            <i className="bi bi-box-arrow-left"></i>
                                            <div className="text-truncate">
                                                Keluar
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    }

                    <Modal target={"createBuku"} >
                        <form onSubmit={async (e) => {
                            await bukuFunction.store(e)
                            document.querySelector("#closeModal").click()
                        }} >
                        <h2 className="text-center text-primary fw-bold " >Buat Buku </h2>
                            <div className="mb-3">
                                <Input type="text" required={true} name="nama" />
                            </div>
                            <button className="text-center btn btn-primary mt-2 shadow w-100" >Buat ✨</button>
                        </form>
                    </Modal>

                    <button className="d-none" id="closeModal" data-bs-dismiss="modal" data-bs-target="#createBuku"></button>

                    <main className={`col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3 ${props.className}`}>
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    );
}