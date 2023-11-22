import { useEffect, useState } from "react";

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

// import primereact
const Date = () => {
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [data, setData] = useState()

    const findDates = () => {
        fetchData().then(
            res => {
                console.log(data);
                let dates = JSON.parse(res.data)
                setData(dates) 
            }
        )
    }
    const parashot = () => {
        fetchData().then(
            res => {
                let dates = JSON.parse(res.data)
                dates = dates.map(d => {return d.className === 'parashat'})
                setData(dates)
                console.log(dates);
            }
        )
    }
    const fetchData = async () => {
        if (start !== null && end !== null && start < end) {
            let myData = await fetch(`http://www.hebcal.com/hebcal?cfg=fc&v=1&i=off&maj=on&min=on&mf=on&ss=on&lg=he&s=on&start=${start}&end=${end}`)
                .then(response => response.text())
                .then(result => (result))
                .catch(error => console.log('error', error));

            return new Promise((resolve, reject) => {
                resolve({ data: myData });
            });
        }
        else { console.log("error, try again") }
    }

    let dates =
        data && data.map((d) => {
            return (<div>
                <h1>{d.title}</h1>
                <h2>{d.description}</h2>
                <h3>{d.start}</h3>
            </div>)
        })
    useEffect(() => {
        fetchData()
    }, [start, end]);
    return (
        <>
            <h1>Enter dates that you want to see!!</h1>
            <br></br>
            <input placeholder="Enter start Date" onBlur={(e) => setStart(e.target.value)}></input>
            <input placeholder="Enter end Date" onBlur={(e) => setEnd(e.target.value)}></input>
            <button onClick={findDates}>search dates</button>
            <button onClick={parashot}>parashot </button>
            {dates}
        </>);

const toast = useRef(null);
// הצגה בספריה!!
        //    {/* <div className="card">
        //         <Toast ref={toast} />
        //         <DataTable value={data} cellSelection selectionMode="single" selection={selectedCell}
        //             onSelectionChange={(e) => setSelectedCell(e.value)} metaKeySelection={false}
        //             onCellSelect={onCellSelect} onCellUnselect={onCellUnselect} tableStyle={{ minWidth: '50rem' }}>
        //             <Column field="titel" header="titel"></Column>
        //             <Column field="description" header="description"></Column>
        //             <Column field="start" header="start"></Column>
                   
                 
        //         </DataTable>
        //     </div> */}
};
export default Date;
