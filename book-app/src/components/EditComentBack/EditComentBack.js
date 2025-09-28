import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit'; 
import ModalContainerBack from "../ModalContainerBack";
import FormEditComentBack from "../FormEditComentBack";
import { message } from "antd";

export default function EditComentBack(props) {

    const {handUpdate, _id, nombre, comentario, puntuacion, fecha, setToastProps, title, user, usuario} = props;
    const isDisabled = user?.id !== usuario; 
    const [isOpenModal, setIsOpenModal] = useState(false);
    const openModal = () => {if(user?.id === usuario ) setIsOpenModal(true)};
    const closeModal = () => setIsOpenModal(false);

    const editComent = async (event, formValue) => {
        event.preventDefault();
        const { nombre, comentario, puntuacion} = formValue;
        if (!_id || !nombre.trim() || !comentario.trim() || puntuacion == null) {
        setToastProps({
            open: true,
            text: "WARNING: Todos los campos son requeridos."
        });
        return;
        }
        // 👉 en vez de repetir lógica, usar props.onFinish
        try {
            await handUpdate(_id, formValue);  // 👈 llamada directa a la función de props
            closeModal();
            setToastProps({
            open: true,
            text: "Comentario se ha modificado correctamente."
            });
        } catch (err) {
            message.error("Error al modificar el comentario");
        }
    };
    return (
        <div className="send-tweet">
            <EditIcon className={`icon-edit ${isDisabled ? "disable" : ""}`}
             color="primary" onClick={openModal} />
            <ModalContainerBack isOpenModal={isOpenModal} closeModal={closeModal}>
                <FormEditComentBack title = {title} editComent={editComent} coment={{ _id, nombre, comentario, puntuacion, fecha}} />
            </ModalContainerBack>
        </div>
    );

}