import react from "react";
import {Col, Card} from "antd";
import {EyeOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

export default function BookCatalog(props) {

    const {books:{items}} = props;
    
    return items.map(book => (
        <Col key={book.id} xs={4} className="book-catalog">
            <BookCard book={book} />
        </Col>
    ));

}

function BookCard(props) {

    const {Meta} = Card;
    const id = props.book?.id || '';
    const title = props.book?.volumeInfo?.title || '';
    const thumbnail = props.book?.volumeInfo?.imageLinks?.thumbnail || '';
    const link = props.book?.volumeInfo?.previewLink || '';

    return (
        <Link to = {`/book/${id}`}>
            <Card
            hoverable
            style={{width:240}}
            cover={<img alt={title}src={thumbnail} />}
            actions={[<EyeOutlined />]}>
                <Meta title={title} />
            </Card>
        </Link>
    );
}