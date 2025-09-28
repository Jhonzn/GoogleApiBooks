import React,{useState} from "react";
import "./ComentBack.scss";
import {Card, CardContent} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import moment  from "moment";
import { Rate } from "antd";
import EditComentBack from "../EditComentBack";

export default function ComentBack(props) {

    const { coment: {_id, usuario, nombre, comentario, puntuacion, fecha}, handDelete, handUpdate, setToastProps, title, user} = props;

    return (
        <Card className="coment">

            <CardContent>

                <div className="coment__header">

                    <h5>
                        {nombre}
                    </h5>

                    <div className="icons">

                        <DeleteTwoToneIcon
                        className={`icon-delete ${user?.id !== usuario ? "disabled" : ""}`}
                        onClick={() => user?.id === usuario && handDelete(_id)}
                        />

                        <EditComentBack className = "icon-edit" 
                        _id = {_id} 
                        nombre = {nombre} 
                        comentario = {comentario} 
                        puntuacion = {puntuacion} 
                        fecha = {fecha} 
                        handUpdate = {handUpdate} 
                        setToastProps = {setToastProps}
                        title = {title}
                        user = {user}
                        usuario = {usuario}/>

                    </div>

                </div>
                <p className="coment" aria-multiline="true">{comentario}</p>

                <Rate 
                    disabled 
                    allowHalf 
                    value={puntuacion} 
                />
                <div className="tweet__date-add-coment">
                    {moment(fecha).format("DD/MM/YYYY HH:mm")}

                </div>
            </CardContent>

        </Card>
    )

}