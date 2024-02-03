import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import 'html2pdf.js';

const App = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    address: '',
    contact: '',
    quantity: '',
    product: '',
    unitPrice: '',
    totalProductPrice: '',
    totalOrderPrice: '',
    paymentMethod: 'cash',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({ ...formData, image: imageFile });
  };

  const submitOrder = async () => {
    try {
      // Renderizar o formulário no canvas
      const formElement = document.getElementById('order-form');
      const canvas = await html2canvas(formElement);

      // Converter o canvas em uma imagem (data URL)
      const imageDataUrl = canvas.toDataURL('image/jpeg');

      // Adicionar a imagem ao PDF
      const pdf = new jsPDF();
      pdf.addImage(imageDataUrl, 'JPEG', 0, 0, 210, 297); // Ajuste conforme necessário

      // Salvar o PDF ou enviar para o backend
      pdf.save('pedido.pdf');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    }
  };

  return (
    <div>
      <form id="order-form">
        <label htmlFor="clientName">Nome do Cliente:</label>
        <input type="text" id="clientName" name="clientName" value={formData.clientName} onChange={handleChange} />

        <label htmlFor="address">Endereço:</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />

        <label htmlFor="contact">Contato:</label>
        <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} />

        {/* Outros campos do formulário */}

        <label htmlFor="image">Imagem:</label>
        <input type="file" id="image" name="image" accept="image/jpeg" onChange={handleImageChange} />

        <button type="button" onClick={submitOrder}>
          Enviar Pedido
        </button>
      </form>
    </div>
  );
};

export default App;