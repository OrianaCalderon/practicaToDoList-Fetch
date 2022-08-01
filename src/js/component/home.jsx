import React , {useState} from "react";



//create your first component
const Home = () => {

	const [tarea, setTarea]= useState({
		task:"", 
		isDone:false
	})

	const [listaTareas, setListaTareas] = useState([])

	const handleChange = (event) =>{
		setTarea({...tarea,[event.target.name]:event.target.value})
	}

	const guardarTarea =(event)=>{
		if (event.key === "Enter"){
			if(tarea.task.trim() !== ""){
				setListaTareas([...listaTareas,tarea])
				setTarea({
					task:"",
					isDone: false
				})
			}else{
				alert("Debes escribir una tarea")
			}
		}
	}

	const borrar =(id)=>{
		let nuevaLista= listaTareas.filter((item,index)=>{
			return(id !== index)
		})
		setListaTareas(nuevaLista)
	}



	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<h1>ToDo</h1>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<input 
						type="text"
					 	placeholder="que quieres"
						className="dato"
						onChange={handleChange}
						onKeyDown={guardarTarea}
						value={tarea.task}
						name="task"/>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<ul>
						{
							listaTareas.map((item,index)=>{
								return(
									<li key={index} onClick={()=>borrar(index)} >{item.task}</li>
								)
							})
						}
						
					</ul>
				</div>
			</div>
			<p>tienes {listaTareas.length} tareas por hacer</p>
		</div>
	);
};

export default Home;
