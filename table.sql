CREATE TABLE IF NOT EXISTS plans (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `name` CHAR(255) NOT NULL,
    `description` TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS courses (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `name` CHAR(255) NOT NULL,
    `description` TEXT,
    `duration` CHAR (255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS students (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `surname` CHAR(255) NOT NULL,
    `first_name` CHAR(255) NOT NULL,
    `other_name` CHAR(255),
    dob DATE NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL,
    email CHAR(255) UNIQUE,
    phone CHAR(20) UNIQUE,
    `address` TEXT NOT NULL,
    sponsor CHAR(255),
    sponsor_email CHAR(255),
    sponsor_phone CHAR(20),
    sponsor_address TEXT,
    date_joined DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS instructors (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `surname` CHAR(255) NOT NULL,
    `first_name` CHAR(255) NOT NULL,
    `other_name` CHAR(255),
    dob DATE NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL,
    email CHAR(255) UNIQUE,
    phone CHAR(20) UNIQUE,
    `address` TEXT NOT NULL,
    employment_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS payments (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    student_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    `status` ENUM('Confirmed', 'Pending', 'Unreceived') DEFAULT 'Pending',
    amount FLOAT(2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS plan_students (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    student_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    plan_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (plan_id) REFERENCES plans(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS course_plans (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    course_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    plan_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (plan_id) REFERENCES plans(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS payment_students (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    student_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    payment_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (payment_id) REFERENCES payments(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS course_instructors (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    instructor_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (instructor_id) REFERENCES instructors(id),
    course_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE `training_portal`.`admins` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `name` CHAR(255) NOT NULL,
    `email` CHAR(255) NOT NULL,
    `password` CHAR(255) NOT NULL
) ENGINE = InnoDB;