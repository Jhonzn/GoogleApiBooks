import React, {useState, useEffect} from "react";
import {Row, Col} from "antd";
import Footer from "../Footer";
import Loading from "../Loading";
import BookCatalog from "../BookCatalog";
import PaginationBooks from "../Pagination";
import ComentBack from "../ComentBack"


export default function Books(props) {
    const {title} = props;
    const {books:apiURL} = props;
    const [bookList, setBookList] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    

    useEffect(() => {
        (async () => {
            const startIndex = (page - 1) * itemsPerPage;
            const response = await fetch(`${apiURL}&startIndex=${startIndex}`);

            const books = await response.json();
            
            setBookList(books);
            

        })()
    },[page])

    const onChangePage = page => {
        setPage(page);
    }

    

    return (
        <Row>
            <Col span="24" style={{textAlign:"center", marginTop: 25}}>

                <h1 style={{fontSize:35, fontWeight:"bold"}}>{title}</h1>
            </Col>

            {bookList.items ? (
                <Row>
                <BookCatalog books = {bookList}/>
                <Col span="24">
                    <PaginationBooks
                    currentPage = {page}
                    totalItems = {bookList.totalItems}
                    onChangePage = {onChangePage}
                    />
                </Col>
                </Row>
        
            ) : (
                <Col span="24">
                    <Loading/>
                </Col>
            )}

            <Col span={24}>

                <Footer/>
            </Col>
        </Row>
    );
}