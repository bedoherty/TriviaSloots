import * as React from "react";
import { Dialog, Button } from "@material-ui/core";
import update from "immutability-helper";
import NewQuestionForm from "./NewQuestionForm";
import { IQuestion } from "src/Data/Interfaces/Questions";
import { createQuestionAsync } from "src/Data/Actions/Questions";
import { connect } from "react-redux";

interface INewQuestionButtonProps {
    createQuestion: (question: IQuestion) => void;
}

interface INewQuestionButtonState {
    modalVisible: boolean;
}

const mapDispatchToProps = (dispatch) => {
    return {
        createQuestion: (question: IQuestion) => dispatch(createQuestionAsync(question))
    }
}

class NewQuestionButton extends React.Component<INewQuestionButtonProps, INewQuestionButtonState> {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    render() {
        const { modalVisible } = this.state;

        return (
            <React.Fragment>
                <Button type="button" onClick={ this.toggleModalVisibility }>
                    Create New Question
                </Button>
                <Dialog
                    className="new-question-dialog"
                    open={ modalVisible }
                    onClose={ this.toggleModalVisibility }
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description" >
                    <NewQuestionForm 
                        onCancel={ this.toggleModalVisibility }
                        submit={ this.props.createQuestion } />
                </Dialog>
            </React.Fragment>
        );
    }

    toggleModalVisibility = () => {
        return this.setState(update(this.state, {
            modalVisible: {
                $set: !this.state.modalVisible
            }
        }))
    }
}

export default connect(null, mapDispatchToProps)(NewQuestionButton);