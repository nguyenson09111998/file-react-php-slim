import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { DetailExamRequest,UserExamRequest } from './../../actions/index';

class DetailExam extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            nameExam:'',
            subject:'',
            number:0,
            time:0,
            payload:false
        }
    }
    componentDidMount(){
        var { match } = this.props;
        if(match){
            var id = match.params.id
            this.props.DetailView(id);
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps){
            var { ListExam } = nextProps;
            this.setState({
                id: ListExam[0].IDEXAM,
                nameExam: ListExam[0].EXAMTEXT ,
                subject: ListExam[0].SUBTEXT,
                number: ListExam[0].EXNUM,
                time: ListExam[0].EXTIME
            })
        }
    }
    GetStart = () =>{
        var data = JSON.parse(sessionStorage.getItem("user"));
        const idExam = this.state.id;
        var currentDate = new Date();
        var timeNow = currentDate.getHours()+":"+currentDate.getMinutes();
        var dateNow = currentDate.getFullYear()+"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate();
        var dataExam = {
            idExam:idExam,
            idUser: data.IDUSER,
            timeNow: timeNow,
            dateNow: dateNow,
            score:0
        }
        this.props.GetUserExam(dataExam)
        this.setState({
            payload:true
        })
    }

    render() {
        const ListExams = this.state;
        if(this.state.payload === true){
            return <Redirect to={`/online-test/${ListExams.id}`} />
        }
        return (
            <div className="next-start online-test">
                <div className="container">
                    <div className="box-wrapper">
                        <div className="panel panel-primary panel-quiz-info">
                            <div className="panel-heading text-center">
                                <h3>{ListExams.nameExam}</h3>
                            </div>
                            <div className="panel-body text-center detail-exam">
                                <h3>Môn học: {ListExams.subject}</h3>
                                <p><em>Số câu: {ListExams.number} </em><br/><em>Thời gian: {ListExams.time} minutes</em></p>
                                <button onClick={ this.GetStart } className="btn btn-primary get-start" >Bắt đầu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = ( state )=>{
    return{
        ListExam : state.detailExam
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        DetailView: (id) =>{
            dispatch(DetailExamRequest(id))
        },
        GetUserExam: (data) =>{
            dispatch( UserExamRequest(data))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailExam);