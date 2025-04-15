# Formulário TR do São João de Gravatá - Turismo

Um formulário simples para cadastro de TR (Turismo Receptivo) para o São João de Gravatá.

## Recursos

- Formulário completo para bandas e atrações
- Validação de campos obrigatórios
- Envio dos dados por e-mail
- Envio dos dados por WhatsApp
- Responsivo (funciona em dispositivos móveis)

## Como configurar

1. Faça upload de todos os arquivos para seu servidor web com suporte a PHP
2. Edite o arquivo `script.js` na linha onde contém o número do WhatsApp (`https://wa.me/5581999999999`) e substitua pelo número que receberá as mensagens
3. Edite o arquivo `send_email.php` e atualize o e-mail destinatário na linha que contém `$para = "turismo@gravata.pe.gov.br"`
4. Acesse o formulário através do navegador

## Arquivos incluídos

- `index.html` - Estrutura do formulário
- `styles.css` - Estilos e aparência do formulário
- `script.js` - Lógica de validação e envio do formulário
- `send_email.php` - Script PHP para envio de e-mail

## Requisitos mínimos

- Servidor web com suporte a PHP
- Suporte à função `mail()` do PHP para envio de e-mails

## Campos do formulário

O formulário conta com os seguintes campos:

- **Nome do Responsável** - Campo obrigatório
- **Cargo ou Função** - Campo obrigatório
- **E-mail para Contato** - Campo obrigatório com validação de formato
- **Telefone** - Campo obrigatório com formatação automática
- **Nome da Banda / Atração** - Campo obrigatório
- **Gênero Musical** - Campo obrigatório
- **Quantidade de Integrantes** - Campo numérico obrigatório
- **Origem (Cidade/Estado)** - Campo obrigatório
- **Data da Apresentação** - Campo de data obrigatório
- **Horário de Início e Término** - Campo obrigatório
- **Duração do Show (em minutos)** - Campo numérico obrigatório
- **Local Sugerido** - Campo de seleção obrigatório
- **Valor do Cachê (R$)** - Campo numérico obrigatório
- **Forma de Pagamento** - Campo obrigatório
- **Há despesas extras?** - Campo de escolha obrigatório
- **Equipamentos Necessários** - Campo opcional
- **Exigências Técnicas** - Campo opcional
- **Link do Portfólio / Vídeos / Instagram** - Campo opcional
- **Documentação Anexa** - Campo de escolha obrigatório
- **Observações Finais** - Campo opcional 