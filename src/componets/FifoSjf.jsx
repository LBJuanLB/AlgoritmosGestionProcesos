import { Chart } from './Chart';

export function FifoSjf ({process,type = 'FIFO'}) {
    console.log(process)
    let waitingTime = 0;
    let systemTime = 0;
    let processList = [];
    let ProcessValues = [];
    let title = '';

    const Times = () => {
        //Copia del arreglo de procesos
        processList = [...process] || [];
        let time = 0;
        let executedProcess = 0;
        if (type == 'FIFO') {
            //Ordenar por tiempo de llegada
            title = 'FIFO - First In First Out'
            processList.sort((a, b) => a.arrivalTime - b.arrivalTime);
        } else {
            //Ordenar por tiempo de duración
            title = 'SJF - Short Job First'
            processList.sort((a, b) => a.duration - b.duration);
        }
        
        const ProcessLength = processList.length;

        while (executedProcess < ProcessLength) {
            for (let i = 0; i < processList.length; i++) {
                if (processList[i].arrivalTime <= time) {

                    ProcessValues.push({x: processList[i].name, y: [time, time + Number(processList[i].duration)]})

                    waitingTime += time - Number(processList[i].arrivalTime);

                    systemTime += time + Number(processList[i].duration) - Number(processList[i].arrivalTime);

                    time += Number(processList[i].duration);

                    executedProcess += 1;

                    //Eliminar el proceso de la lista
                    processList.splice(i, 1);

                    //Salir del for
                    break;
                } else if (processList[i].arrivalTime > time && i == processList.length - 1) {
                    time += 1;
                }
            }
        }

        waitingTime = waitingTime/ProcessLength ;
        systemTime = systemTime/ProcessLength ;
    }

    return (
        <div>
            {Times()}
            <Chart series={[{data:ProcessValues}]} title={title} />
            <p>Tiempo de espera promedio: {waitingTime >= 0  ? waitingTime.toFixed(2) : 0}</p>
            <p>Tiempo de sistema promedio: {systemTime >= 0 ? systemTime.toFixed(2) : 0}</p>
        </div>
    );
}