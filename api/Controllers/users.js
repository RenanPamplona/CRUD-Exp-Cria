import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getUser = (req, res) => {
  if (!req.params.id || isNaN(req.params.id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const q = "SELECT * FROM users WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ message: "Usuário não encontrado" });
    return res.status(200).json(data[0]);
  });
};

export const saveUser = (req, res) => {
  const { name, age, cpf, email, is_student } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Nome é obrigatório" });
  }

  if (!age || isNaN(age) || age < 0 || age > 130) {
    return res.status(400).json({ message: "Idade inválida" });
  }

  if (!cpf || cpf.length < 11) {
    return res.status(400).json({ message: "CPF inválido" });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: "Email inválido" });
  }

  if (is_student === undefined) {
    return res.status(400).json({ message: "Campo 'é estudante' é obrigatório" });
  }

  const q = "INSERT INTO users (name, age, cpf, email, is_student) VALUES (?, ?, ?, ?, ?)";
  const values = [name, age, cpf, email, is_student];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ message: "Usuário criado com sucesso", id: data.insertId });
  });
};

export const updateUser = (req, res) => {
  const { name, age, cpf, email, is_student } = req.body;

  if (!req.params.id || isNaN(req.params.id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  if (!name) {
    return res.status(400).json({ message: "Nome é obrigatório" });
  }

  if (!age || isNaN(age) || age < 0 || age > 130) {
    return res.status(400).json({ message: "Idade inválida" });
  }

  if (!cpf || cpf.length < 11) {
    return res.status(400).json({ message: "CPF inválido" });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: "Email inválido" });
  }

  if (is_student === undefined) {
    return res.status(400).json({ message: "Campo 'é estudante' é obrigatório" });
  }

  const q = "UPDATE users SET name = ?, age = ?, cpf = ?, email = ?, is_student = ? WHERE id = ?";
  const values = [name, age, cpf, email, is_student, req.params.id];

  db.query(q, values, (err, _) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Usuário atualizado com sucesso" });
  });
};

export const deleteUser = (req, res) => {
  if (!req.params.id || isNaN(req.params.id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const q = "DELETE FROM users WHERE id = ?";

  db.query(q, [req.params.id], (err, _) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Usuário deletado com sucesso" });
  });
};