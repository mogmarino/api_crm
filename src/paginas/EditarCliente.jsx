import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const consultarAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setCargando(!cargando);
      }, 2500);
    };
    consultarAPI();
  }, []);
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Formulario para modificar los datos de un cliente</p>
      {cliente?.nombre ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (
        <p>Cliente ID no válido</p>
      )}
    </>
  );
};

export default EditarCliente;
