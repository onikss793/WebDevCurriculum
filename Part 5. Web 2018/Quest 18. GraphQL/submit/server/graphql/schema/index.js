const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        getNote(note_id: ID!): Note
        getManyNotes: [Note]
        loadSessionData: SessionData
    }
    type Mutation {
        logIn(id: String!, pw: String!): LoginResult
        createNote(id: ID, title: String!, body: String!): GeneralResponse
        updateNote(id: ID, title: String!, body: String!, cursor_position: Int, isSelected: Boolean): GeneralResponse
        uploadSessionData(notes: String!): GeneralResponse
    }
    type Note {
        id: ID
        title: String!
        body: String!
        cursor_position: Int
        isSelected: Boolean
        user_id: ID!
    }
    type LoginResult {
        success: Boolean
        token: String
    }
    input NoteInput {
        id: ID
        title: String!
        body: String!
        cursor_position: Int
        isSelected: Boolean
    }
    type GeneralResponse {
        success: Boolean
    }
    type SessionData {
        user_id: ID!
        notes: [Note]
    }
`;