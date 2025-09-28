import React from 'react';
import "./SliderBooks.scss";
import { Carousel, Button, message} from "antd";
import { Link } from "react-router-dom";
import Loading from "../Loading"
import { Container, Snackbar} from "@mui/material";
import SendComentBack from "../SendComentBack";
import ListComentsBack from '../ListComentsBack';



export default function SliderBooks(props) {

    const {user} = props;


    const {books, onFinish, setToastProps, toastProps, coments, handDelete, handUpdate} = props;
    

    if (books.loading || !books.result) {

        return <Loading/>;
    }
    const {items} = books.result;

    return (
        <Carousel autoplay className="slider-books">
            {items.map(book => (
                <Book key = {book.id} user = {user} handUpdate = {handUpdate} handDelete = {handDelete} book = {book} onFinish = {onFinish} setToastProps = {setToastProps} toastProps = {toastProps} coments = {coments}/>
            ))}

        </Carousel>
    )
}

function Book(props) {
    const {onFinish, setToastProps, toastProps, coments, handDelete, handUpdate, user} = props;
    
    const id = props.book?.id || '';
    const title = props.book?.volumeInfo?.title || '';
    const subtitle = props.book?.volumeInfo?.subtitle || '';
    const smallThumbnail = props.book?.volumeInfo?.imageLinks?.smallThumbnail || '';
    const link = props.book?.volumeInfo?.previewLink || '';

    return (
        <div 
            className="slider-books__book" 
            style={{
                backgroundColor: '#2689e5ff'
                
            }}
            >

            <div className="slider-books__book-info">
                <img 
                    src={smallThumbnail}  // ← Tu variable aquí
                    alt={`Portada de ${title}`}
                    style={{ 
                    width: '200px', 
                    height: '300px', 
                    objectFit: 'cover',
                    borderRadius: '8px',
                    margin: '48px'
                    }}
                    onError={(e) => {
                    e.target.src = '/placeholder-book.jpg'; // Fallback si la imagen falla
                    }}
                />
                

                <div>
                <h2>{title}</h2>
                <p>{subtitle}</p>

                <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={toastProps.open}
                autoHideDuration={3000} // Se cerrará automáticamente en 3 segundos
                onClose={() => setToastProps({ open: false, text: null })} // Cierra el snackbar
                message={<span id='message-id'>{toastProps.text}</span>}
                />


                <Container style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
                <Link to={`/book/${id}`}>
                    <Button type="primary">Ver más</Button>
                </Link>
                <SendComentBack user = {user} setToastProps={setToastProps} onFinish = {onFinish} id = {id} title = {title} />
                </Container>

  
                </div>
                <Container style={{
                maxHeight: "500px",
                marginLeft: "50px",
                overflowY: "auto",
                backgroundColor: "transparent",
                boxShadow: "none",
                scrollbarWidth: "none",   // 🔹 Firefox
                msOverflowStyle: "none",   // 🔹 IE/Edge
                scrollBehavior: "smooth"
                }}>
                <ListComentsBack user = {user} title = {title} coments={coments} id={id} handDelete = {handDelete} handUpdate = {handUpdate} setToastProps = {setToastProps}/>
                </Container>


                

            </div>

        </div>
    );
}