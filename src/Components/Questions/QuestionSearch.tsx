import * as React from "react";
import { Input } from '@material-ui/core';
import { connect } from "react-redux";
import { setQuestionSearch, resetQuestions, fetchQuestionsPageAsync } from "src/Data/Actions/Questions";
import { getQuestionSearch } from "src/Data/Selectors/Questions";

const mapStateToProps = (state) => {
    return {
        search: getQuestionSearch(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSearch: (search: string) => dispatch(setQuestionSearch(search)),
        resetSearch: () => dispatch(resetQuestions()),
        fetchNextPage: () => dispatch(fetchQuestionsPageAsync())
    }
}

interface IQuestionSearchProps {
    resetSearch: () => void;
    updateSearch: (search: string) => void;
    search: string;
    fetchNextPage: () => void;
}

class  QuestionSearch extends React.Component<IQuestionSearchProps> {
    render() {
        const { search } = this.props;
        return (
            <Input
                value={ search }
                onChange={ this.handleChange } />
        )
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { fetchNextPage, updateSearch, resetSearch } = this.props;
        resetSearch();
        updateSearch(event.target.value);
        fetchNextPage();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionSearch);