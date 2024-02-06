import axios from "axios";
import './App.css'; 
import { useState } from "react";
import ClientInfoSection from "./components/ClientInfoSection";
import AddressFormSection from "./components/AddressFormSection";
import ContactAndQuantitySection from "./components/ContactAndQuantitySection";
import PaymentMethodSection from "./components/PaymentMethodSection";

const App = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    address: "",
    contact: "",
    quantity: "",
    cep: "",
    product: "",
    unitPrice: "",
    totalProductPrice: "",
    totalOrderPrice: "",
    paymentMethod: "cash",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const buscarEnderecoPorCep = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (data.cep) {
        return `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
      } else {
        return 'Endereço não encontrado';
      }
    } catch (error) {
      console.error('Erro ao obter endereço:', error);
      return 'Erro ao obter endereço';
    }
  };

  const handleCepBlur = async () => {
    try {
      const enderecoCompleto = await buscarEnderecoPorCep(formData.cep);
      await setFormData((prevState) => ({
        ...prevState,
        address: enderecoCompleto,
      }));
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  };

  const generatePDF = async () => {
    try {
      console.log('Gerando PDF - Estado Atual:', formData);
      // ... restante da lógica
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const submitOrder = (e) => {
    e.preventDefault();
    console.log('Formulário Submetido:', formData);

    console.log("Pedido Enviado:");
    console.log("Nome do Cliente:", formData.clientName);
    console.log("Endereço:", formData.address);
    console.log("Contato:", formData.contact);

    setFormData({
      clientName: "",
      address: "",
      contact: "",
    });
  };

  return (
    <div className="app-container">
      <form className="input-container" onSubmit={submitOrder}>
        <ClientInfoSection
          formData={formData}
          handleChange={handleChange}
        />

        <AddressFormSection
          formData={formData}
          handleCepBlur={handleCepBlur}
        />

        <ContactAndQuantitySection
          formData={formData}
          handleChange={handleChange}
        />

        <PaymentMethodSection
          formData={formData}
          handleChange={handleChange}
        />

        <button type="button" onClick={generatePDF}>
          Gerar Etiqueta
        </button>
      </form>
    </div>
  );
};

export default App;