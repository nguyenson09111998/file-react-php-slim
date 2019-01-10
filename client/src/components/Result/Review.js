import React, { Component } from 'react';
import checkTrue from '../../img/check-symbol.svg';

class Answer extends Component {

    onChange = (e) => {

    }
    render() {
        const { answer, UserAnswer } = this.props;
        return (
            <tr>
                <td>
                    <div className="image-check">
                        <img src={answer.CORRECT === "true" ? checkTrue : ""} alt="" />
                    </div>
                </td>
                <td>
                    <input
                        type="radio"
                        name={answer.ID_QUE}
                        onChange={this.onChange}
                        value={answer.ID_ANS}
                        checked={answer.ID_ANS === UserAnswer ? true : false}
                    />
                </td>
                <td>
                    <p className={answer.CORRECT === "true" ? "true-green" : ""}>{answer.ANS_TEXT}</p>
                </td>
            </tr>
        )
    }
}
class ItemQuestion extends Component {
    ListAnswer = (question) => {
        var ListAnswer = null;
        var Answers = question.Answer;
        var { UserAnswer } = question;
        if (Answers.length > 0) {
            ListAnswer = Answers.map((answer, index) => {
                return (
                    <Answer
                        key={index}
                        answer={answer}
                        UserAnswer={UserAnswer}
                    />
                )
            })
        }
        return ListAnswer
    }
    render() {
        const { question } = this.props;
        return (
            <div>
                <div className="name-q">
                    <p>{question.QUE_TEXT}</p>
                </div>
                <div>
                    <p>Câu trả lời của bạn là:</p>
                </div>
                <div className="answer-q">
                    <table>
                        <tbody>{this.ListAnswer(question)}</tbody>
                    </table>
                </div>
            </div>
        )
    }
}
class Question extends Component {
    render() {
        const { question, index } = this.props;
        return (
            <div className="number-q">
                <div className="box-question">
                    <div className="info-q"><h3>{index + 1}</h3></div>
                    <div className="content-q">
                        <ItemQuestion question={question} />
                    </div>
                </div>
            </div>
        )
    }
}
class ReviewQuestions extends Component {
    state = {
        ListQuestions: {}
    }
    ShowQuestions = (ListQuestions) => {
        var result = null;
        if (ListQuestions.length > 0) {
            result = ListQuestions.map((question, index) => {
                return (
                    <Question
                        key={index}
                        question={question}
                        index={index}
                    />
                )
            })
        }
        return result;
    }
    componentDidMount() {
        const { location } = this.props.location;
        let params = new URLSearchParams(location.search);
        let id = params.get('id');
        let idux = params.get('idux');
        let data = {
            id: id,
            idux: idux
        }
        this.getQuestionData(data);
    }
    getQuestionData = (data) => {
        return fetch(`/get-exam-question`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data);
                } else {
                    this.setState({
                        ListQuestions: data
                    })
                }
            })
            .then(err => {
                console.error(err)
            })
    }
    render() {
        const { ListQuestions } = this.state;
        return (
            <div className="question-test online-test">
                <div className="container">
                    <div className="box-wrapper">
                        <div className="the-questions Review-exam">
                            {this.ShowQuestions(ListQuestions)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ReviewQuestions;