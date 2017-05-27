import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Login } from './Login';

if (Meteor.isClient) {
    describe('Login', function () {
        it('should show error messages', function () {
            const error = "This is not working";
            const wrapper = mount(<Login loginWithPassword={() => {}}/>);

            wrapper.setState({error});
            const errorText = wrapper.find('p').text();

            expect(errorText).toBe(error);
        });
        
        it('should show no error messages if no error', function () {
            const error = "This is not working";
            const wrapper = mount(<Login loginWithPassword={() => {}}/>);

            wrapper.setState({error: ""});
            const errorText = wrapper.find('p').length;

            expect(errorText).toBe(0);
        });
        
        it('call login with password and form data', function () {
            const email = "test@test.com";
            const password = "password";
            const spy = expect.createSpy();
            const wrapper = mount(<Login loginWithPassword={spy}/>);

            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;

            wrapper.find('form').simulate('submit');
            expect(spy.calls[0].arguments[0]).toEqual({email});
            expect(spy.calls[0].arguments[1]).toEqual(password);
        });
        
        it('should set login with password callback erros', function () {

            const spy = expect.createSpy();
            const wrapper = mount(<Login loginWithPassword={spy}/>);

            wrapper.find('form').simulate('submit');
            // pass in an empty object since the function on the page expects an err to be passed
            // so we call the function and pass it that object
            spy.calls[0].arguments[2]({});

            expect(wrapper.state('error')).toNotBe('')
            // These are the same tests
            // expect(wrapper.state('error').length).toNotBe(0)

            spy.calls[0].arguments[2]();

            expect(wrapper.state('error')).toBe('');

        });
    });
}