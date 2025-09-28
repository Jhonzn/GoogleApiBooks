import React from "react";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import "./book.scss";
import { API_BASE } from "../../utils/constants";
import { Container} from "@mui/material";
import ListComentsBack from "../../components/ListComentsBack";
import { Button } from "antd";
import { Link } from "react-router-dom";
import SendComentBack from "../../components/SendComentBack";

export default function Book(props) {
  const { id } = useParams();
  const {onFinish, setToastProps, toastProps, coments, handDelete, handUpdate, user} = props;
  const bookInfo = useFetch(`${API_BASE}/volumes/${id}`);

  if (bookInfo.loading || !bookInfo.result) {
    return <Loading />;
  }

  return (<RenderBook bookInfo={bookInfo.result} 
            handUpdate = {handUpdate} 
          onFinish = {onFinish} 
          setToastProps = {setToastProps} 
          toastProps = {toastProps} 
          coments ={coments} 
          handDelete={handDelete}
          id = {id}
          user = {user}/>);
}

function RenderBook({ bookInfo, onFinish, setToastProps, toastProps, coments, handDelete, handUpdate, id, user}) {
  const { volumeInfo, saleInfo } = bookInfo;
  const image = volumeInfo?.imageLinks?.smallThumbnail || "";
  const title = volumeInfo?.title || "";
  const link = volumeInfo?.previewLink || volumeInfo?.infoLink || "";

  return (
    <div className="book">
      <div className="book__dark" />

      <Row>
        <Col span={8} offset={3} className="book__poster">
          <PosterBook image={image} 
          onFinish = {onFinish} 
          id = {id}
          title = {title}
          setToastProps = {setToastProps}
          link = {link}
          user = {user}/>
        </Col>
        <Col span={10} className="book__info">
          <BookInfo volumeInfo={volumeInfo} saleInfo={saleInfo} 
          handUpdate = {handUpdate} 
          onFinish = {onFinish} 
          setToastProps = {setToastProps} 
          toastProps = {toastProps} 
          coments ={coments} 
          handDelete={handDelete}
          id = {id}
          user = {user}/>
        </Col>
      </Row>
    </div>
  );
}

function PosterBook({ image, id, title, setToastProps, onFinish, link, user}) {
  return (
    <div className="poster-book">
      {/* Imagen de fondo */}
      <div
        className="poster-book__image"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "300px",
          borderRadius: "8px"
        }}
      />

      <div className="poster-book__botones">

        <Container style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
          <a href={link} target="_blank" rel="noopener noreferrer">
          <Button type="primary">Ver más</Button>
          </a>

        <SendComentBack
            setToastProps={setToastProps}
            onFinish={onFinish}
            id={id}
            title={title}
            user = {user}
        />


        </Container>

        

      </div>
        


    </div>
  );
}

function BookInfo({ volumeInfo, saleInfo, onFinish, setToastProps, toastProps, coments, handDelete, handUpdate, id, user }) {
  const { title, publisher, pageCount, authors = [] } = volumeInfo;
  const { listPrice } = saleInfo || {};
  const amount = listPrice?.amount || "N/A";
  const currencyCode = listPrice?.currencyCode || "N/A";

  return (
    <>
      <div className="book__info-header">
        <h1>
          {title}
          <br />
          <span>{publisher}</span>
        </h1>
      </div>
      <div className="book__info-content">
        <h3>General</h3>
      </div>
      <p>
        <strong>Precio:</strong> {amount}
      </p>
      <p>
        <strong>Moneda:</strong> {currencyCode}
      </p>
      <p>
        <strong>Cantidad de páginas:</strong> {pageCount}
      </p>
      <p>
        <strong>Autores:</strong>
      </p>
      <ul>
        {authors.map((autor, index) => (
          <li key={index}>{autor}</li>
        ))}
      </ul>
      <p>
        <strong>Comentarios:</strong>
      </p>
      <Container style={{
            maxHeight: "200px",
            marginRight: "50px",
            marginTop: "40px",
            overflowY: "auto",
            backgroundColor: "transparent",
            boxShadow: "none",
            scrollbarWidth: "none",   // 🔹 Firefox
            msOverflowStyle: "none",   // 🔹 IE/Edge
            scrollBehavior: "smooth"
            }}>
            <ListComentsBack title = {title} 
            coments={coments} 
            id={id} 
            handDelete = {handDelete} 
            handUpdate = {handUpdate} 
            setToastProps = {setToastProps}
            user = {user}/>
        </Container>
    </>
  );
}
