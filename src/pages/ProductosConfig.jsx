import styled from "styled-components";
import sinfoto from "../assets/sinfoto_.png"
import { Btnoperaciones } from "../components/Btnoperaciones";
import {FcPicture} from "react-icons/fc";
import { useRef, useState } from "react";
import {useForm} from "react-hook-form";
import { insertarProductos, EditarUrLImg, SubirImgStorage, ValidarDatosRepetidos } from "../api/Aproductos";
import swal from 'sweetalert';
import { Spinner } from "../components/Spinner";

export function ProductosConfig() {

  const [ loading, setLoading ] = useState(false);

  const [fileurl, setFileurl ] = useState(sinfoto);

  const [file, setFile ] = useState([]);

  const [estadoimg, setEstadoimg ] = useState(false);

  const ref = useRef(null);

  function subirimgStorage(evento){
    //* carga local
    let filelocal = evento.target.files;
    let fileReaderlocal = new FileReader();
    fileReaderlocal.readAsDataURL(filelocal[0]);
    const tipoimg = evento.target.files[0];
    
    if(tipoimg.type.toLowerCase().includes("image/png")){
      if(fileReaderlocal && filelocal && filelocal.length){
        fileReaderlocal.onload = function load(){
          setFileurl(fileReaderlocal.result);
        }
        //* preparar img para el storage
        let fileList = evento.target.files;
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(fileList[0]);
        fileReader.onload = function(){
          let imagenData = fileReader.result;
          setFile(imagenData);
        }
      }
    }
  }

  function abrirImagenes (){
    ref.current.click();
  }

  async function insertar(data){

    const img = file.length;
    if ( img != 0) {
      setLoading(true);
      setEstadoimg(false);
      const p = {
        descripcion: data.descripcion,
        precio: data.precio,
        icono: "-",
      };
      const rptRepetidos = await ValidarDatosRepetidos(p);
      if (rptRepetidos == 0) {
        const id = await insertarProductos(p);

        const resptUrl = await SubirImgStorage(id, file);
        await EditarUrLImg(id, resptUrl);
        setLoading(false);
        reset({descripcion: "", precio: ""});
        setFileurl(sinfoto);
        swal({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
        });
      } else {
        setLoading(false);
        swal({
          title: "Datos repetidos!",
          text: "Ya tienes un registro con esa descripcion!",
          icon: "warning",
        });
      }
    } else {
      setEstadoimg(true);
    }
  }

  const { reset, register, formState:{errors}, handleSubmit} = useForm();

  return (
    <Container>
      <div className="sub-contenedor">
        {
          loading?<Spinner />: ""
        }

        <div className="header">
          <h1>📤Registro de productos</h1>
        </div>

        <div className="pictureContainer">
          <img src={fileurl}></img>
          <Btnoperaciones 
            titulo="Cargar imagen" 
            icono={<FcPicture />}
            funcion={abrirImagenes}
          />
          <input 
            ref={ref} 
            type="file" 
            accept="image/png" 
            onChange={subirimgStorage}
          >
          </input>
          {
            estadoimg && <p>Seleccione una imagen</p>
          }
        </div>

        <form className="entradas" onSubmit={handleSubmit(insertar)}>
          <ContainerInputs>
            <div className="subcontainer">
              <h4>Descripcion</h4>
              <Inputs 
                placeholder="Ingrese una descripcion"
                type="text"
                {...register("descripcion", {required: true, maxLength: 20})}
              />
            </div>
            {
              errors.descripcion?.type === "required" && (
                <p>Ingrese una descripcion</p>
              )
            }
            {
              errors.descripcion?.type === "maxLength" && (
                <p>Solo se aceptan 20 caracteres</p>
              )
            }
          </ContainerInputs>

          <ContainerInputs>
            <div className="subcontainer">
              <h4>Precio</h4>
              <Inputs
                step="0.01"
                placeholder="Ingrese un precio"
                type="number"
                {...register("precio", {required: true, valueAsNumber: true})}
              />
            </div>
            {
              errors.precio?.type === "required" && (
                <p>Ingrese un precio</p>
              )
            }
            {
              errors.precio?.type === "valueAsNumber" && (
                <p>El valor ingresado no es un numero</p>
              )
            }
          </ContainerInputs>

          <div className="footercontent">
            <Btnoperaciones 
              titulo="Enviar" 
              icono={<FcPicture />}
            />
          </div>
         
        </form>

      </div>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .sub-contenedor{
    width: 80%;
    background-color: #e7ebf0;
    border-radius: 10px;
    padding: 10px 20px;
    margin: 0px 20px;
    .header{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
    }
    .pictureContainer{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      flex-direction: column;
      img{
        width: 100px;
        object-fit: cover;
      }
      input{
        display: none;
      }
    }
    .entradas{
      .footercontent {
        display: flex;
        align-items: center;
        height: 100%;
        gap: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
        justify-content: center;
      }
    }
  }
`;

const ContainerInputs = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  .subcontainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;

const Inputs = styled.input`
  border: 2px solid #e8e8e8;
  padding: 15px;
  border-radius: 10px;
  background-color: #212121;
  font-size: small;
  font-weight: bold;
  text-align: center;
  color: white;
  text-align: start;
  width: 70%;
  &:focus {
    outline-color: white;
    background-color: #212121;
    color: #e8e8e8;
    box-shadow: 5px 5px #888888;
  }
`;
