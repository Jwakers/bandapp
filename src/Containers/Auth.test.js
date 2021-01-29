import { configure, shallow } from "enzyme";
import { Redirect } from "react-router-dom";

import Adapter from "enzyme-adapter-react-16";
import React from "react";

import { Auth } from "./Auth";
import SignInForm from "../Components/Form/SignInForm";
import SignUpForm from "../Components/Form/SignUpForm";

configure({ adapter: new Adapter() });

describe("<Auth />", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Auth />);
    });

    it("should redirect user to projects if logged in", () => {
        wrapper.setProps({ userId: "testID" });
        expect(wrapper.find(Redirect).prop("to")).toEqual("/projects");
    });

    it("should show only <SignInForm /> OR <SignUpForm />, never both", () => {
        expect(wrapper.find(SignInForm)).toHaveLength(1);
        expect(wrapper.find(SignUpForm)).toHaveLength(0);
        wrapper.setState({isSignUp: true})
        expect(wrapper.find(SignUpForm)).toHaveLength(1);
        expect(wrapper.find(SignInForm)).toHaveLength(0);
    });
});
