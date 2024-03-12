import './App.css'
import { useState } from "react"
import { FifoSjf } from "./componets/FifoSjf"
import { RoundRobin } from './componets/RoundRobin'

import AddImg from './assets/add.svg'
import ConfirmImg from './assets/confirm.svg'
import EditImg from './assets/edit.svg'
import DeleteImg from './assets/delete.svg'
import GitHubImg from './assets/github.svg'

/*
Los procesos van a ser un array de objetos con la siguiente forma:
{
  id: 1,
  name: 'Proceso 1',
  arrivalTime: 0, <-- Tiempo de llegada
  duration : 5,   <-- Rafaga de CPU
  priority: 1,
}
*/

function App() {
  const [ID, setID] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [processes, setProcesses] = useState([])
  
  const [quantum, setQuantum] = useState(2);
  const [editQuantum, setEditQuantum] = useState(2);

  const [viewSFJ, setViewSFJ] = useState(false);
  const [viewFIFO, setViewFIFO] = useState(false);
  const [viewPRIORIDAD, setViewPRIORIDAD] = useState(false);
  const [viewRoundRobin, setViewRoundRobin] = useState(false);

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
      // Verificar si el nombre ya existe en la lista de procesos
      const isNameUnique = processes.every((process) => process.name !== name);

      if (isNameUnique) {
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
      } else {
        alert("El nombre del proceso debe ser único.");
      }
    }
  };

  const edit = (id) =>{
    setEditMode(id);
    const processToEdit = processes.find((process) => process.id === id);
    setEditProcess(processToEdit);
  }

  const confirmEdit = (id) => {
    const updatedProcesses = processes.map((process) => {
      if (process.id === id) {
        // Verificar si el nombre ya existe en la lista de procesos
        const isNameUnique = processes.every(
          (otherProcess) => otherProcess.id === id || otherProcess.name !== editProcess.name
        );
  
        if (isNameUnique) {
          return editProcess;
        } else {
          alert("El nombre del proceso debe ser único.");
          return process; // Mantener el proceso sin cambios si el nombre no es único
        }
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
                  <button className='BTN-Actions' onClick={() => confirmEdit(process.id)}><img src={ConfirmImg} alt='Confirmar edicion' /></button> : 
                  <button className='BTN-Actions' onClick={() => edit(process.id)}><img src={EditImg} alt='Editar proceso'/></button>}
                   
                  {/*Boton para eliminar el proceso*/}
                  <button className='BTN-Actions' onClick={() => removeProcess(process.id)}><img src={DeleteImg} alt='Eliminar proceso'/></button>
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
                <button className="btn-confirm BTN-Actions" onClick={addProcess}><img src={AddImg} alt='Agregar proceso'/></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
      <label htmlFor="quantum">Quantum: </label>
      <input
        name="quantum"
        min={1}
        type="number"
        value={editQuantum}
        onChange={(e) => setEditQuantum(e.target.value)}
      />
      <button onClick={() => setQuantum(editQuantum)}>Aplicar</button>
      </div>
      <div className='BTNS-Algoritms'>
        <button className={viewFIFO ? 'is-active' : ''}onClick={() => setViewFIFO(!viewFIFO)}>FIFO</button>
        <button className={viewSFJ ? 'is-active' : ''} onClick={() => setViewSFJ(!viewSFJ)}>SFJ</button>
        <button className={viewPRIORIDAD ? 'is-active' : ''}onClick={() => setViewPRIORIDAD(!viewPRIORIDAD)}>Prioridad</button>
        <button className={viewRoundRobin ? 'is-active' : ''}onClick={() => setViewRoundRobin(!viewRoundRobin)}>Round Robin</button>
      </div>
      {
        viewFIFO && <FifoSjf process={JSON.parse(JSON.stringify(processes))} type={'FIFO'} />
      }
      {
        viewSFJ && <FifoSjf process={JSON.parse(JSON.stringify(processes))} type={'SJF'} />
      }
      {
        viewPRIORIDAD && <FifoSjf process={JSON.parse(JSON.stringify(processes))} type={'PRIORIDAD'} />
      }
      {
        viewRoundRobin && <RoundRobin process={JSON.parse(JSON.stringify(processes))} quantum={Number(quantum)} />
      }

      <footer>
        <a className='link-footer' href="https://github.com/LBJuanLB/AlgoritmosGestionProcesos" target="_blank" rel="noopener noreferrer"><img src={GitHubImg} alt='Repositorio del aplicativo'/></a>
      </footer>
    </main>
  )
}

export default App
