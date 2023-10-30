export interface Venda {
  id?: number; // Campo ID do produto
  itemId: number; // ID do item vendido
  itemEstoque?: any; // Armazenar item estoque
  nomeItem: string; // Nome do item vendido
  clienteNome: string; // Nome do cliente
  formaPagamento: string; // Forma de pagamento
  cpf: string; // CPF do cliente (ou outro identificador)
  contato: string; // Informações de contato do cliente
  quantidade: number; // Quantidade vendida
  valorTotal: number; // Valor total da venda
  dataVenda: Date; // Data da venda
}
