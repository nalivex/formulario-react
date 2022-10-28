import { useEffect, useState } from "react";
import axios from "axios";
import { IMaskInput } from "react-imask";
import * as yup from "yup";
import "./App.css";

function App() {
  const [country, setCountrys] = useState([]);
  useEffect(() => {
    axios.get("https://amazon-api.sellead.com/country").then((response) => {
      setCountrys(response.data);
    });
  }, []);

  const [city, setCitys] = useState([]);
  useEffect(() => {
    axios.get("https://amazon-api.sellead.com/city").then((response) => {
      setCitys(response.data);
    });
  }, []);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const [formValues, setFormValue] = useState({});

  const handleInputChange = (e) => {
    const { name, value, country, city } = e.target;
    setFormValue({
      ...formValues,
      [name]: value,
      [country]: value,
      [city]: value,
    });
  };

  const addUser = async (e) => {
    e.preventDefault();

    if (!(await validate())) return;

    const saveDataForm = true;

    if (saveDataForm) {
      setStatus({
        type: "success",
        mensagem: "Usuário cadastrado com sucesso!",
      });
      setFormValue({
        name: "",
        email: "",
        cpf: "",
        phone: "",
        country: "",
        city: "",
      });
    } else {
      setStatus({
        type: "error",
        mensagem: "Erro:  não cadastrado com sucesso!",
      });
    }
  };

  async function validate() {
    let schema = yup.object().shape({
      name: yup
        .string("Erro: Necessário preencher o campo nome!")
        .required("Erro: Necessário preencher o campo nome!"),
      email: yup
        .string("Erro: Necessário preencher o campo e-mail!")
        .required("Erro: Necessário preencher o campo e-mail!")
        .email("Erro: Necessário preencher o campo com e-mail válido!"),
      cpf: yup
        .string("Erro: Necessário preencher o campo cpf!")
        .required("Erro: Necessário preencher o campo cpf!"),
      phone: yup
        .string("Erro: Necessário preencher o campo cpf!")
        .required("Erro: Necessário preencher o campo cpf!"),
      country: yup
        .string("Erro: Necessário preencher o campo País!")
        .required("Erro: Necessário preencher o campo País!"),
      city: yup
        .string("Erro: Necessário preencher o campo cidade!")
        .required("Erro: Necessário preencher o campo cidade!"),
    });

    try {
      await schema.validate(formValues);
      return true;
    } catch (err) {
      setStatus({
        type: "error",
        mensagem: err.errors,
      });
      return false;
    }
  }

  console.log("*** handleSubmit", formValues);

  return (
    <form onSubmit={addUser}>
      {status.type === "success" ? (
        <p style={{ color: "green" }}>{status.mensagem}</p>
      ) : (
        ""
      )}
      {status.type === "error" ? (
        <p style={{ color: "#ff0000" }}>{status.mensagem}</p>
      ) : (
        ""
      )}
      <div>
        <div class="container">
          <div class="flex-container">
            <div>
              <label class="label">Dados Pessoais</label>
              <div class="espaco"></div>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                onChange={handleInputChange}
                value={formValues.name || ""}
              />

              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                value={formValues.email || ""}
              />

              <IMaskInput
                name="cpf"
                mask="000.000.000-00"
                placeholder="Digite o seu CPF"
                onChange={handleInputChange}
                value={formValues.cpf || ""}
              />

              <IMaskInput
                name="phone"
                mask="(00) 00000-0000"
                placeholder="Telefone"
                onChange={handleInputChange}
                value={formValues.phone || ""}
              />
            </div>
          </div>

          <div class="flex-container">
            <div class="center-div">
              <label class="label">Destinos de Interesse</label>
              <div class="espaco"></div>
              <select
                name="country"
                placeholder="País"
                id="country"
                onChange={handleInputChange}
                value={formValues.country || ""}
              >
                <options value="0">Selecione o País</options>
                {country.map((country) => (
                  <option key={country.id} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>

              <select
                name="city"
                placeholder="Cidade"
                id="city"
                onChange={handleInputChange}
                value={formValues.city || ""}
              >
                <options value="0">Selecione a Cidade</options>
                {city.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div class="button">
          <button class="button-style">Enviar</button>
        </div>
      </div>
    </form>
  );
}

export default App;
