import { React, useState } from 'react'
import { TabBar } from 'antd-mobile'
import {
    useNavigate,
    useLocation,
} from 'react-router-dom'
import PropTypes from 'prop-types'
function NavFooter({ navList }) {

    // const [tabs, setTabs] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const { pathname } = location
    const setRouteActive = (value) => {
        navigate(value)
    }
    const tabs = navList.filter(nav => !nav.hide)

    return (
        <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
            {tabs.map(item => (
                <TabBar.Item key={item.path} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
    )
}

export default NavFooter
NavFooter.propTypes = {
    navList: PropTypes.array.isRequired
}