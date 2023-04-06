import { React, useState, useCallback, useEffect } from 'react'
import { List, Grid } from 'antd-mobile'
import '../../assets/css/header-selector.less'
import PropTypes from 'prop-types'
export default function HeaderSelector({ setHeader }) {

    const [icon, setIcon] = useState(0)
    const [list, setList] = useState([])
    const imageContext = require.context('../../assets/images', true, /\.(jpg|png)$/)
    useEffect(() => {
        imageContext.keys().forEach((key) => {
            const str = key.match(/\d+/)
            list.push({
                key,
                text: '头像' + str,
                index: parseInt(str),
                image: imageContext(key)
            })
        })
        list.sort((a, b) => a.index - b.index)
        setList([...list])
    }, [])


    const handleItemClick = useCallback(
        (item) => {
            const header = item.text;
            setHeader({ header });
            setIcon(item.index);
        },
        [setHeader]
    )


    return (
        <>
            <List>
                <div>
                    &nbsp;请选择头像：<img src={ list[icon-1]?list[icon-1].image:null} />
                </div>
                <Grid columns={4}>
                    {
                        list.map(item => (
                            <Grid.Item key={item.key} onClick={() => handleItemClick(item)}>
                                <div className='grid-item-block' >
                                    <img src={item.image} alt="" />
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