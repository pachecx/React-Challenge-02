import { login } from "./utils";
import "./index.css";
import { useState } from "react";

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários. OK
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.  OK
// todo - Desabilite o botão de Login equanto você está executando o login. OK
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login. OK
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição. OK

export default function LoginForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, seterror] = useState(false);
  const [request, setisRequest] = useState(false);

  const handleForm = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      const newData = { ...prev, [name]: value };

      return newData;
    });
    console.log(data);
  };

  const handleSubimit = (e) => {
    e.preventDefault();
    seterror(false);
    setisRequest(true);

    login(data)
      .then(() => {
        alert("Logado");
      })
      .catch((error) => {
        console.log(error);
        seterror(true);
      })
      .finally(() => {
        setisRequest(false);
      });
    console.log(data, "enviado");
  };

  return (
    <div className="wrapper">
      <div className="login-form">
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        <div className="errorMessage">
          {error === true ? "Tente novamente" : ""}
        </div>
        <div className="row">
          <label htmlFor={"email"}>Email</label>
          <input
            onChange={handleForm}
            name="email"
            id={"email"}
            value={data.email}
            type={"email"}
            autoComplete="off"
          />
        </div>
        <div className="row">
          <label htmlFor={"password"}>Password</label>
          <input
            onChange={handleForm}
            name="password"
            value={data.password}
            id={"password"}
            type={"password"}
          />
        </div>

        <div className="button">
          <button
            disabled={
              !data.email || data.password.length < 6 || request ? true : false
            }
            onClick={handleSubimit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}