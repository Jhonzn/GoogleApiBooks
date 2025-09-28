import React, {useState} from "react";
import "./SendComentBack.scss";
import moment from "moment"
import ModalContainerBack from "../ModalContainerBack";
import FormSendComentBack from "../FormSendComentBack";
import { Button,message } from "antd";

export default function SendComentBack(props){
    const {setToastProps, id, onFinish, title , user} = props;
    const [ isOpenModal, setIsOpenModal ] = useState(false);
    const openModal = () => {
        setIsOpenModal(true)
    }
    const closeModal = () => {
        setIsOpenModal(false)
    }

    const sendComent = async (event, formValue) => {
        event.preventDefault();
        const { idLibro, nombre, comentario, puntuacion} = formValue;

        if (!idLibro || !nombre.trim() || !comentario.trim() || puntuacion == null) {
        setToastProps({
            open: true,
            text: "WARNING: Todos los campos son requeridos."
        });
        return;
        }


        // 👉 en vez de repetir lógica, usar props.onFinish
        try {
            
            await onFinish(formValue);  // 👈 llamada directa a la función de props
            closeModal();
            setToastProps({
            open: true,
            text: "Comentario enviado correctamente."
            });
        } catch (err) {
            message.error("Error al guardar el comentario");
        }
    };

    return (
        <div className="send-coment">

            <Button onClick={openModal} type="primary" >Calificar libro</Button>
            <ModalContainerBack isOpenModal = {isOpenModal} closeModal = {closeModal}>
                <FormSendComentBack user = {user} sendComent = {sendComent} id = {id} title = {title}/>
            </ModalContainerBack>

        </div>
    )
}