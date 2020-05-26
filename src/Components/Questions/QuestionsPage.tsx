import * as React from "react";
import QuestionsList from "./QuestionsList";

import "Styles/Questions.less";

export default class QuestionsPage extends React.Component {
    render() {
        return (
            <div className="questions-page">
                <QuestionsList />
            </div>
        )
    }
}