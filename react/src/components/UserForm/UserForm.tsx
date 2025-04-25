import { useEffect } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { toast, Toaster } from "sonner";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ScreenCard from "../ScreenCard/ScreenCard";

const schemaForm = z.object({
  name: z.string({ required_error: "Nome é obrigatório" }),
  age: z.number({ required_error: "Idade é obrigatório" }).min(0).max(130),
  cpf: z.string({ required_error: "CPF é obrigatório" }),
  email: z.string({ required_error: "E-mail é obrigatório" }),
  is_student: z.boolean({ required_error: "É estudante é obrigatório" }),
});

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      is_student: false,
    },
  });

  function onSubmit(values: z.infer<typeof schemaForm>) {
    const url = id ? `http://localhost:8800/${id}` : `http://localhost:8800/`;

    fetch(url, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
      }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Erro ao processar requisição", {
            icon: <AlertCircle color="red" />,
            duration: 4000,
          });

          throw new Error(data.message || "Erro ao processar requisição");
        }

        return data;
      })
      .then((data) => {
        toast.success(data.message || "Operação realizada com sucesso", {
          icon: <CheckCircle color="green" />,
          duration: 3000,
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  useEffect(() => {
    const getUser = () => {
      fetch(`http://localhost:8800/${id}`)
        .then(async (response) => {
          const data = await response.json();

          if (!response.ok) {
            toast.error(data.message || "Erro ao carregar usuário", {
              icon: <AlertCircle color="red" />,
              duration: 4000,
            });
            throw new Error(data.message || "Erro ao carregar usuário");
          }

          return data;
        })
        .then((data) => {
          form.reset({
            name: data.name,
            age: data.age,
            cpf: data.cpf,
            email: data.email,
            is_student: data.is_student == 1,
          });
        })
        .catch((error) => {
          console.error("Erro ao carregar usuário:", error);
        });
    };

    if (id) {
      getUser();
    }
  }, [id, form]);

  return (
    <ScreenCard>
      <div>
        <h1 className="font-semibold text-2xl">
          {id ? "Editar" : "Criar"} usuário
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid grid-cols-[1fr_130px] gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o nome" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field: { onChange, ...rest } }) => (
                <FormItem>
                  <FormLabel>Idade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Insira a idade"
                      onChange={(e) => onChange(Number(e.target.value))}
                      {...rest}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input placeholder="Insira o cpf" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-[1fr_130px] gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira o e-mail"
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_student"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 mt-5">
                  <FormLabel className="m-0">É estudante?</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end items-center gap-2 mt-6">
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate("/")}
            >
              Cancelar
            </Button>

            <Button type="submit">{id ? "Editar" : "Criar"}</Button>
          </div>
        </form>
      </Form>

      <Toaster position="top-right" richColors />
    </ScreenCard>
  );
}

export default UserForm;
