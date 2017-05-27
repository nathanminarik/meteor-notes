import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import NoteListItem from './NoteListItem';

import { NoteList } from './NoteList';

const notes = [
    {
        _id: 'noteId1',
        title: 'Note 1 Title',
        body: "Note 1 Body",
        userId: 'userId1',
        updatedAt: 0
    }, {
        _id: 'noteId2',
        title: 'Note 2 Title',
        body: "Note 2 Body",
        userId: 'userId2',
        updatedAt: 0
    },
];

if (Meteor.isClient) {
    describe('NoteList', function () {
        it('should render NoteListItem for each note', function () {
            const wrapper = mount(<NoteList notes={notes} />)

            expect(wrapper.find('NoteListItem').length).toBe(2);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
        });

        it('should render NoteListEmptyItem if there are no notes', function () {
            const wrapper = mount(<NoteList notes={[]} />);

            expect(wrapper.find('NoteListItem').length).toBe(0);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
        });
    });
}