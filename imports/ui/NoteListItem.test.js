import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
    describe('NoteListItem', function () {
        it('should render title and timestamp', function () {
            const title = 'Test Title';
            const updatedAt = 1495506252562;
            const wrapper = mount( <NoteListItem note={{title, updatedAt}} />);

            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe('5/22/17');
        });

        it('should set default title to "Untitled Note"', function () {
            const title = "";
            const wrapper = mount( <NoteListItem note={{title}} />);

            expect(wrapper.find('h5').text()).toBe('Untitled Note');
        });
    });
}