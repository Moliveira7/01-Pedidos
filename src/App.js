import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePDF = async () => {
    try {
      console.log('Gerando PDF...');

      // Verificar se todos os campos obrigatórios estão preenchidos
      if (!formData.clientName || !formData.address || !formData.contact || !formData.quantity) {
        alert('Preencha todos os campos obrigatórios.');
        return;
      }

      // Adiar a geração do PDF até que o estado seja totalmente atualizado
      await setFormData((prevState) => ({ ...prevState }));

      const quantity = parseInt(formData.quantity, 10) || 1; // Garantir que a quantidade seja um número válido

      const orders = Array.from({ length: quantity }, (_, index) => {
        const etiquetasPorLinha = 2; // Quantidade de etiquetas por linha
        const margemHorizontal = 5; // Margem horizontal entre etiquetas
        const larguraEtiqueta = `calc(50% - ${margemHorizontal}px)`;

        const linha = Math.floor(index / etiquetasPorLinha);
        const coluna = index % etiquetasPorLinha;

        const estiloEtiqueta = `
          width: ${larguraEtiqueta};
          float: left;
          page-break-inside: avoid;
          font-size: 10px;
          margin-bottom: 20px;
          margin-right: ${coluna === 0 ? 0 : margemHorizontal}px;
          border: 1px solid #000;
          padding: 5px;
          ${coluna === 0 ? 'clear: left;' : ''}
          background-image: url('background.jpg');
          background-size: cover;
          color: white;
        `;

        return `
          <div style="${estiloEtiqueta}">
            <h2 style="font-size: 14px; margin-bottom: 10px;">Seu Pedido Chegou!</h2>
            <p><strong>Nome:</strong> ${formData.clientName}</p>
            <p><strong>Endereço:</strong> ${formData.address}</p>
            <p><strong>Contato:</strong> ${formData.contact}</p>
            <!-- Outros campos do formulário -->
            <p style="margin-top: 10px;"><strong>Método de Pagamento:</strong> ${formData.paymentMethod}</p>
          </div>
        `;
      });

      const orderHTML = `
        <div style="width: 100%; overflow: hidden; margin-top: 20px;">
          ${orders.join('')}
        </div>
      `;

      console.log('Conteúdo HTML:', orderHTML);

      // Configurações do PDF
      const pdfOptions = {
        margin: 10,
        filename: 'pedidos.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      // Tentar gerar o PDF
      const pdf = await html2pdf(orderHTML, pdfOptions);

      console.log('PDF gerado:', pdf);

      // Resto do código permanece o mesmo
      // ...

    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    }
  };


  return (
    <div>
      <form id="order-form">
        <label htmlFor="clientName">Nome do Cliente:</label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
        />

        <label htmlFor="address">Endereço:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <label htmlFor="contact">Contato:</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
        />

        <label>
          Quantidade de Etiquetas:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </label>

        <button type="button" onClick={generatePDF}>
          Enviar Pedido
        </button>
      </form>
    </div>
  );
};

export default App;
