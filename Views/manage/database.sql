
CREATE TABLE users(
    IDUSER int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    LASTNAME VARCHAR(100),
    FIRSTNAME VARCHAR(1000),
    USERNAME VARCHAR(1000),
    EMAIL VARCHAR(100),
    PASS VARCHAR(100)
);

CREATE TABLE user_exam(
    ID_UX INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    IDUSER VARCHAR(10),
    IDEXAM VARCHAR(10),
    TIMESTART TIME,
    TIMEEND TIME,
    DATEEXAM DATE,
    CONFIRM CHAR(10),
    SCORE INT
);

CREATE TABLE detail_user_exam(
    ID_DUE INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ID_UX INT,
    ID_QUE INT,
    ID_ANS INT
);
CREATE TABLE subjects(
    SUBID VARCHAR(10) PRIMARY KEY,
    SUBTEXT VARCHAR(1000) 
);

CREATE TABLE exam(
    IDEXAM VARCHAR(10) PRIMARY KEY,
    EXAMTEXT VARCHAR(1000),
    SUBID VARCHAR(10),
    EXTIME INT,
    EXNUM INT
);

CREATE TABLE detail_exam(
    ID_DE INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    IDEXAM VARCHAR(10) NOT NULL,
    ID_QUE INT NOT NULL
);

CREATE TABLE question(
    ID_QUE INT PRIMARY KEY,
    QUE_TEXT VARCHAR(1000) 
);

CREATE TABLE answer(
    ID_ANS int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ID_QUE INT,
    ANS_TEXT VARCHAR(1000),
    CORRECT VARCHAR(10)
);


ALTER TABLE user_exam AUTO_INCREMENT = 1000;
ALTER TABLE detail_exam AUTO_INCREMENT = 2000;
ALTER TABLE users AUTO_INCREMENT = 500;
ALTER TABLE user_exam AUTO_INCREMENT = 700;
ALTER TABLE answer AUTO_INCREMENT = 1500;
ALTER TABLE detail_user_exam AUTO_INCREMENT = 3000;

ALTER TABLE detail_exam ADD CONSTRAINT FK_EQ_O FOREIGN KEY(ID_QUE) REFERENCES question(ID_QUE);
ALTER TABLE detail_exam ADD CONSTRAINT FK_EQ_T FOREIGN KEY(IDEXAM) REFERENCES exam(IDEXAM);
ALTER TABLE exam ADD CONSTRAINT FK_ES FOREIGN KEY(SUBID) REFERENCES SUBJECTS(SUBID);
ALTER TABLE detail_user_exam ADD CONSTRAINT FK_DUE_Q FOREIGN KEY(ID_QUE) REFERENCES question(ID_QUE);
ALTER TABLE detail_user_exam ADD CONSTRAINT FK_DUE_UX FOREIGN KEY(ID_UX) REFERENCES user_exam(ID_UX);
ALTER TABLE answer ADD CONSTRAINT FK_QUE FOREIGN KEY(ID_QUE) REFERENCES question(ID_QUE);