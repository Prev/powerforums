import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { nodeListFetch } from '../actions/nodeListActions'

import './CreateReplyForm.css'
import '../client'

export const createReplyFormSubmit = formValues => (dispatch, getState, client) => {
    // Make an API call (createNode) using form values.
    return client.createNode( formValues )
        .then(response => {
            // Node creation was successful, we want to refresh node list.
            dispatch(nodeListFetch())
        })
        .catch(error => {
            // Node creation failed, we want to display the error (redux-forms managing).
            throw new SubmissionError({ _error: error.response.data.message })
        })
}

class CreateReplyForm extends Component {
    constructor(props) {
        super(props)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleFormSubmit(formValues) {
console.log('CreateReplyForm, handleFormSubmit', formValues)
        // Add "not user related" values to form, and trigger the submission with merged value set.
        return this.props.handleFormSubmit(Object.assign({
                type: "Reply",
                sticky: false,
                parentId: this.props.parentId
            },
            formValues
        ))
    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting} = this.props

        if (this.props.hasOwnProperty('commentLabel') && this.props.commentLabel === '') {
            var commentLabel = ''
        } else {
            var commentLabel = <div>{this.props.commentLabel}</div>
        }

        return (
            <div className="create-reply-form">
                {error && <strong>{error}</strong>}
                <form>
                    {commentLabel}
                    <div>
                        <Field name="content"
                               component="textarea"
                               type="text"
                               placeholder="Please enter your answer" />
                    </div>
                    <div>
                        <button type="submit" disabled={submitting}>Post reply</button>
                        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    parentId: state.nodeList.parentNodeId,
})

const mapDispatchToProps = dispatch => ({
    handleFormSubmit: formValues => {
        return dispatch(createReplyFormSubmit(formValues))
    }
})

CreateReplyForm = reduxForm({ enableReinitialize: false, onSubmit: () => {} }) (CreateReplyForm)

CreateReplyForm = connect(mapStateToProps, mapDispatchToProps) (CreateReplyForm)

export default CreateReplyForm