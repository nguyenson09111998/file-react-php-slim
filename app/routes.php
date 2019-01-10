<?php
// $app->get('/mng_subject','App\Controllers\SubjectController:index');
// $app->get('/mng_user','App\Controllers\UserController:index');
// $app->get('/mng_question','App\Controllers\QuestionController:index');
// $app->get('/mng_exam','App\Controllers\ExamController:index');

$app->post('/display_sub','App\Controllers\SubjectController:display_sub');
$app->post('/create_sub','App\Controllers\SubjectController:create_subject');
$app->post('/del_sub','App\Controllers\SubjectController:del_subject');

$app->post('/add_que','App\Controllers\QuestionController:Hanlding');
$app->post('/display_que','App\Controllers\QuestionController:Display_all');
$app->post('/get_answer','App\Controllers\QuestionController:get_answer');

$app->post('/display_exam','App\Controllers\ExamController:display_exam');
$app->post('/add_exam','App\Controllers\ExamController:add_exam');
$app->get('/detail-exam/{id}','App\Controllers\ExamController:DetailExam');
$app->get('/exam-question/{id}','App\Controllers\ExamController:GetExam');
$app->post('/get-exam-question','App\Controllers\ExamController:RequestExam');
$app->post('/GetAnswerQuestionId','App\Controllers\ExamController:GetAnswerQuestionId');
$app->post('/RequestAnswerQuestionId','App\Controllers\ExamController:RequestAnswerQuestionId');
$app->post('/GetUserExam','App\Controllers\ExamController:GetUserExam');
$app->post('/GetQuestionUser','App\Controllers\ExamController:GetQuestionUser');
$app->get('/GetResultRequest/{id}','App\Controllers\ExamController:GetResultRequest');
$app->post('/GetUserExamId','App\Controllers\ExamController:GetUserExamId');
$app->post('/GetHistoryExamUser','App\Controllers\ExamController:GetHistoryExamUser');
$app->post('/GetExamMinuteId','App\Controllers\ExamController:GetExamMinuteId');

$app->post('/display_user','App\Controllers\UserController:display_user');
$app->post('/Login_User','App\Controllers\UserController:Login_User');
$app->post('/SignUpUser','App\Controllers\UserController:SignUpUser');
$app->post('/GetUserId','App\Controllers\UserController:GetUserId');
