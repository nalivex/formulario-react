import { useEffect, useState } from "react";
import axios from "axios";
import { IMaskInput } from "react-imask";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new formData(e.target);
    const data = Object.fromEntries(formData);
  };

  console.log("*** handleSubmit", formValues);

  return (
    <form onSubmit={handleSubmit}>
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
      <button>Enviar</button>
    </form>
  );
}

export default App;
