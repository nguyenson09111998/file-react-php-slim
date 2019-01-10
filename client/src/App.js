import React, { Component } from 'react';
import Menu from './components/Menu/Menu';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import './App.css';
import Exam from './components/Exams/Exams'
import DetailExam from './components/DetailExam/DetailExam';
import ListQuestion from './components/Questions/ListQuestion';
import Login from './components/Login/Login';
import PrivateRoute from './components/Login/PrivateRoute';
import fakeAuth from './components/Login/fakeAuth';
import './home.css';
import SignIn from './components/Login/SignIn';
import Result from './components/Result/Result';
import ReviewQuestions from './components/Result/Review';
import Account from './components/Profile';

class MainComponent extends Component {
    RenderMenu = () => {
        return (
            <Switch>
                <PrivateRoute path="/account/:name" component={(match) => <Account match={match} />} />
                <PrivateRoute path="/exam/all" component={() => <Exam />} />
                <PrivateRoute path="/exam/:id" component={({ match }) => <Exam match={match} />} />
                <PrivateRoute path="/detail-exam/:id" component={({ match }) => <DetailExam match={match} />} />
                <PrivateRoute path="/online-test/:id" component={({ match }) => <ListQuestion match={match} />} />
                <PrivateRoute path="/result-test" component={(location) => <Result location={location} />} />
                <PrivateRoute path="/review-test" component={(location) => <ReviewQuestions location={location} />} />
                <Redirect to="/exam/all"/>
            </Switch>
        )
    }
    render() {
        return (
            <div className="test-online">
                <Menu />
                <div className="container-main">{this.RenderMenu()}</div>
            </div>
        )
    }
}
class App extends Component {
    componentDidMount() {
        var data = JSON.parse(sessionStorage.getItem('user'));
        if (data != null) {
            fakeAuth.authenticate(() => {
                this.setState({
                    RedirectToRender: true
                })
            })
        }
    }
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Switch>
                        <Route path="/login" exact render={props => <Login {...props} />} />
                        <Route path="/sign-in" component={() => <SignIn />} />
                        <Route path="/" component={MainComponent} />
                    </Switch>
                </React.Fragment>
            </Router>
        );
    }
}
export default App;

