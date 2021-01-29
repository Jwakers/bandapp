import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import { SideMenu } from "./SideMenu";

configure({ adapter: new Adapter() });

describe("<SideMenu />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<SideMenu bands />);
    });

    it("should render list of bands if props.bands has length > 0", () => {
        wrapper.setProps({ bands: [{ bandName: "test-bands", id: "testId" }, { bandName: "test-band2", id: "testId2" }] });
        expect(wrapper.find('.side-menu__item--subitem')).toHaveLength(2)
    });
});
