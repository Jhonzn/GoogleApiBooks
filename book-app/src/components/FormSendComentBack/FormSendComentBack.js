import React, {use, useState} from "react";
import {FormControl, FormGroup, TextField, Button} from "@mui/material";
import "./FormSendComentBack.scss";
import { Rate } from "antd";
import moment from "moment";

export default function FormSendComentBack(props){

    const { sendComent, id: idCom , title, user} = props;

    const [formValue, setFormValue] = useState({
        usuario: user?.id,
        idLibro: idCom,
        nombre: user?.nombre,
        comentario: "",
        puntuacion: 0,
        fecha: moment()
    });

    const onFormChange = event => {
        setFormValue({
            ...formValue,
            [event.target.name]:event.target.value

        });
    };

    return (
    
        <div className="form-send-coment">

            <h2 className="form-send-coment__title">Calificar libro: {title}</h2>
            <form 

            
            className="form-send-coment__form" 
            onSubmit={event => sendComent(event, formValue)}
            onChange = {onFormChange}
            >

                <FormControl>
                    
                    <FormGroup>
                        <TextField
                        className="form-send-coment__form-name"
                        type = "text"
                        name = "nombre"
                        placeholder = "Nombre de usuario"
                        margin = "normal"
                        disabled
                        value={user?.nombre}/>
                    </FormGroup>
                    <FormGroup>
                        <TextField
                        className="form-send-coment__form-textarea"
                        name="comentario"
                        multiline
                        rows="6"
                        placeholder = "Escribe tu comentario..."
                        margin="normal"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Rate 
                            className="form-send-coment__form-rate"
                            allowHalf
                            defaultValue={0}
                            tooltips={[1, 2, 3, 4, 5]}
                            onChange={(value) => 
                                setFormValue({
                                    ...formValue,
                                    puntuacion: value
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button style={{backgroundColor: "rgb(13, 0, 255)", background: "#fff"}} type="submit">Enviar Calificación</Button>
                    </FormGroup>
                </FormControl>

            </form>

        </div>
    )

}
