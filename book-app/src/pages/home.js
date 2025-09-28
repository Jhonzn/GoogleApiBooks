import react from "react";
import { Row, Col } from "antd";
import useFetch from "../hooks/useFetch";
import { API_BASE, currentYear} from "../utils/constants";
import SliderBooks from "../components/SliderBooks";
import BookList from "../components/BookList";


import Footer from "../components/Footer";

export default function Home(props) {
    const {user} = props;
    const {onFinish, setToastProps, toastProps, coments, handDelete, handUpdate } = props;
    const newBooks = useFetch(`${API_BASE}/volumes?q=publishedDate:${currentYear}&maxResults=20&langRestrict=es`);
    const masPopulares = useFetch(`${API_BASE}/volumes?q=subject:*&orderBy=relevance&maxResults=20&langRestrict=es`);
    const librosPremium = useFetch(`${API_BASE}/volumes?q=premium&orderBy=relevance&maxResults=20&langRestrict=es`);
    return (
        <>
        <Row>
            <SliderBooks user = {user} handUpdate = {handUpdate} books = {newBooks} onFinish = {onFinish} setToastProps = {setToastProps} toastProps = {toastProps} coments = {coments} handDelete={handDelete}/>
            <Col span={12}>

            <BookList title = "Libros Populares" books = {masPopulares}/>

            </Col>
            <Col span={12}>
            <BookList title = "Libros Premium" books = {librosPremium}/>
            </Col>
        </Row>
        <Footer/>
        </>
    );
}