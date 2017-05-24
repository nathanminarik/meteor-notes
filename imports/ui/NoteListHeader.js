import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import { Notes } from './../api/notes';

// Note List Header

// 1. create NoteListHeader functional component
// 2. Render a button to the screen
// 3. Set up an onclick Handler for the button
// 4. Call props.meteorCall trigger notes.insert meteor method
// 5. Render container component in NoteList

export const NoteListHeader = (props) => {
    return (
        <button onClick={() => {
            props.meteorCall('notes.insert');
        }}>Create Note</button>
    )
}

// NoteListHeader.propTypes = {
//     meteorCall: PropTypes.func.isRequired
// }

export default createContainer(() => {
    return {
        meteorCall: Meteor.call
    }
}, NoteListHeader)