import axios from 'axios';
import React, { useState, useEffect } from 'react'

//Style
import './style.css';


const FloatingBox = ({ visible, setVisible, data, setData }) => {
    console.log(data);
    const [newData, setNewData] = useState({})

    useEffect(() => {
        setNewData({
            name: data ? data.name : "",
            description: data ? data.description : "",
            type: data ? data.type : "all",
            points_needed: data ? data.points_needed : 0,
            enabled: data ? data.enabled : 1
        })

    }, [data])
    return (
        visible && (
            <div className="floating-box-container">
                <div className="container">
                    <div className="closing" onClick={() => setVisible(false)}>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="title">
                        <span>Edit Badge Info</span>
                    </div>
                    <div className="input-container">
                        <input type="text"
                            value={newData.name} onChange={(e) => setNewData( {...newData, name: e.target.value} )}
                        />
                    </div>
                    <div className="input-container">
                        <textarea type="textarea"
                            value={newData.description} onChange={(e) => setNewData({ ...newData, description: e.target.value })}

                        ></textarea>
                    </div>
                    <div className="wrapper">
                        <div className="select-container">
                            <label >Type: </label>
                            <select value={newData.type} onChange={(e) => setNewData({ ...newData, type: e.target.value })}>
                                <option value="developers">Developers only</option>
                                <option value="all">All Employees</option>
                            </select>
                        </div>
                        <div className="number-container">
                            <label>Points: </label>
                            <input type="number"
                                value={newData.points_needed} onChange={(e) => setNewData({ ...newData, points_needed: e.target.value })} />
                        </div>
                    </div>
                    <div className="buttons-container">
                        <button onClick={() => setVisible(false)}>cancel</button>
                        <button onClick={async () => {
                            console.log(`newData: ${newData}`)
                            const res = (await axios.patch(`http://localhost:3001/admin/badge/${data.id}`, 
                                newData
                            ))
                            console.log(res);
                            setVisible(false)
                            window.location.reload();
                        }}>confirm</button>
                    </div>

                </div>
            </div>
        )

    )
}

export default FloatingBox
