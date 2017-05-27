import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import { Notes } from './../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

// 1. Create new file. Setup default export for functional component
// 2. Pick some text
// 3. Conditionally render if there are no notes

export const NoteList = (props) => {
    
    // function renderEmptyNote () {
    //     if (props.notes.length === 0) {
    //         return <NoteListEmptyItem />
    //     } else {
    //         return undefined
    //     }   
    // }
    
    return (
        <div>
            <NoteListHeader />
            {/*{renderEmptyNote() }*/}
            {props.notes.length === 0 ? <NoteListEmptyItem /> : undefined}
            {
                /*
                    Use map method to cover notes array into jsx
                    Set up key prop equal to _id
                    Setup note prop
                */

                props.notes.map((note) => {
                    return <NoteListItem key={note._id} note={note} />
                })
            }
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
}

export default createContainer(() => {
    Meteor.subscribe('notes');

    return {
        notes: Notes.find().fetch()
    };
}, NoteList)