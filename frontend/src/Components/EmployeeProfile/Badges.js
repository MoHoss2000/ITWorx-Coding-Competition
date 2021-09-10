import React from 'react'
import {List, Card} from 'antd'

const Badges = (props) => {
    
    const data = props.data.map((element, i) => {
        return {key: i+1, name: element.name, description: element.description, date: element.date}
    })

    return(
        <Card className='info-card1'>
            <span style={{fontWeight: 'bold', fontSize: '25px'}}>Badges</span>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.key + '. ' + item.name}
                            description={item.description + "    Earned on: "  + item.date.substring(0,10)}
                            />
                    </List.Item>
                )}
            />
        </Card>
        )


}
export default Badges