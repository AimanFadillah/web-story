import { useContext, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import DataContext from "../variabels/Context"
import { Col, Row } from "../components/Grid";
import { useNavigate } from "react-router-dom";

export default function Utama () {
    const {bukuFunction} = useContext(DataContext);
    const nav = useNavigate();

    useEffect(() => {
        bukuFunction.get()
    },[]);

    return <Sidebar>
        <Row>
            
        </Row>
        <Row>
            {bukuFunction.buku.map((buku,index) => 
            <Col pc="2" hp="4" className="mb-4" key={index} >
                <div onClick={() => nav(`/buku/${buku.id}`)} >
                    <img src="/img/book.png" alt="book" className="img-fluid" />
                    <h6 className="text-truncate text-center mt-2" >{buku.nama}</h6>
                </div>
            </Col>
            )}
        </Row>
    </Sidebar>
    
}