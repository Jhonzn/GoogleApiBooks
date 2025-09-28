import React from "react";
import {List, Avatar, Button} from "antd";
import {Link} from "react-router-dom";
import "./BookList.scss";
import Loading from "../Loading";
import {PlusCircleOutlined} from "@ant-design/icons";
import { ReactComponent as Logo } from "../../assets/img/logo-book2.svg";

export default function BookList(props) {
    const {title, books} = props;

    if (books.loading || !books.result) {

        return <Loading/>;
        
    }
    return (
        <List
        className="book-list"
        size="default"
        header = {<h2>{title}</h2>}
        bordered
        dataSource={books.result.items}
        renderItem={book => <RenderBook book={book}/>}
        />
    )
}

function RenderBook(props) {
    const id = props.book?.id || '';
    const title = props.book?.volumeInfo?.title || '';
    const smallThumbnail = props.book?.volumeInfo?.imageLinks?.smallThumbnail || '';
    const link = props.book?.volumeInfo?.previewLink || '';

    return (

        <List.Item className="book-list__book">

            <List.Item.Meta 
            avatar = {<Avatar src ={smallThumbnail || <Logo/>}/>}
            title={<Link to={`/book/${id}`}>{title}</Link>}
            />

            <Link to={`/book/${id}`}>
            <PlusCircleOutlined />
            </Link>
            

        </List.Item>

    );
}