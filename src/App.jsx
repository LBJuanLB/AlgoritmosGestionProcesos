import './App.css'
import { useState } from "react"
import { FifoSjf } from "./componets/FifoSjf"


/*
Los procesos van a ser un array de objetos con la siguiente forma:
{
  id: 1,
  name: 'Proceso 1',
  arrivalTime: 0, <-- Tiempo de llegada
  duration : 5,   <-- Rafaga de CPU
  priority: 1,
  executed: false
}
*/

function App() {
  const [ID, setID] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [processes, setProcesses] = useState([])
  const [editProcess, setEditProcess] = useState({
    name: "",
    arrivalTime: 0,
    duration: 0,
    priority: 0,
  });

  const [newProcessInfo, setNewProcessInfo] = useState({
    name: "",
    arrivalTime: 0,
    duration: 0,
    priority: 0,
  });

  const addProcess = () => {
    const { name, arrivalTime, duration, priority } = newProcessInfo;

    if (name.trim() !== "" && arrivalTime >= 0 && duration > 0) {
      const newProcess = {
        id: ID,
        name: name,
        arrivalTime: arrivalTime,
        duration: duration,
        priority: priority,
  
      };

      setID(ID + 1);
      setProcesses([...processes, newProcess]);
      // Limpiar los campos después de agregar
      setNewProcessInfo({
        name: "",
        arrivalTime: 0,
        duration: 0,
        priority: 0,
  
      });
    }
  };

  const edit = (id) =>{
    setEditMode(id);
    const processToEdit = processes.find((process) => process.id === id);
    setEditProcess(processToEdit);
  }

  const confirmEdit = (id) => {
    const updatedProcesses = processes.map((process) => {
      if(process.id === id){
        return editProcess;
      }
      return process;
    });
    setProcesses(updatedProcesses);
    setEditMode(null);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProcessInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProcess((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const removeProcess = (id) => {
    const updatedProcesses = processes.filter((process) => process.id !== id);
    setProcesses(updatedProcesses);
  };

  return (
    <main id="app">
      <h1>Algoritmos de Gestion de Procesos</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre del Proceso</th>
              <th>Rafaga de CPU</th>
              <th>Tiempo de Llegada</th>
              <th>Prioridad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process) => (
              <tr key={process.id}>
                <td>
                  {editMode === process.id ? 
                  <input
                  required
                  type="text"
                  name="name"
                  value={editProcess.name}
                  onChange={handleEditChange}
                  />:
                  process.name
                  }
                  </td>
                <td>
                  {editMode === process.id ?
                  <input
                  min={0}
                  type="number"
                  name="duration"
                  value={editProcess.duration}
                  onChange={handleEditChange}
                  />
                  :
                  process.duration
                  }
                  </td>
                <td>
                  {editMode === process.id ?
                  <input
                  min={0}
                  type="number"
                  name="arrivalTime"
                  value={editProcess.arrivalTime}
                  onChange={handleEditChange}
                  />
                  :
                  process.arrivalTime}</td>
                <td>
                  {editMode === process.id ?
                  <input
                  min={0}
                  type="number"
                  name="priority"
                  value={editProcess.priority}
                  onChange={handleEditChange}
                  />
                  :
                  process.priority}</td>
                <td>
                  {/*Boton para editar o confirmar edición*/
                  editMode === process.id ? 
                  <button onClick={() => confirmEdit(process.id)}><i class="fa-solid fa-check"></i></button> : 
                  <button onClick={() => edit(process.id)}><i class="fa-solid fa-pen-to-square"></i></button>}
                   
                  {/*Boton para eliminar el proceso*/}
                  <button onClick={() => removeProcess(process.id)}> <i class="fa-regular fa-trash-can" ></i></button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <input
                  required
                  type="text"
                  name="name"
                  value={newProcessInfo.name}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  min={0}
                  type="number"
                  name="duration"
                  value={newProcessInfo.duration}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  min={0}
                  type="number"
                  name="arrivalTime"
                  value={newProcessInfo.arrivalTime}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  min={0}
                  type="number"
                  name="priority"
                  value={newProcessInfo.priority}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                {/*Boton para agregar el proceso*/}
                <button className="btn-confirm" onClick={addProcess}><i class="fa-solid fa-plus"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <FifoSjf process={JSON.parse(JSON.stringify(processes))} type={'FIFO'} />
      <FifoSjf process={JSON.parse(JSON.stringify(processes))} type={'SJF'} />
    </main>
  )
}

export default App
