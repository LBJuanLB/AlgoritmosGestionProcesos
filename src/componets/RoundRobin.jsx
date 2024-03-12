import { Chart } from './Chart';

export function RoundRobin({process, quantum = 2}) {
    let waitingTime = 0; //totalwaitTime
    let systemTime = 0; //totalSystemTime
    let processList = [];
    let ProcessValues = [];
    ProcessValues.push({x: '', y: [20, 20]});
    const Times = () => {
        processList = [...process] || [];
        let time = 0; //currentTime
        let remainingProcesses = processList.length;
        //Creamos un arreglo con el tiempo de duración de cada proceso
        let remainingTime = processList.map((process) => Number(process.duration));
        let waitTime = processList.map(() => 0);
        
        //Variable para contar cuantos procesos no se han podido ejecutar por que aun no llega su tiempo de llegada
        let ciclos = 0;

        while (remainingProcesses > 0) {
            for (let i = 0; i < processList.length; i++) {
                if (remainingTime[i] > 0 && processList[i].arrivalTime <= time) {
                    let start = time;
                    if (remainingTime[i] > quantum) {
                        time += quantum;
                        remainingTime[i] -= quantum;
                    } else {
                        time += remainingTime[i];
                        waitTime[i] = time - processList[i].arrivalTime - processList[i].duration;
                        remainingTime[i] = 0;
                        remainingProcesses -= 1;
                    }
                    let end = time;
                    ProcessValues.push({x: processList[i].name, y: [start, end]});
                    ciclos = 0;
                } else if (remainingTime[i] > 0 && ciclos >= processList.length) {
                    console.log('entro')
                    time++;
                    ciclos = 0;
                } else {
                    console.log('hola')
                    ciclos++;
                }
            }
        }

        for (let i = 0; i < processList.length; i++) {
            waitingTime +=waitTime[i];
            systemTime +=waitTime[i] + Number(processList[i].duration);
        }

        console.log(processList.length)
        console.log(waitingTime)
        console.log(systemTime)
        waitingTime = waitingTime / processList.length;
        systemTime = systemTime / processList.length;
        ProcessValues[0] = {x: '', y: [time, time]};
    }

    return (
        <div>
            {Times()}
            <Chart series={[{data:ProcessValues}]} title={'Round Robin'} />
            <p className='text-box'>Tiempo de espera promedio: {waitingTime >= 0  ? waitingTime.toFixed(2) : 0}</p>
            <p className='text-box'>Tiempo de sistema promedio: {systemTime >= 0 ? systemTime.toFixed(2) : 0}</p>
        </div>
    )
}