import { React, useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Card, Space } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { MainContext ,images} from '../../utils'

function UserList({ userList }) {
    const navigate = useNavigate()
    const context = useContext(MainContext)

    return (
        <>
            <Space direction='vertical' block>
                {
                    userList && userList.map(user => (
                        <Card title={
                            <div className='user-card-title'>
                                <img src={images[user.header]}></img>
                                <span>
                                    {user.username}
                                </span>
                            </div>
                        } key={user._id} onClick={() => {
                            context.setNav(null)
                            navigate(`/chat/${user._id}`)
                        }}>
                            <div className='user-card-body'>
                                <div>职位: {user.post}</div>
                                {user.company ? <div>公司: {user.company}</div> : null}
                                {user.salary ? <div>月薪: {user.salary}</div> : null}
                                <div>描述: {user.info}</div>
                            </div>
                        </Card>
                    ))
                }
            </Space>
        </>

    )
}

export default UserList

UserList.propTypes = {
    userList: PropTypes.array.isRequired
}
