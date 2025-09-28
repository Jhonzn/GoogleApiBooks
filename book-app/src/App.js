import { Layout, message } from 'antd';
import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MenuTop from './components/MenuTop';
import { getComents, createComent, deleteComent, updateComent } from "./services/comentsApi";
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';


import Home from './pages/home';
import NewBooks from './pages/new-books';
import Popular from './pages/popular';
import SearchBook from './pages/search';
import Book from './pages/book';
import Login from './pages/login';
import Register from './pages/register';
import Error404 from './pages/error404';
import GetUser from './components/GetUser';

export default function App() {
    //const token = localStorage.getItem("token");
    const [user, setUser] = useState(null);
    const { Header, Content } = Layout;
    const [coments, setComents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toastProps, setToastProps] = useState({
        open: false,
        text: null
    });

    //if(token) console.log("Usuario decodificado:", user);
    console.log(coments)
    //Actualizar usuario 
    useEffect(() => {
      const u = GetUser();
      setUser(u);
    }, []);
    // Cargar libros al inicio
    useEffect(() => {
        fetchComents();
    }, []);
    const fetchComents = async () => {
        setLoading(true);
        try {
        const res = await getComents();
        setComents(res.data);
        } catch (err) {
        message.error("Error cargando los comentarios");
        } finally {
        setLoading(false);
        }
    };
    const handDelete = async (id) => {
      await deleteComent(id);
      setComents(coments.filter(c => c._id !== id));
    }
    // Crear nuevo comentario
    const onFinish = async (values) => {
        try {
        await createComent(values);
        message.success("Comentario agregado con éxito");
        fetchComents(); // recargar lista
        } catch (err) {
        message.error("Error al guardar el libro");
        }
    };
    const handUpdate = async (id, newData) => {
      try {
        const res = await updateComent(id, newData);
        setComents(prevComents => 
          prevComents.map(c =>
          c._id === id ? { ...c, ...res.data } : c
          )
        );
        fetchComents(); // recargar lista
        message.success("Comentario actualizado con éxito ✅");
      } catch (err) {
        console.error("Error actualizando comentario:", err);
        message.error("❌ Error al actualizar el comentario");
      }
    }
  return (
    <Layout>
      <Router>
        <Header
          style={{
            zIndex: 1,
            backgroundColor: "blue",
            color: "white",
          }}
        >
          <MenuTop user = {user}
            
            style={{
              zIndex: 1,
              backgroundColor: "blue",
              color: "white",
            }}
          />
        </Header>

      <Content>
        <Routes>
          <Route path="/" 
          element={<ProtectedRoute><Home  user = {user}
          handUpdate = {handUpdate} 
          onFinish = {onFinish} 
          setToastProps = {setToastProps} 
          toastProps = {toastProps} 
          coments ={coments} 
          handDelete={handDelete}/></ProtectedRoute>} />
          <Route path="/new-books" element={<ProtectedRoute><NewBooks /></ProtectedRoute>} />
          <Route path="/popular" element={<ProtectedRoute><Popular /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><SearchBook /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute> <Login setUser = {setUser}/> </PublicRoute>} />
          <Route path="/register" element={ <PublicRoute> <Register /> </PublicRoute>} />
          <Route path="*" element={<Error404 />} />
          <Route path="/book/:id" 
          element={<ProtectedRoute> <Book user = {user}
          handUpdate = {handUpdate} 
          onFinish = {onFinish} 
          setToastProps = {setToastProps} 
          toastProps = {toastProps} 
          coments ={coments} 
          handDelete={handDelete}/> </ProtectedRoute>} />
        </Routes>
      </Content>

      </Router>
      
    </Layout>
  );
}


