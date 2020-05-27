import * as React from "react";
import { DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@material-ui/core";
import update from "immutability-helper";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { IQuestion } from "src/Data/Interfaces/Questions";

interface INewQuestionFormProps {
    onCancel: () => void;
    submit: (question: any) => void;
    question?: IQuestion;
}

interface INewQuestionFormState {
    prompt: string;
    answers: string[];
}

export default class NewQuestionForm extends React.Component<INewQuestionFormProps, INewQuestionFormState> {
    constructor(props: INewQuestionFormProps) {
        super(props);
        this.state = {
            prompt: props?.question?.prompt ?? "",
            answers: props?.question?.answers ?? [ "" ]
        }
    }

    render() {
        const { prompt } = this.state;
        const header = this?.props?.question ? "Edit Question" : " Create Question";
        const submitText = this?.props?.question ? "Save" : " Create Question";

        return (
            <React.Fragment>
                <DialogTitle>
                    <DialogTitle>{ header }</DialogTitle>
                    <DialogContent>
                        <TextField 
                            className="question-field"
                            value={ prompt }
                            onChange={ this.handleUpdatePrompt }
                            autoFocus
                            margin="dense"
                            id="question-prompt"
                            label="Question Prompt"
                            type="text"
                            fullWidth />
                        { this.renderAnswerFields() }
                        <div className="add-answer-button" onClick={ this.handleAddAnswer }>
                            <AddIcon 
                                color="primary"
                                fontSize="large"/>
                        </div>
                        <DialogActions>
                            <Button onClick={ this.props.onCancel } color="primary">Cancel</Button>
                            <Button onClick={ this.createQuestion } color="primary">{ submitText }</Button>
                        </DialogActions>
                    </DialogContent>
                </DialogTitle>
            </React.Fragment>
        );
    }

    renderAnswerFields = () => {
        return (
            <React.Fragment>
                { this.state.answers.map(this.renderAnswerField) }
            </React.Fragment>
        );
    }

    renderAnswerField = (answer: string, index: number) => {
        return (
            <div className="answer-row">
                <TextField 
                    value={ answer }
                    autoFocus
                    margin="dense"
                    id="question-prompt"
                    label={ `Answer ${ index + 1 }` }
                    type="text"
                    onChange={ this.createUpdateAnswerHandler(index) }
                    fullWidth />
                { this.renderDeleteAnswer(index) }
            </div>
        );
    }

    renderDeleteAnswer = (index: number) => {
        const { answers } = this.state;
        
        if (answers.length < 2) {
            return <div />;
        }
        
        return (
            <div onClick={ this.createDeleteAnswerHandler(index) } >
                <RemoveIcon 
                    color="error"
                    fontSize="large" />
            </div>
        ) 
    }

    handleUpdatePrompt = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(update(this.state, {
            prompt: {
                $set: event.target.value
            }
        }))
    }

    createUpdateAnswerHandler = (index: number) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState(update(this.state, {
                answers: {
                    [index]: {
                        $set: event.target.value
                    }
                }
            }))
        }
    }

    handleAddAnswer = () => {
        this.setState(update(this.state, {
            answers: {
                $push: [ "" ]
            }
        }));
    }

    createDeleteAnswerHandler = (index: number) => {
        return () => {
            if (index > this.state.answers.length) {
                return;
            }

            this.setState(update(this.state, {
                answers: {
                    $splice: [ [ index, 1 ] ]
                }
            }));
        }
    }

    createQuestion = () => {
        this.props.submit({ 
            ...this.state,
            _id: this?.props?.question?._id
        });
    }
}