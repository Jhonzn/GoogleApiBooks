import react from "react";
import Books from "../components/Books/Books";
import { API_BASE } from "../utils/constants";




export default function Popular() {
    const masPopulares = `${API_BASE}/volumes?q=subject:*&orderBy=relevance&maxResults=10&langRestrict=es`;
    return (

        <Books books = {masPopulares}  title = "Libros Populares"/>
        
    )
}
