<?php
namespace App\Controllers;

class UserController extends Controller{

    public function index($request,$response){

        return $this->view->render($response,'mng_user.phtml');
    }

    public function Display_user($req,$res){
        $result  = $this->database->select('users','*');
        echo json_encode($result);
    }

    public function Login_User($req,$res){
        $UserName = $req->getParam('Username');
        $PassWord = $req->getParam('Password');
        if( !empty($UserName) || !empty($PassWord) ){
            $result  = $this->database->select('users','*',[
                'USERNAME'  => $UserName,
                'PASS'      => $PassWord
            ]);
            if(!empty($result)){
                echo json_encode($result);
            }else{
                $message['error'] = 'Tài khoản hoặc mật khẩu không chính xác !';
                echo json_encode($message);
            }
        }else{
            $message['error'] = 'Chưa nhận được dữ liệu!';
            echo json_encode($message);
        }
    }
    public function SignUpUser($request,$response){
        $UserName  = $request->getParam('UserName');
        $PassWord  = $request->getParam('PassWord');
        $FirstName = $request->getParam('FirstName');
        $LastName  = $request->getParam('LastName');
        $Email     = $request->getParam('Email');

        if(!empty($UserName) && !empty($PassWord) && !empty($Email)){
            $CheckUserName  = $this->database->select('users','USERNAME',['USERNAME' => $UserName]);
            $CheckEmail     = $this->database->select('users','EMAIL',['EMAIL' => $Email]);
            if(!empty($CheckUserName)){
                $message['error'] = 'Tài khoản này đã tồn tại!';
                echo json_encode($message);
            }else if(!empty($CheckEmail)){
                $message['error'] = 'Email này đã được sử dụng!';
                echo json_encode($message);
            }else{
                $this->database->insert('users',[
                    'LASTNAME'  => $LastName,
                    'FIRSTNAME' => $FirstName,
                    'EMAIL'     => $Email,
                    'USERNAME'  => $UserName,
                    'PASS'      => $PassWord
                ]);
                $message['success'] = 'Đã tạo tài khoản thành công!';
                echo json_encode($message);
            }
        }else{
            $message['error'] = 'Chưa nhận được dữ liệu gửi về!';
            echo json_encode($message);
        }
    }
    public function GetUserId($request,$response){
        $id = $request->getParam('id');
        if(!empty($id)){
            $result  = $this->database->select('users','*',['IDUSER'=>$id]);
            if($result){
                echo json_encode($result[0]);
            }else{
                $message['error'] = 'Chưa nhận được dữ liệu gửi về!';
                echo json_encode($message);
            }
        }else{
            $message['error'] = 'Chưa nhận được dữ liệu gửi về!';
            echo json_encode($message);
        }
    }
}