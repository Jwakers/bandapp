import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import { Comment } from "./Comment";
import Modal from "../Modal/Modal"

configure({ adapter: new Adapter() });

describe("<Comment />", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Comment />)
    })

    it('should only render an edit modal if the comment was self authored', () => {
        expect(wrapper.find(Modal)).toHaveLength(0)
        wrapper.setProps({isSelf: true})
        expect(wrapper.find(Modal)).toHaveLength(1)
    })
    
    it('should display \"You\" if the comment was self authored, and userID if otherwise', () => {
        wrapper.setProps({isSelf: false, createdBy: "otherUser"})
        expect(wrapper.find(".comment__by").contains("otherUser")).toBeTruthy()
        wrapper.setProps({isSelf: true})
        expect(wrapper.find(".comment__by").contains("You")).toBeTruthy()
    })

    it('should apply a \"comment--self\" class, if the comment was self authored', () => {
        wrapper.setProps({isSelf: true})
        expect(wrapper.find(".comment").hasClass('comment--self')).toBeTruthy()
    })

    it('should display a time stamp (00:00:00) if created on the same day, and a date if otherwise (DD/MM/YYY)', () => {
        wrapper.setProps({createdOn: "Fri Jan 28 2021 12:03:20 GMT+0000 (Greenwich Mean Time)"})
        expect(wrapper.find(".comment__when").contains("28/01/2021"))
        const now = new Date()
        wrapper.setProps({createdOn: now.toDateString()})
        expect(wrapper.find(".comment__when").contains(now.toTimeString()))
    })
});
