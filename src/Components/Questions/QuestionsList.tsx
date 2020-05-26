import * as React from "react";
import { fetchQuestionsPageAsync } from "src/Data/Actions/Questions";
import { connect } from "react-redux";
import { getAllQuestions } from "src/Data/Selectors/Questions";
import { IQuestion } from "src/Data/Interfaces/Questions";
import { Waypoint } from 'react-waypoint';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";

interface IQuestionsListProps {
    fetchNextPage: () => void;
    questions: IQuestion[];
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNextPage: () => dispatch(fetchQuestionsPageAsync())
    }
}

const mapStateToProps = (state) => {
    return {
        questions: getAllQuestions(state)
    }
}

class QuestionsList extends React.Component<IQuestionsListProps> {
    render() {
        return (
            <React.Fragment>
                <TableContainer className="questions-list" component={ Paper }>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Question</TableCell>
                                <TableCell>Answer(s)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { this.renderTableRows() }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Waypoint 
                    onEnter={ this.props.fetchNextPage } />
            </React.Fragment>
        );
    }

    renderTableRows = () => {
        const { questions } = this.props;
        if (!questions || questions?.length === 0) {
            return null;
        }

        return questions.map(this.renderTableRow);
    }

    renderTableRow = (question: IQuestion) => {
        const { answers, prompt, _id } = question;
        return (
            <TableRow key={ _id }>
                <TableCell>{ prompt }</TableCell>
                <TableCell>{ answers.join(", ") }</TableCell>
            </TableRow>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);