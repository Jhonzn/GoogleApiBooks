import react from "react";
import { API_BASE, currentYear} from "../utils/constants";
import Books from "../components/Books/Books";



export default function NewBooks() {
    
    const newBooks = `${API_BASE}/volumes?q=publishedDate:${currentYear}&langRestrict=es&maxResults=10`;
    return (

        <Books books = {newBooks} title = "Ultimas Publicaciones"/>
        
    )
}
