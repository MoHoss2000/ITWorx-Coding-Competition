import axios from 'axios';
import React, { useState, useEffect } from 'react'
// import { Form, Button, Spin, Input, InputNumber, Select, Switch, Alert } from 'antd';

//Style
import './style.css';

//Assets
import Badge1 from '../../../assets/imgaes/badges/1.jpeg';


const FloatingBox = ({ visible, setVisible, data, setData, newBadge }) => {
    const [newData, setNewData] = useState({})

    useEffect(() => {
        setNewData({
            name: data ? data.name : "",
            description: data ? data.description : "",
            icon: data ? data.icon : 0,
            type: data ? data.type : "all",
            points_needed: data ? data.points_needed : 0,
            enabled: data ? data.enabled : 1
        })
    }, [data]
    )



    return (
        visible && (
            <form onSubmit={e => { e.preventDefault(); }} name='badge-form'>
                <div className="floating-box-container">
                    <div className="container">
                        <div className="closing" onClick={() => setVisible(false)}>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="title">
                            <span>{newBadge ? 'Add New Badge' : 'Edit Badge Info'}</span>
                        </div>

                        <div className="input-container">
                            <label >Title: </label>
                            <input name='title' type="text" required
                                value={newData.name} onChange={(e) => setNewData({ ...newData, name: e.target.value })}
                            />
                        </div>
                        <div className="input-container">
                            <label >Description: </label>
                            <textarea name='description' type="textarea" required
                                value={newData.description} onChange={(e) => setNewData({ ...newData, description: e.target.value })}
                            ></textarea>
                        </div>
                        <div class="dropdown">
                            <button class="dropbtn">
                                Country Flags
                            </button>

                            <div class="dropdown-content">
                                <a href="#">
                                    <img src=
                                        "https://media.geeksforgeeks.org/wp-content/uploads/20200630132503/iflag.jpg"
                                        width="20" height="15" /> India</a>

                                <a href="#">
                                    <img src=
                                        "https://media.geeksforgeeks.org/wp-content/uploads/20200630132504/uflag.jpg"
                                        width="20" height="15" /> USA</a>
                                <a href="#">
                                    <img src=
                                        "https://media.geeksforgeeks.org/wp-content/uploads/20200630132502/eflag.jpg"
                                        width="20" height="15" /> England</a>
                                <a href="#">
                                    <img src=
                                        "https://media.geeksforgeeks.org/wp-content/uploads/20200630132500/bflag.jpg"
                                        width="20" height="15" /> Brazil</a>
                            </div>
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
                                <input name='points' type="number"
                                    value={newData.points_needed} onChange={(e) => setNewData({ ...newData, points_needed: e.target.value })} />
                            </div>
                        </div>
                        <div className="buttons-container">
                            <button onClick={() => setVisible(false)}>Cancel</button>
                            <button onClick={async () => {
                                var title = document.forms['badge-form']['title'].value;
                                var description = document.forms['badge-form']['description'].value;
                                var points = document.forms['badge-form']['points'].value;

                                if (title == null || title == "")
                                    window.alert('Please enter a title');

                                else if (description == null || description == '')
                                    window.alert('Please enter badge description');

                                else if (points == null || points <= 0)
                                    window.alert('Please enter valid no of points greater than 0');
                                else {
                                    if (newBadge) {
                                        await axios.post(`http://localhost:3001/admin/badge`,
                                            newData
                                        );
                                    }
                                    else {
                                        await axios.patch(`http://localhost:3001/admin/badge/${data.id}`,
                                            newData
                                        );
                                    }
                                    setVisible(false)

                                    const res = (await axios.get('http://localhost:3001/admin/badges'))
                                    setData(res.data)
                                    setNewData({});
                                }
                            }}>Confirm</button>
                        </div>
                    </div>
                </div>
            </form >
        )

    )
}

export default FloatingBox
