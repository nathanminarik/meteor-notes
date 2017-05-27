import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { PrivateHeader } from './PrivateHeader';

if (Meteor.isClient) {
    describe('PrivateHeader', function () {
        it('should set button text to logout', function () {
            const wrapper = mount(<PrivateHeader title="Test Title" handleLogout={() => {}} />)
            const buttonText = wrapper.find('button').text();

            expect(buttonText).toBe("Logout");
        });
        
        it('should set title to prop value', function () {
            const title = "Test Title";
            const wrapper = mount(<PrivateHeader title="Test Title" handleLogout={() => {}}/>);
            const h1Text = wrapper.find('h1').text();

            expect(h1Text).toEqual(title);

        });

        // Playing around with spies
        // it('should call the function', function () {
        //     const spy = expect.createSpy();
        //     // Sample calling spy
        //     // spy(2, 3);
        //     // expect(spy).toHaveBeenCalled();

        //     // Sample not calling spy
        //     // expect(spy).toNotHaveBeenCalled();

        //     // Sample with arguments
        //     spy(2, 3);
        //     // debugger;
        //     expect(spy).toHaveBeenCalledWith(2, 3);
        //     expect(spy.calls.length).toBe(1);

        // });

        it('should call handleLogout on click', function () {

            const spy = expect.createSpy();
            const wrapper = mount(<PrivateHeader title="Test Title" handleLogout={spy}/>);

            wrapper.find('button').simulate('click');

            expect(spy).toHaveBeenCalled();
        });
    });
}