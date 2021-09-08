import React, {useState, useEffect} from 'react'
import {Descriptions} from 'antd'
import axios from 'axios'

const PersonalInfo = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    useEffect(() => {
        const id = 1
        const cycleID = 1
        const getInfo = async () => {
            const res = await (axios.get(`http://localhost:3001/employee/profile/${id}/${cycleID}`))
        }
        getInfo()
    }, [])

    return (
        <Descriptions column={1} style={{width: '45%'}} title="User Info">
            <Descriptions.Item label="E-mail">Zhou Maomao</Descriptions.Item>
         
            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
       
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
        
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
        
            <Descriptions.Item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
        </Descriptions>
        )
}

export default PersonalInfo