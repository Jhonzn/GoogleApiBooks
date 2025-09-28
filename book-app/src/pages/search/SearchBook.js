import React, { useState, useEffect } from "react";
import { Row, Col, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import BookCatalog from "../../components/BookCatalog";
import Footer from "../../components/Footer";
import { API_BASE } from "../../utils/constants";

import "./SearchBook.scss"

export default function SearchBook() {
    const location = useLocation();
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        (async () => {
            const searchParams = queryString.parse(location.search);
            const {s} = searchParams;
            if (s) {
                const response = await fetch(
                    `${API_BASE}/volumes?q=intitle:${s}&maxResults=10&langRestrict=es`
                );
                const books = await response.json();
                setSearchValue(s);
                setBookList(books);
            }
        }
        ) ();
    }, [location.search]);

    const onChangeSearch = (e) => {
        const newSearchValue = e.target.value;
        const urlParams = queryString.stringify({ s: newSearchValue});
        navigate(`?${urlParams}`);
        setSearchValue(newSearchValue);
    };

    return (

        <Row>
            <Col span={12} offset={6} className="search">
                <h1>Busca tu Libro</h1>
                <Input value={searchValue} onChange={onChangeSearch} />
            </Col>
            {bookList.items && (
                <Row>
                
                    <BookCatalog books={bookList} />
                
                </Row>
            )}
            <Col span={24}>
                <Footer />
            </Col>
        </Row>

    );

}