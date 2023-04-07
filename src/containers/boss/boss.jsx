/**
 * 老板主界面路由组件
 */
import { React, useEffect } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/actions'
import UserList from '../../components/user-list/user-list'
function Boss({ getUserList, userList }) {

    useEffect(() => {
        if (userList.length == 0) {
            getUserList('expert')
        }
    }, [])

    return (
        <>
            <UserList userList={userList}></UserList>
        </>

    )
}


export default connect(
    state => ({ userList: state.userList }),
    { getUserList }
)(Boss)