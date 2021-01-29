import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'

import Topnav from './Topnav'

configure({adapter: new Adapter()})

describe('<Topnav />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Topnav />)
    })

    it('should show menu button if authenticated', () => {
        wrapper.setProps({isAuth: true})
        expect(wrapper.contains(<i className="material-icons md-36">menu</i>)).toBeTruthy()
    })
})