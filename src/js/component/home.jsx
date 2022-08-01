import React , {useEffect, useState } from "react";



//create your first component
const Home = () => {

	const [tarea, setTarea]= useState({
		label:"", 
		done:false
	})

	const [listaTareas, setListaTareas] = useState([])

	const handleChange = (event) =>{
		setTarea({...tarea,[event.target.name]:event.target.value})
	}
    

	let sofia = "https://assets.breatheco.de/apis/fake/todos/user/sofia"


 	const createUser = async () => {
		try {
			let response = await fetch(`${sofia}`)
			if (response.ok){
				let data = await response.json()
					if (response.status !== 404) {
					setListaTareas(data)

			}} else {
				let responseTodos = await fetch(`${sofia}`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify([])

				})


				if (responseTodos.ok) {
					createUser()
				}
			}

		} catch (error) {
			console.log(`Explote : ${error}`)

		}
 	}
	
 
	



	useEffect(()=>{
		createUser()
	},[])



	const guardarTarea =async (event)=> {
		if (event.key === "Enter"){
			if (tarea.label.trim() !== ""){
				try {
					let response =await fetch (`${sofia}` ,{
						method : "PUT",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify([...listaTareas, tarea])
					})
					if (response.ok){
						setTarea({label:"", done: false})
						createUser()

					}

				} catch (error){
					console.log(error)
				}
			}
		}
	}





	const borrar = async (id)=>{
		let nuevaLista= listaTareas.filter((item,index)=>{
			if(id != index){
				return item
			}
			
		})
		
		try{ 
			let response =await fetch (`${sofia}`,
			{
				method:"PUT",
				headers:{ "Content-Type":"application/json"},
				body: JSON.stringify(nuevaLista)
			})
			if(response.ok){
				createUser()
			}

		}catch (error){}
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
						value={tarea.label}
						name="label"/>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<ul>
						{
							listaTareas.map((item,index)=>{
								return(
									<li key={index} onClick={()=>borrar(index)} >{item.label}</li>
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
