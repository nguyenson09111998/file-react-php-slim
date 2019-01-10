import * as types from './../constants/config';

export const ListExam = (exams) => {
    return {
        type: types.TODO_LIST,
        exams
    }
}

export const ListExamRequest = () => {
    return (dispatch) => {
        return fetch('/display_exam', {
            method: "POST"
        }).then(res => res.json())
            .then(data => {
                dispatch(ListExam(data))
            })
            .then(err => {
                console.error(err)
            })
    }
}

export const ListSubject = (subjects) => {
    return {
        type: types.LIST_SUB,
        subjects
    }
}

export const ListSubjectRequest = () => {
    return (dispatch) => {
        return fetch('/display_sub', {
            method: "POST"
        }).then(res => res.json())
            .then(data => {
                dispatch(ListSubject(data))
            })
            .then(err => {
                console.error(err)
            })
    }
}

export const DetailExam = (DetailExam) => {
    return {
        type: types.DETAIL_EXAM,
        DetailExam
    }
}

export const DetailExamRequest = (id) => {
    return (dispatch) => {
        return fetch(`/detail-exam/${id}`, {
            method: "GET"
        }).then(res => res.json())
            .then(data => {
                dispatch(DetailExam(data))
            })
            .then(err => {
                console.error(err)
            })
    }
}

export const UserExamRequest = (data) =>{
    return (dispatch) => {
        return fetch('/GetUserExam',{
            method:"POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then( data =>{
            console.log(data)
        })
        .catch(err=>{
            console.error(err)
        })
    }
}

export const GetExam = (ListQuestion) => {
    return {
        type: types.GET_EXAM,
        ListQuestion
    }
}

export const GetExamRequest = (id) => {
    return (dispatch) => {
        return fetch(`/exam-question/${id}`, {
            method: "GET"
        }).then(res => res.json())
            .then(data => {
                dispatch(GetExam(data))
            })
            .then(err => {
                console.error(err)
            })
    }
}

export const LoginUser = (Users) => {
    return {
        type: types.LOGIN_USER,
        Users
    }
}

export const LoginUserRequest = (users) => {
    return (dispatch) => {
        return fetch(`/Login_User`, {
            method: "POST",
            body: JSON.stringify(users),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if (data.length === undefined) {
                    dispatch(LoginUser([data]))
                } else {
                    dispatch(LoginUser(data))
                }

            })
            .then(err => {
                console.error(err)
            })
    }
}

export const SignUser = (User) =>{
    return {
        type:types.SIGNUP_USER,
        User
    }
}


export const SignUserRequest = (user) => {
    return (dispatch) => {
        return fetch(`/SignUpUser`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                dispatch(SignUser([data]))
            })
            .then(err => {
                console.error(err)
            })
    }
}

// export const GetQuestionUserResponse = (QuestionResponse) =>{
//     return {
//         type:types.QUESTION_RESPONSE,
//         QuestionResponse
//     }
// }

export const GetQuestionUser = (QuestionUser)=>{
    return (dispatch)=>{
        return fetch(`/GetQuestionUser`, {
            method: "POST",
            body: JSON.stringify(QuestionUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                // dispatch(GetQuestionUserResponse([data]))
            })
            .then(err => {
                console.error(err)
            })
    }
}