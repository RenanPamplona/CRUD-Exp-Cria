CREATE DATABASE IF NOT EXISTS crud_cria;
USE crud_cria;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(255) NOT NULL,        
    age INT NOT NULL,                         
    cpf CHAR(11) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    is_student BOOLEAN DEFAULT FALSE
);	

INSERT INTO users (name, age, cpf, email, is_student) VALUES
('Alice Souza', 28, '12345678900', 'alice.souza@email.com', true),
('Bruno Lima', 34, '23456789011', 'bruno.lima@email.com', false),
('Carla Mendes', 22, '34567890122', 'carla.mendes@email.com', true),
('Diego Rocha', 40, '45678901233', 'diego.rocha@email.com', false),
('Eduarda Silva', 30, '56789012344', 'eduarda.silva@email.com', false),
('Felipe Torres', 26, '67890123455', 'felipe.torres@email.com', true),
('Gabriela Costa', 31, '78901234566', 'gabriela.costa@email.com', false),
('Henrique Martins', 38, '89012345677', 'henrique.martins@email.com', false),
('Isabela Duarte', 29, '90123456788', 'isabela.duarte@email.com', true),
('João Pedro', 33, '01234567899', 'joao.pedro@email.com', false),
('Karen Almeida', 27, '11223344556', 'karen.almeida@email.com', true),
('Lucas Nunes', 24, '22334455667', 'lucas.nunes@email.com', true),
('Mariana Freitas', 36, '33445566778', 'mariana.freitas@email.com', false),
('Nicolas Teixeira', 35, '44556677889', 'nicolas.teixeira@email.com', false),
('Olívia Ramos', 23, '55667788990', 'olivia.ramos@email.com', true),
('Paulo Henrique', 37, '66778899001', 'paulo.henrique@email.com', false),
('Quésia Lopes', 25, '77889900112', 'quesia.lopes@email.com', true),
('Rafael Cardoso', 32, '88990011223', 'rafael.cardoso@email.com', false),
('Samira Araújo', 21, '99001122334', 'samira.araujo@email.com', true),
('Thiago Oliveira', 39, '10111213141', 'thiago.oliveira@email.com', false);
