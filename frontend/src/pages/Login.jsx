import {Container,Row,Col} from "../components/Grid"
import Input from "../components/Input";
import ConfigAxios from "../variabels/ConfigAxios";
import { useCallback, useContext, useState } from "react";
import DataContext from "../variabels/Context";

export default function Login () {
    const {setUser,checkStatus,userFunction} = useContext(DataContext);
    const [loginPage,setLoginPage] = useState(history.state.login ?? true);

    const toggle = useCallback(() => {
        setLoginPage(!loginPage)
        history.pushState({login:!loginPage},undefined,undefined)
    },[loginPage]);

    const register = useCallback(async (e) => {
        try{
            e.preventDefault();
            const response = await ConfigAxios.post("/api/user",new FormData(e.target));
            e.target.reset();
            toggle()
        }catch(e){
            checkStatus(e);
        }
    },[loginPage])

    return <Container className="container" >
        <Row justify="between" align="center" >
            <Col pc="6" className="d-md-block d-none" >
                <div className="">
                    <img src="/img/login.png" className="img-fluid"  />
                </div>
            </Col>
            {loginPage ? 
            <Col pc="5" className="px-4" >
                <form onSubmit={(e) => userFunction.login(e)} className="" >
                    <h2 className="text-center text-primary fw-bold my-4 judul-login" >Write Story</h2>
                    <div className="mb-3">
                        <Input type="text" required={true} name="email" />
                    </div>
                    <div className="mb-3">
                        <Input type="password" required={true} name="password" />
                    </div>
                    <button className="text-center btn btn-primary mt-2 shadow w-100" >Masuk ✨</button>
                    <h6 className="text-center d-block mt-3" style={{ fontSize:"14px" }} >Tidak punya akun bisa <span className="text-primary pointer fw-bold" onClick={toggle} >Buat akun</span></h6>
                </form>
            </Col>
            : 
            <Col pc="5" className="px-4" >
                <form onSubmit={register}>
                    <h2 className="text-center text-primary fw-bold my-4 judul-login" >Write Story</h2>
                    <div className="mb-3">
                        <Input type="nama" required={true} name="nama" />
                    </div>
                    <div className="mb-3">
                        <Input type="email" required={true} name="email" />
                    </div>
                    <div className="mb-3">
                        <Input type="password" required={true} name="password" />
                    </div>
                    <button className="text-center btn btn-primary mt-2 shadow w-100" >Buat ✨</button>
                    <h6 className="text-center d-block mt-3" style={{ fontSize:"14px" }} >Sudah punya akun bisa langsung <span className="text-primary pointer fw-bold" onClick={toggle} >Masuk</span></h6>
                </form>
            </Col>
            }
        </Row>
    </Container>
}