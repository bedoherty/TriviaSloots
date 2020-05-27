import * as React from "react";
import { Dialog, Button } from "@material-ui/core";
import update from "immutability-helper";
import { IQuestion } from "src/Data/Interfaces/Questions";
import { updateQuestionAsync } from "src/Data/Actions/Questions";
import { connect } from "react-redux";
import NewQuestionForm from "./NewQuestionForm";

interface IEditQuestionWrapperButtonProps {
    updateQuestion: (question: IQuestion) => void;
    question: IQuestion;
}

interface IEditQuestionWrapperState {
    modalVisible: boolean;
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateQuestion: (question: IQuestion) => dispatch(updateQuestionAsync(question))
    }
}

class EditQuestionWrapper extends React.Component<IEditQuestionWrapperButtonProps, IEditQuestionWrapperState> {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    render() {
        const { modalVisible } = this.state;
        const { question } = this.props;

        console.log(this.props.children);
        return (
            <React.Fragment>
                { React.cloneElement(this.props.children as any, { onClick: this.toggleModalVisibility }) }
                <Dialog
                    className="new-question-dialog"
                    open={ modalVisible }
                    onClose={ this.toggleModalVisibility }
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description" >
                    <NewQuestionForm 
                        question={ question }
                        onCancel={ this.toggleModalVisibility }
                        submit={ this.props.updateQuestion } />
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

export default connect(null, mapDispatchToProps)(EditQuestionWrapper);