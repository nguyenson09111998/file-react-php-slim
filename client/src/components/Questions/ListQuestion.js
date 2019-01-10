import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetExamRequest, GetQuestionUser } from './../../actions/index';
import { Redirect, Prompt } from 'react-router-dom';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 2,
            isCheck: false
        };
    }
    componentDidMount() {
        const { time } = this.props;
        var seconds = time * 60;
        this.setState({
            count: seconds
        });
        this.doIntervalChange();
    }
    doIntervalChange = () => {
        if (this.state.count > 0) {
            this.myInterval = setInterval(
                () =>
                    this.setState({
                        count: this.state.count - 1
                    }),
                1000
            );
        }
    };
    minutes = () => {
        return Math.round((this.state.count - 30) / 60);
    };
    seconds = () => {
        return ("0" + (this.state.count % 60)).slice(-2);
    };
    SendResult = () => {
        this.props.IsCheck();
    };
    render() {
        const { count } = this.state;
        if (count === 0) {
            clearInterval(this.myInterval);
            this.SendResult();
        }
        return (
            <div className="get-time">
                <p>
                    Thời gian: <span />
                    {this.minutes() + ":" + this.seconds()}
                </p>
            </div>
        );
    }
}
class Answer extends Component {
    render() {
        const { answer } = this.props;
        return (
            <tr>
                <td><input type="radio" value={answer.ID_ANS} name={answer.ID_QUE} /></td>
                <td><p>{answer.ANS_TEXT}</p></td>
            </tr>
        )
    }
}
class Question extends Component {
    showAnswer = (ListAnswer) => {
        var result = null;
        if (ListAnswer.length > 0) {
            result = ListAnswer.map((answer, index) => {
                return (
                    <Answer
                        key={index}
                        answer={answer}
                    />
                )
            })
        }
        return result;
    }
    render() {
        const { question, index } = this.props;
        return (
            <div className="number-q">
                <div className="box-question">
                    <div className="content-q">
                        <div className="name-q">
                            <div className="info-q"><h3>Câu {index + 1}</h3></div>
                            <p>{question.QUE_TEXT}</p>
                        </div>
                        <div className="answer-q">
                            <table>
                                <tbody>{this.showAnswer(question.Answer)}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class ItemShortQuestion extends Component{
    render(){
        const {index,question} = this.props;
        return(
            <div data-index={question.ID_QUE} className="item-question-shortcut answered">
                {index + 1}
            </div>
        )
    }
}

class ListQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListQuestion: [],
            idExam: '',
            isCheck: true,
            idResult: '',
            time: 0,
        }
    }
    showQuetion(ListQuestion) {
        var result = null;
        if (ListQuestion.length > 0) {
            result = ListQuestion.map((question, index) => {
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
        var { match } = this.props
        if (match) {
            var id = match.params.id
            this.props.ListItem(id);
            this.GetExamMinuteId(id)
            this.setState({
                idExam: id
            })
        }
    }
    GetExamMinuteId = (id) => {
        var data = { id: id };
        return fetch(`/GetExamMinuteId`, {
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
                        time: data
                    })
                }
            })
            .then(err => {
                console.error(err)
            })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            var { ListQuestion } = nextProps;
            this.setState({
                ListQuestion: ListQuestion
            })
        }
    }
    GetResult = () => {
        if (window.confirm('Bạn đã chắn chắn muốn nộp bài không?')) {
            this.GetAnswerUserId();
        }
    }
    GetAnswerUserId = () => {
        let inputs = document.getElementsByTagName('input');
        let result = [];
        if (inputs.length > 0) {
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].type === 'radio' && inputs[i].checked === true) {
                    result.push({
                        idAns: inputs[i].value,
                        idQue: inputs[i].name
                    })
                }
            }
        }
        var currentDate = new Date();
        var timeNow = currentDate.getHours() + ":" + currentDate.getMinutes();
        var dataUser = JSON.parse(sessionStorage.getItem("user"));
        var Data = {
            idExam: this.state.idExam,
            idUser: dataUser.IDUSER,
            timeNow: timeNow,
            questions: result
        }
        this.props.GetQuestionUser(Data);
        this.GetUserExamId(Data);
        console.log(Data)
    }
    GetUserExamId = (data) => {
        return fetch(`/GetUserExamId`, {
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
                        idResult: data,
                        isCheck: false
                    })
                    console.log(data)
                }
            })
            .then(err => {
                console.error(err)
            })
    }
    IsCheck = () => {
        this.GetAnswerUserId();
    }
    ListQuestionShortCut = (questions) =>{
        var result = null;
        result = questions.map((question,index)=>{
            return(
                <ItemShortQuestion
                    key={index}
                    question={question}
                    index={index}
                />
            )
        })
        return result;
    }
    render() {
        var { ListQuestion, isCheck, idResult, time } = this.state;
        console.log(time);
        var timer = time;
        if (isCheck === false) {
            return <Redirect to={{ pathname: `/result-test`, search: `?id=${idResult}` }} />
        }
        return (
            <div className="question-test online-test">
                <div className="container">
                    <div className="exam-grid">
                        <div className="left-menu-exam">
                            <div className="content-menu-exam">
                                <div className="exam-time">
                                    {time > 0 ? <Timer IsCheck={this.IsCheck} time={timer} /> : ''}
                                </div>
                                <div className="list-question-shortcut over-question">
                                    {this.ListQuestionShortCut(ListQuestion)}
                                </div>
                                <div className="wrap-finish text-center">
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={this.GetResult}
                                    >Finish</button>
                                </div>
                            </div>
                        </div>
                        <div className="box-wrapper">
                            <div className="the-questions">
                                {this.showQuetion(ListQuestion)}
                            </div>
                        </div>
                    </div>
                </div>
                <Prompt
                    when={isCheck}
                    message={() => ('Bạn đã chắc chắn muốn thoát không?')}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ListQuestion: state.ListQuestion,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        ListItem: (id) => {
            dispatch(GetExamRequest(id))
        },
        GetQuestionUser: (data) => {
            dispatch(GetQuestionUser(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListQuestion);