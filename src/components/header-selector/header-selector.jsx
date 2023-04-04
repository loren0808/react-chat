import { React, useState } from 'react'
import { List, Grid } from 'antd-mobile'
import '../../assets/css/header-selector.less'
import PropTypes from 'prop-types'
export default function HeaderSelector({ setHeader }) {

    const [icon,setIcon] = useState('')
    const images = {}
    const list = []
    const imageContext = require.context('./images', true, /\.(jpg|png)$/);
    imageContext.keys().forEach((key) => {
        const str = key.match(/\d+/)
        list.push({
            key,
            text: '头像' + str,
            index: parseInt(str)
        })
        images[key] = imageContext(key);
    })
    list.sort((a, b) => a.index - b.index)

    return (
        <>
            <List>
                <div>
                    &nbsp;请选择头像：<img src={images[icon]} />
                </div>
                <Grid columns={4}>
                    {
                        list.map(item => (
                            <Grid.Item key={item.key} onClick={(e) => {
                                const header = e.currentTarget.querySelector('.text').innerHTML
                                setHeader({header})
                                setIcon(`./${header}.png`)
                            }}>
                                <div className='grid-item-block' >
                                    <img src={images[item.key]} alt="" />
                                    <div className='text'>{item.text}</div>
                                </div>
                            </Grid.Item>
                        ))
                    }
                </Grid>
            </List>
        </>
    )
}

HeaderSelector.propTypes = {
    setHeader: PropTypes.func.isRequired
}