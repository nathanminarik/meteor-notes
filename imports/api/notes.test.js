import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {

    describe('notes', function () {
        
        const noteOne = {
            _id: 'testNoteId1',
            title: 'My title',
            body: 'My body for note',
            updatedAt: 0,
            userId: 'testUserId1'
        };
        
        const noteTwo = {
            _id: 'testNoteId2',
            title: 'My title',
            body: 'My body for note',
            updatedAt: 0,
            userId: 'testUserId2'
        }

        beforeEach(function () {
            Notes.remove({});

            Notes.insert(noteOne);
            Notes.insert(noteTwo);
        });
        
        it('should insert new Note', function () {
            const userId = 'testid'
            const _id = Meteor.server.method_handlers['notes.insert'].apply({userId});

            expect(Notes.findOne({_id, userId})).toExist();
        });
        
        it('should not insert new Note if not authenticated', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.insert']();
            }).toThrow();
        });

        it('should remove note', function () {
            Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [noteOne._id]);

            expect(Notes.findOne({_id: noteOne._id})).toNotExist();
        });

        it('should not remove note is unathenticated', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.remove']().apply({}, [noteOne._id]);
            }).toThrow();
        });

        it('should not remove note if invalid Id', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.remove']().apply({userId: 'testUser1'}, ['']);
            }).toThrow();
        });

        it('should update note', function () {
            
            const title = 'New title';

            Meteor.server.method_handlers['notes.update'].apply({
                userId: noteOne.userId
            }, [noteOne._id, {
                title
            }]);

            const note = Notes.findOne(noteOne._id);

            expect(note.updatedAt).toBeGreaterThan(0);
            expect(note).toInclude({title});
        });

        it('should throw an error with extra updates', function () {
            const updates = {
                title: 'Throw error from name key'
            }

            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({
                    userId: noteOne.userId
                }, [
                    noteOne._id,
                    {
                        title: updates.title,
                        name: updates.name
                    }
                ]);
            }).toThrow();
        });

        it('should not update not that user did not create', function () {
            const title = 'New title';

            Meteor.server.method_handlers['notes.update'].apply({
                userId:'notAValidUser'
            }, [noteOne._id, {
                title
            }]);

            const note = Notes.findOne(noteOne._id);

            expect(note).toInclude(noteOne);
        });

        it('should not update note is unathenticated', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.update']().apply({}, [noteOne._id]);
            }).toThrow();
        });

        it('should not update note if invalid Id', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.update']().apply({userId: 'testUser1'}, ['']);
            }).toThrow();
        });

        it('should return a user\'s notes', function () {
            const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
            const notes = res.fetch();

            expect(notes.length).toBe(1);
            expect(notes[0]).toEqual(noteOne);
        });

        it('should return zero notes for a user that has none', function () {
            const res = Meteor.server.publish_handlers.notes.apply({userId: 'someIdwithZeroNotes'});
            const notes = res.fetch();

            expect(notes.length).toBe(0);
        });
    });
};