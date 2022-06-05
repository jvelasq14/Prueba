import React from 'react'
import { db } from '../firebase'

const Registros = () => {
  const [id, setId] = React.useState('');
  const [cedula, setCedula] = React.useState('');
  const [profesion, setProfesion] = React.useState('');
  const [estado, setEstado] = React.useState('');
  const [edad, setEdad] = React.useState('');
  const [genero, setGenero] = React.useState('');
  const [error, setError] = React.useState(null)
  const [modoedicion, setModoEdicion] = React.useState(false);
  const [lista, setLista] = React.useState([]);
React.useEffect(()=>{
  const obtenerDatos= async()=>{
    try {
      
      const data = await db().collection('usuarios').get()
      const ArryData = data.docs.map(doc=>({
        id: doc.id, ...doc.data()}))
        console.log(ArryData)
        setLista(ArryData)
    } catch (error) {
      console.log(error)
    }
  }
  obtenerDatos()
  },[])
const guardarDatos=async(e)=>{
  e.preventDefault()
  if(!cedula.trim()){
    setError('Ingrese la cedula del usuario')
    return
  }
  if(!profesion.trim()){
    setError('Ingrese alguna profesion')
    return
  }
  if(!estado.trim()){
    setError('Escoja un estado')
    return
  }
  if(!edad.trim()){
    setError('Ingrese su edad')
    return
  }
  if(!genero.trim()){
    setError('Ingrese su genero')
    return
  }
  if(edad < 17){
    setError('La Persona de ser mayor de 18')
    return
 }
 if(encontrado.length > 0){
       setError('Este usuario ya existe')
       return
 }
  try {
    
    const nuevoUsuario = {cedula,profesion,estado,edad,genero}
    const dato = await db().collection('usuarios').add(nuevoUsuario)
     setLista([
       ...lista,{...nuevoUsuario,id: dato.id}
     ])
  } catch (error) {
    console.log(error)
  }
  setCedula('')
  setProfesion('')
  setEstado('')
  setEdad('')
  setGenero('')
  setError('')
 
}
const encontrado =lista.filter(elemento=>elemento.cedula===cedula)


const editar=(elemento)=>{
  setModoEdicion(true)//cambiar modo edicion a verdadero
  //se actualiza estados para que los datos aparezcan en input
  setCedula(elemento.cedula)
  setProfesion(elemento.profesion)
  setEstado(elemento.estado)
  setEdad(elemento.edad)
  setGenero(elemento.genero)
  setId(elemento.id)
}
const HandlerCargarPro = function(e){
  const op = e.target.value;
  console.log(op)
  setProfesion(op)
}
const HandlerCargar = function(e){
  const op = e.target.value;
  console.log(op)
  setGenero(op)
}
const editarDatos=async(e)=>{
  e.preventDefault()
  if(!cedula.trim()){
    setError('Ingrese la cedula del usuario')
    return
  }
  if(!profesion.trim()){
    setError('Ingrese alguna profesion')
    return
  }
  if(!estado.trim()){
    setError('Escoja un estado')
    return
  }
  if(!edad.trim()){
    setError('Ingrese su edad')
    return
  }
  if(!genero.trim()){
    setError('Ingrese su genero')
    return
  }
  if(edad < 17){
    setError('La Persona de ser mayor de 18')
    return
 }
  try {
    await db().collection('usuarios').doc(id).update({
     cedula,profesion,estado,edad,genero
    })
    const listaEditada=lista.map(
      (elemento)=>elemento.id===id ? {id:id,cedula:cedula,profesion:profesion, estado:estado, edad:edad, genero:genero}:
      elemento)
    //listar con los valores nuevos...lista nueva
       setLista(listaEditada)
  } catch (error) {
    
  }
  setCedula('')
  setProfesion('')
  setEstado('')
  setEdad('')
  setGenero('')
  setError('')
  setId('') 
  setModoEdicion(false)
}
const eliminarDato=async(id)=>{
    await db().collection('usuarios').doc(id).delete()

    const listaFiltrada=lista.filter((elemento)=>elemento.id!==id)
    setLista(listaFiltrada)
}
const HandlerCargarRa = e =>{
setEstado(e.target.value)}
  

  return (
    <div>
    <nav class="navbar navbar-dark bg-primary mb-5">
  <h3>Recursos</h3>
</nav>
    <div className='row justify-content-center'>
          <div className="col-12 col-sm-10 col-md-6 col-xl-4">
              <form onSubmit={ modoedicion ? editarDatos : guardarDatos}>
              {
                error && (<div className='alert alert-danger'>
                       {error}
                </div>)
              }
               <h2 className="text-center">{
         modoedicion ? 'Editar Usuario': 'Registro de Usuarios'
       }</h2>
                <h5 className='text-center mb-2'>Cedula</h5>
                {
                  modoedicion ? (
                    <input type="number"
                    className='form-control mb-3'
                    placeholder='Ingrese la cedula' 
                    onChange={(e)=>{setCedula(e.target.value)}}
                    value={cedula}
                    disabled
                   />
                  ): 
                  <input type="number"
                  className='form-control mb-3'
                  placeholder='Ingrese la cedula' 
                  onChange={(e)=>{setCedula(e.target.value)}}
                  value={cedula}
                 />
                }
               
                <h5 className='text-center mb-2'>Profesión ​</h5>
                  <select className="form-select mb-3" name="Categorias" id="SelCategorias" onClick={HandlerCargarPro}>
                  <option selected>Seleciona una profesion</option>
                  <option value="Medico">Medico</option>
                  <option value="Abogado">Abogado</option>
                  <option value="Ingeniero">Ingeniero</option>
                  <option value="Administrador">Administrador</option>
              
            </select>
            <h5 className='text-center mb-2'>Estado</h5>
           

 <div class="form-check">
  <input class="form-check-input" 
  type="radio" name="flexRadioDefault" 
  id="flexRadioDefault1" 
  value="Si"
  onChange = {HandlerCargarRa}
  />
  <label class="form-check-label" for="flexRadioDefault1">
   Si
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" 
  type="radio" name="flexRadioDefault" 
  id="flexRadioDefault1" 
  value="No"
  onChange={HandlerCargarRa}
  />
  <label class="form-check-label" for="flexRadioDefault1">
    No
  </label>
</div>


<h5 className='text-center mb-2'>Edad</h5>
                
                 <input type="number"
                 className='form-control mb-3'
                 placeholder='Ingrese la Edad' 
                 onChange={(e)=>{setEdad(e.target.value)}}
                 value={edad}
                />

<h5 className='text-center mb-2'>Genero</h5>
          <select className="form-select mb-3" name="Sexo" id="SelSexo" onClick={HandlerCargar}>
                  <option selected>Seleciona un genero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  
         </select>
         <button className="btn btn-primary mb-3" type="submit">Registrar</button>

              </form>
              <ul className="list-group">
              {
        lista.length===0 ? <li className="list-group-item">No existen Usuarios</li>:
        (
          lista.map((elemento)=>(
            <li className="list-group-item" key={elemento.id}><span className="lead">
              {elemento.cedula}{' '} {elemento.profesion} {elemento.estado} {elemento.edad} {elemento.genero}
              </span>
              <button className="btn btn-success btn-sm mx-2 float-end"
               onClick={()=>editar(elemento)}
              >Editar</button>
              <button className="btn btn-danger btn-sm mx-2 float-end"
              onClick={()=>eliminarDato(elemento.id)} 
              >Eliminar</button>
            </li>
          ))
        )
      }
              </ul>
          </div>
         
    </div>
    </div>
  )
}

export default Registros