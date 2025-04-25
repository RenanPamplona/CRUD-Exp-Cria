import { useNavigate, useParams } from "react-router-dom";
import ScreenCard from "../ScreenCard/ScreenCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Check, Info, X } from "lucide-react";
import { User } from "@/types/users";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Spinner } from "../ui/spinner";

const UserPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>();

  const handleDeleteUser = () => {
    setLoading(true);
    fetch(`http://localhost:8800/${user?.id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((response) => {
        toast(response.message, { icon: <Info /> });
        navigate("/");
        setLoading(false);
      });
  };

  useEffect(() => {
    const getUser = () => {
      fetch(`http://localhost:8800/${id}`)
        .then((response) => response.json())
        .then((response) => setUser(response))
        .finally(() => setLoading(false));
    };

    getUser();
  }, [id]);

  return (
    <ScreenCard>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex gap-4 items-center">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => navigate("/")}
            >
              <ArrowLeft />
            </Button>
            <h1 className="font-semibold text-2xl text-center">{user?.name}</h1>
            <span className="text-xs bg-zinc-200 py-1 px-3 rounded-md mt-1">
              {user?.id}
            </span>
          </div>
          <div className="flex flex-col gap-2 p-4 bg-slate-100 rounded-md">
            <span className="text-muted-foreground text-xs">Dados</span>
            <div className="flex justify-between items-end gap-2">
              <span className="text-muted-foreground text-sm">Idade</span>
              <span className="border-dashed border-slate-300 border-b-2 grow mb-1"></span>
              <span className="text-sm">{user?.age}</span>
            </div>
            <div className="flex justify-between items-end gap-2">
              <span className="text-muted-foreground text-sm">CPF</span>
              <span className="border-dashed border-slate-300 border-b-2 grow mb-1"></span>
              <span className="text-sm">{user?.cpf}</span>
            </div>
            <div className="flex justify-between items-end gap-2">
              <span className="text-muted-foreground text-sm">Email</span>
              <span className="border-dashed border-slate-300 border-b-2 grow mb-1"></span>
              <span className="text-sm">{user?.email}</span>
            </div>
            <div className="flex justify-between items-end gap-2">
              <span className="text-muted-foreground text-sm">
                É estudante?
              </span>
              <span className="border-dashed border-slate-300 border-b-2 grow mb-1"></span>
              <span className="text-sm">
                {user?.is_student ? (
                  <Check className="text-green-500" />
                ) : (
                  <X className="text-red-500" />
                )}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => navigate(`/edit/${id}`)}>
              Editar
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Excluir</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir o usuário {user?.name}?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação irá deletar permanentemente este usuário do banco
                    de dados.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteUser}>
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      )}
    </ScreenCard>
  );
};

export default UserPage;
