import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Signup } from './Signup';

if (Meteor.isClient) {
    describe('Signup', function () {
        it('should show error messages', function () {
            const error = "This is not working";
            const wrapper = mount(<Signup createUser={() => {}}/>);

            wrapper.setState({error});
            const errorText = wrapper.find('p').text();

            expect(errorText).toBe(error);
        });
        
        it('should show no error messages if no error', function () {
            const error = "This is not working";
            const wrapper = mount(<Signup createUser={() => {}}/>);

            wrapper.setState({error: ""});
            const errorText = wrapper.find('p').length;

            expect(errorText).toBe(0);
        });
        
        it('should call createUser with password and form data', function () {
            const email = "test@test.com";
            const password = "password1";
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={spy}/>);

            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;

            wrapper.find('form').simulate('submit');
            expect(spy.calls[0].arguments[0]).toEqual({email, password});
        });
        
        it('should require password to be 9 characters long and trim password', function () {
            const email = "test@test.com";
            const password = "password         ";
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={spy}/>);

            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;

            wrapper.find('form').simulate('submit');
            expect(wrapper.state('error').length).toBeGreaterThan(0);
        });

        it('should set Signup with password callback erros', function () {
            const email = "test@test.com";
            const password = "password1";
            const reason = 'Needs to be longer';
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={spy}/>);

            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;

            wrapper.find('form').simulate('submit');
            // error.reason needs to be added as object since it is referenced in the code
            // so we call the function and pass it that object
            spy.calls[0].arguments[1]({reason});

            expect(wrapper.state('error')).toBe(reason)

        });
    });
}