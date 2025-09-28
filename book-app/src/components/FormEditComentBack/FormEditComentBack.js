import React, {useState} from "react";
import {FormControl, FormGroup, TextField, Button} from "@mui/material";
import "../FormSendComentBack/FormSendComentBack.scss"
import { Rate } from "antd";
import moment from "moment";

export default function FormEditComentBack(props){

    const { editComent, coment, title } = props;

    const [formValue, setFormValue] = useState({
        nombre: coment.nombre || "",
        comentario: coment.comentario || "",
        puntuacion: coment.puntuacion || 0,
        fecha: moment(),
    });

    const onFormChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value,
        });
    };
    return (
    
        <div className="form-send-coment">

            <h2 className="form-send-coment__title">Editar comentario de libro: {title}</h2>
            <form 
            className="form-send-coment__form" 
            onSubmit={event => editComent(event, formValue)}
            >

                <FormControl>
                    <FormGroup>
                        <TextField
                        className="form-send-coment__form-name"
                        type = "text"
                        name = "nombre"
                        placeholder = {coment.nombre}
                        margin = "normal"
                        value={formValue.nombre}
                        onChange = {onFormChange}
                        disabled
                        />
                    </FormGroup>
                    <FormGroup>
                        <TextField
                        className="form-send-coment__form-textarea"
                        name="comentario"
                        multiline
                        rows="6"
                        placeholder = {coment.comentario}
                        margin="normal"
                        value={formValue.comentario}
                        onChange = {onFormChange}
                        />
                    </FormGroup>
                    <FormGroup>
                    <Rate 
                        className="form-send-coment__form-rate"
                        allowHalf
                        tooltips={[1, 2, 3, 4, 5]}
                        value={formValue.puntuacion}   // controlado por estado
                        onChange={(value) => 
                        setFormValue({
                            ...formValue,
                            puntuacion: value
                        })
                        }
                    />
                    </FormGroup>

                    <FormGroup>
                        <Button  style={{backgroundColor: "rgb(13, 0, 255)", background: "#fff"}} type="submit">Editar comentario</Button>
                    </FormGroup>
                </FormControl>

            </form>

        </div>
    )

}
