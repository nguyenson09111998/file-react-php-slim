import React, { Component } from 'react';
import {Link } from 'react-router-dom';
class Result extends Component {

    constructor(props){
        super(props);
        this.state = {
            idux:'',
            idexam:'',
            Exam: '',
            Subject: '',
            TimeStart: 0,
            TimeEnd:0,
            Score: 0,
            NumQuestion:0
        }
    }
    componentDidMount(){
        let { location } = this.props.location;
        let params = new URLSearchParams(location.search);
        let id = params.get('id');
        this.GetResultRequest(id);
    }
    

    GetResultRequest = (id) =>{
        return fetch(`/GetResultRequest/${id}`, {
            method: "GET"
        }).then(res => res.json())
            .then(data => {
                this.setState({
                    idexam:data[0].IDEXAM,
                    idux:data[0].ID_UX,
                    Exam: data[0].EXAMTEXT,
                    TimeStart: data[0].TIMESTART,
                    TimeEnd: data[0].TIMEEND,
                    Score: data[0].SCORE,
                    NumQuestion: data[0].EXNUM
                })
            })
            .then(err => {
                console.error(err)
            })
    }

    render() {
        const {Exam,TimeStart,TimeEnd,Score,NumQuestion,idexam,idux} = this.state;
        return (
            <div className="result-exam online-test">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="review-result">
                                <div className="panel-result">
                                    <div className="panel-heading text-center">
                                        <h3>Kết quả</h3>
                                    </div>
                                </div>
                                <div className="content-result">
                                    <table className="table-result-exam">
                                        <tbody>
                                            <tr>
                                                <td>Đề thi:</td>
                                                <td>{Exam}</td>
                                            </tr>
                                            <tr>
                                                <td>Thời gian bắt đầu:</td>
                                                <td>{TimeStart}</td>
                                            </tr>
                                            <tr>
                                                <td>Thời gian kết thúc: </td>
                                                <td>{TimeEnd}</td>
                                            </tr>
                                            <tr>
                                                <td>Số đáp án đúng:</td>
                                                <td> {Score}/{NumQuestion}</td>
                                            </tr>
                                            <tr>
                                                <td>phần trăm đạt:</td>
                                                <td> {((Score/NumQuestion)*100).toFixed(2)}%</td>
                                            </tr>
                                            <tr>
                                                <td>Review result: </td>
                                                <td><Link to={{pathname:"review-test",search:`?id=${idexam}&idux=${idux}`}}>review again</Link></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Result