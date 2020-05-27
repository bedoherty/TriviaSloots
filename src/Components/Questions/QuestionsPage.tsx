import * as React from "react";
import QuestionsList from "./QuestionsList";

import "Styles/Questions.less";
import QuestionSearch from "./QuestionSearch";
import NewQuestionButton from "./NewQuestionButton";

export default class QuestionsPage extends React.Component {
    render() {
        return (
            <div className="questions-page">
                <QuestionSearch />
                <NewQuestionButton />
                <QuestionsList />
            </div>
        )
    }
}