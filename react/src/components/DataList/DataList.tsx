import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { User } from "@/types/users";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import ScreenCard from "../ScreenCard/ScreenCard";
import { Toaster } from "../ui/sonner";
import { Check, X } from "lucide-react";

const DataList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = () => {
      fetch("http://localhost:8800/")
        .then((response) => response.json())
        .then((response) => setUsers(response));
    };

    getUsers();
  }, []);

  return (
    <ScreenCard>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl text-center">Usuários</h1>
        <Button onClick={() => navigate("/new")}>Novo usuário</Button>
      </div>
      <Table className="border-separate border-spacing-y-2">
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Idade</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Estudante?</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="bg-slate-200 overflow-hidden hover:bg-slate-300 hover:cursor-pointer"
              onClick={() => navigate(`/user/${user.id}`)}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.cpf}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.is_student ? (
                  <Check className="text-green-500" />
                ) : (
                  <X className="text-red-500" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Toaster />
    </ScreenCard>
  );
};

export default DataList;
