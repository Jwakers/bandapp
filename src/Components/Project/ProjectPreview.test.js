import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import { ProjectPreview } from "./ProjectPreview";
import Progress from "./Progress";

import { objectStatus } from "../../shared/strings";

configure({ adapter: new Adapter() });

describe("<ProjectPreview />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ProjectPreview tasks={[]} />);
    });

    it("should render <Progress /> if the project has tasks associated with it", () => {
        wrapper.setProps({
            tasks: [{ heading: "test", status: objectStatus.pending }],
        });
        expect(wrapper.find(Progress)).toHaveLength(1);
    });
});
