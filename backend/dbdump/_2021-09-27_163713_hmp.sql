/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
CREATE DATABASE
/*!32312 IF NOT EXISTS*/
hmp
/*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE hmp;
DROP TABLE IF EXISTS admin;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS appointment;
CREATE TABLE `appointment` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `case_id` int DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `doctor_id` int NOT NULL,
  `meeting_link` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `case_id` (`case_id`),
  KEY `fk_doctor_id` (`doctor_id`),
  CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`case_id`) REFERENCES `cases` (`case_id`),
  CONSTRAINT `fk_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 27 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS cases;
CREATE TABLE `cases` (
  `case_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  PRIMARY KEY (`case_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `cases_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 29 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS doctor;
CREATE TABLE `doctor` (
  `doctor_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS medicine;
CREATE TABLE `medicine` (
  `medicine_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`medicine_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS patient;
CREATE TABLE `patient` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`patient_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 48 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS prescription;
CREATE TABLE `prescription` (
  `appointment_id` int DEFAULT NULL,
  `medicine_id` int DEFAULT NULL,
  `unit` int DEFAULT NULL,
  KEY `appointment_id` (`appointment_id`),
  KEY `medicine_id` (`medicine_id`),
  CONSTRAINT `prescription_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`appointment_id`),
  CONSTRAINT `prescription_ibfk_2` FOREIGN KEY (`medicine_id`) REFERENCES `medicine` (`medicine_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS qualification;
CREATE TABLE `qualification` (
  `doctor_id` int NOT NULL,
  `qualification` varchar(50) DEFAULT NULL,
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `qualification_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS schedule;
CREATE TABLE `schedule` (
  `doctor_id` int NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
INSERT INTO
  admin(admin_id, email, password)
VALUES(
    6,
    'admin@gmail.com',
    '$2b$10$0GDCzoAqRFJXN7F3RGKL8.jDYNN62bvy.Kqv1h2CbAZ4Y1zxc5ilK'
  ),(
    7,
    'admin1@gmail.com',
    '$2b$10$5V9xKfLj8c2JNhhjxt5LmOi4tyzV1WTux8ti/nIVztOGZg3hEEfXi'
  );
INSERT INTO
  appointment(
    appointment_id,
    case_id,
    start_time,
    end_time,
    doctor_id,
    meeting_link
  )
VALUES(
    19,
    8,
    '2021-09-23 01:00:00',
    '2021-09-23 01:30:00',
    1,
    NULL
  ),(
    20,
    8,
    '2021-09-23 01:30:00',
    '2021-09-23 02:00:00',
    1,
    'https://us05web.zoom.us/j/84015435062?pwd=L3ZFSU5qdzcrVkloVE1yV0VXckljdz09'
  ),(
    22,
    7,
    '2021-09-24 17:00:00',
    '2021-09-24 19:00:00',
    2,
    'https://zoom.us/j/95055404436?pwd=YllEZU01SHpqOTRvOXdNNDRqMDQ5QT09'
  ),(23, 7, NULL, NULL, 2, NULL),(
    24,
    25,
    '2021-09-23 17:00:00',
    '2021-09-23 18:00:00',
    1,
    'https://zoom.us/j/96622884844?pwd=dHdEWUo0NDhBL2lOM0hnL0ZQUFR1UT09'
  ),(25, 27, NULL, NULL, 1, NULL),(26, 28, NULL, NULL, 2, NULL);
INSERT INTO
  cases(case_id, patient_id)
VALUES(8, 35),(9, 35),(19, 35),(20, 35),(21, 35),(22, 35),(23, 35),(24, 35),(28, 35),(7, 40),(25, 40),(26, 40),(27, 47);
INSERT INTO
  doctor(
    doctor_id,
    first_name,
    last_name,
    dob,
    gender,
    address,
    email,
    phone,
    password
  )
VALUES(
    1,
    'tmp',
    'tmp',
    '1994-08-15',
    'male',
    'address',
    'tmp123@gmail.com',
    '8888888',
    '$2b$10$V89vvlL.Sn3jQGc1VW9BheuKfJknyk7M/ZG.H7ghJaJJd2l07rrl6'
  ),(
    2,
    'xyz',
    'Darji',
    '1994-08-15',
    'male',
    'address',
    'abcdefg@gmail.com',
    '8888888',
    '$2b$10$d.b4BuJ4qVm/o67.jO.yxO/cCn5kCSSwlypqjDhZnqpRnYt5EPSay'
  ),(
    3,
    'Doctor',
    'Saab',
    '1992-11-23',
    'Male',
    'safde',
    'doctor@gmail.com',
    '974359877',
    '$2b$10$PdiG93NRUxreSElO/hSUwOatQXswjnjNsG4uncxcnDEF58z06BX2C'
  );
INSERT INTO
  patient(
    patient_id,
    first_name,
    last_name,
    dob,
    gender,
    address,
    email,
    phone,
    password
  )
VALUES(
    33,
    'first_name',
    'last_name',
    '2021-08-28',
    'male',
    'address',
    'abcde@gmail.com',
    '888888',
    '$2b$10$nuJauq9eb5PnQgmEWmzHOud9unn/UQkUV.WqX7LQE2tt3r7FnM9GS'
  ),(
    35,
    'tmp',
    'tmp',
    '1994-08-15',
    'male',
    'address',
    'tmp123@gmail.com',
    '8888888',
    '$2b$10$uintCDK9iVRmTTv84uGyouWd6WbMyLe9af3QBlwyJwyUjlpMXedTC'
  ),(
    39,
    'tmp1',
    'tmp2',
    '2021-09-03',
    'Male',
    '',
    'tmp11@gmail.com',
    '8888888888',
    '$2b$10$.TZG9n7ZB.a1e71tMccgW..W3GagHDg4ePfoYqlWYwNespsUv1vD2'
  ),(
    40,
    'Sheldon',
    'Cooper',
    '2000-09-06',
    'Male',
    'afger asfer agfar afehgh fsdghreg',
    'sheldoncooper@gmail.com',
    '8745932148',
    '$2b$10$5alAFLexp0yfVRpdzfdnO..1s.0Cswe6dZcGCD1aMQuEtxD.Un0se'
  ),(
    41,
    'DDD',
    'DDD',
    '2021-09-07',
    'Male',
    'NA',
    'ddd@gmail.com',
    '8888888888',
    '$2b$10$6Em2dBb3P./BsF4X0tC3J.D/rNhwWxP5Jj6x8yyAAX8GZeZ4hps7y'
  ),(
    42,
    'dum',
    'dum',
    '2021-09-07',
    'Male',
    '',
    'dum@gmail.com',
    '8888888888',
    '$2b$10$MR18vCHh18I70SHXyeVvxuPF9nyDdYwWTG8wwBXUVPwk6zH5s/GzO'
  ),(
    43,
    'klasferqkdaljg',
    'oiajgadl',
    '2021-09-07',
    'PreferNotT',
    'safegasds',
    'oapujfea@afha.com',
    '7894561235',
    '$2b$10$bdtPHFfBg6Qd/wPcm9blUeX7LfAtwJXJJJlSJpzCvF0xXBDPQFvNe'
  ),(
    44,
    'tmp',
    'tmp',
    '2021-09-16',
    'Male',
    '',
    'tmp1234@gmail.com',
    '8989898989',
    '$2b$10$b1rBsgt3ZkmNy23WpM.eW.vCCuh2xgvEbu7id9tCrbjleHLfIc5om'
  ),(
    45,
    'tmp',
    'tmp',
    '2021-09-16',
    'Male',
    '',
    'tmp123456@gmail.com',
    '8989898989',
    '$2b$10$PtqwIJplF7jcffAq7s1rruEP4udRgjObt4rIQBgTsDHeUtNeFqpr6'
  ),(
    46,
    'tmp',
    'tmp',
    '2021-09-16',
    'Male',
    '',
    'tmp1234567@gmail.com',
    '8989898989',
    '$2b$10$t7YjwQhuTTGzDDsMqu130OEixJMorLnw4wTgAN1J4Spzp9tb/H6Si'
  ),(
    47,
    'Deepesh',
    'Rathi',
    '2001-12-23',
    'Male',
    'eawfrasd',
    'deepeshrathi9@gmail.com',
    '7066715908',
    '$2b$10$bD7ONYZgCciY6N1NBoBVQ.6.Db6.55zmYkxUg68SJk6ehBEr9oZje'
  );
INSERT INTO
  schedule(doctor_id, start_time, end_time)
VALUES(1, '2021-09-23 01:00:00', '2021-09-23 02:00:00'),(1, '2021-09-23 17:00:00', '2021-09-23 18:00:00'),(2, '2021-09-24 17:00:00', '2021-09-24 19:00:00'),(1, '2021-09-23 20:00:00', '2021-09-23 22:00:00'),(2, '2021-09-23 19:00:00', '2021-09-23 20:00:00');