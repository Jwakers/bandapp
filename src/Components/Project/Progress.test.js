import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import Progress from "./Progress";

configure({ adapter: new Adapter() });

describe("<Progress />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Progress />);
    });

    it("should show correct representation of completed tasks", () => {
        wrapper.setProps({ complete: 15, total: 20 });
        expect(
            wrapper
                .containsAllMatchingElements([
                    <strong>{15}</strong>,
                    <strong>{20}</strong>,
                ])
        ).toBeTruthy()
    });
});
