import React from 'react';
import Exam from './../components/Exams/Exams'
import DetailExam from './../components/DetailExam/DetailExam';
import ListQuestion from './../components/Questions/ListQuestion';
import Login from './../components/Login/Login';

const index = () => <h2>Home</h2>
const manage = () => <h2>manage</h2>
const notfound = () => <h2>not found</h2>

const routes = [
    {
        path:'/',
        exact:true,
        main: index
    },
    {
        path:'/exam/all',
        exact:false,
        main: () => <Exam />
    },
    {
        path:'/exam/:id',
        exact:false,
        main: ({match}) => <Exam match={match} />
    },
    {
        path:'/detail-exam/:id',
        exact:false,
        main: ({match}) => <DetailExam match={match} />
    },
    {
        path:'/online-test/:id',
        exact:false,
        main: ({match}) => <ListQuestion match={match} />
    },
    {
        path:'/manage',
        exact:false,
        main: manage
    },
    {
        path:'/login',
        exact:false,
        main: () => <Login />
    },
    {
        path:'',
        exact:false,
        main: notfound
    }
]

export default routes;