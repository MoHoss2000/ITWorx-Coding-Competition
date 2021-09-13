import React from 'react'
import {List, Card} from 'antd'

const VirtualRecognitions = (props) => {
    const virtual_recognitions =  props.data

    const data = virtual_recognitions.map((element, i) => {
        return {key: i+1, name: element.name, description: element.description}
    })

    return(
        <Card className='info-card1'>
            <span style={{fontWeight: 'bold', fontSize: '25px'}}>Virtual Recognitions</span>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.key + '. ' + item.name}
                            description={item.description}
                            />
                    </List.Item>
                )}
            />
        </Card>
        )
}
export default VirtualRecognitions