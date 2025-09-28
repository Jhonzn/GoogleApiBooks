import axios from "axios";

const API_URL = "http://localhost:8081/comentarios";

// Obtener comentarios
export const getComents = () => axios.get(API_URL);

// Crear comentario
export const createComent = (data) => axios.post(API_URL, data);

// Eliminar comentario
export const deleteComent = (id) => axios.delete(`${API_URL}/${id}`);

// Actualizar comentario
export const updateComent = (id, data) => axios.put(`${API_URL}/${id}`, data);



