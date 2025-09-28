import React from "react";
import {Grid} from "@mui/material";
import "./ListComentsBack.scss";
import ComentBack from "../ComentBack";

export default function ListComentsBack(props) {

    const { coments, id:idBook, handDelete, handUpdate, setToastProps ,title, user} = props;

    const comentsByBook = coments.filter(c => c.idLibro === idBook); 

    return (
    <Grid container spacing={3} className="list-coments">
    {comentsByBook.length === 0 ? (
        <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <p>No hay comentarios para este libro aún.</p>
        </Grid>
    ) : (
        comentsByBook.map((coment) => (
        <Grid key={coment._id} item xs={12}>
            <ComentBack user = {user} title = {title} coment={coment} handDelete={handDelete} handUpdate = {handUpdate} setToastProps = {setToastProps}/>
        </Grid>
        ))
    )}
    </Grid>

    );

}