document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('turismoForm');
    const localSelect = document.getElementById('local');
    const outroLocalInput = document.getElementById('outroLocal');
    
    // Adicionar div para mensagens
    const messageDiv = document.createElement('div');
    messageDiv.id = 'formMessage';
    messageDiv.className = 'message';
    form.parentNode.insertBefore(messageDiv, form);
    
    // Mostrar/esconder campo "outro local" baseado na seleção
    localSelect.addEventListener('change', function() {
        if (this.value === 'Outro') {
            outroLocalInput.style.display = 'block';
            outroLocalInput.required = true;
        } else {
            outroLocalInput.style.display = 'none';
            outroLocalInput.required = false;
            outroLocalInput.value = '';
        }
    });
    
    // Formatar campo de telefone
    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        
        if (value.length > 7) {
            this.value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
        } else if (value.length > 2) {
            this.value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
        } else if (value.length > 0) {
            this.value = `(${value.substring(0, 2)}`;
        }
    });
    
    // Formatar valor de cachê como moeda
    const cacheInput = document.getElementById('cache');
    cacheInput.addEventListener('blur', function() {
        const value = parseFloat(this.value);
        if (!isNaN(value)) {
            this.value = value.toFixed(2);
        }
    });
    
    // Validação e envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            showMessage('Por favor, preencha todos os campos obrigatórios corretamente.', 'error');
            return;
        }
        
        // Coletar dados do formulário
        const formData = new FormData(form);
        const formDataObject = {};
        
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        
        // Adicionar campo "outro local" se necessário
        if (localSelect.value === 'Outro' && outroLocalInput.value) {
            formDataObject.local = outroLocalInput.value;
        }
        
        // Preparar mensagem para WhatsApp
        const whatsappMessage = prepareWhatsAppMessage(formDataObject);
        
        // Mostrar mensagem de sucesso
        showMessage('Formulário preenchido com sucesso! Redirecionando para o WhatsApp...', 'success');
        
        // Redirecionar para WhatsApp após 2 segundos
        setTimeout(() => {
            const whatsappUrl = `https://wa.me/5581992463174?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
            
            // Limpar formulário
            form.reset();
            outroLocalInput.style.display = 'none';
        }, 2000);
    });
    
    // Função para validar o formulário
    function validateForm() {
        let isValid = true;
        
        // Verificar campos obrigatórios
        const requiredInputs = form.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('invalid');
                isValid = false;
            } else {
                input.classList.remove('invalid');
            }
        });
        
        // Verificar email
        const emailInput = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailPattern.test(emailInput.value)) {
            emailInput.classList.add('invalid');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Função para mostrar mensagens
    function showMessage(text, type) {
        const messageDiv = document.getElementById('formMessage');
        messageDiv.textContent = text;
        
        // Remover classes antigas
        messageDiv.classList.remove('error-message', 'success-message', 'info-message');
        
        // Adicionar nova classe baseada no tipo
        if (type === 'error') {
            messageDiv.classList.add('error-message');
        } else if (type === 'success') {
            messageDiv.classList.add('success-message');
        } else if (type === 'info') {
            messageDiv.classList.add('info-message');
        }
        
        messageDiv.style.display = 'block';
        
        // Rolar para o topo do formulário
        window.scrollTo({
            top: messageDiv.offsetTop - 20,
            behavior: 'smooth'
        });
        
        // Esconder mensagem após 5 segundos se for erro ou info
        if (type === 'error' || type === 'info') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
    
    // Função para preparar mensagem para WhatsApp
    function prepareWhatsAppMessage(data) {
        return `*📋 TR DO SÃO JOÃO DE GRAVATÁ - TURISMO*

*👤 DADOS DO RESPONSÁVEL*
----------------------------
• *Nome:* ${data.nome}
• *Cargo:* ${data.cargo}
• *Email:* ${data.email}
• *Telefone:* ${data.telefone}

*🎵 DADOS DA ATRAÇÃO*
----------------------------
• *Nome da Banda/Atração:* ${data.banda}
• *Gênero Musical:* ${data.genero}
• *Quantidade de Integrantes:* ${data.integrantes}
• *Origem:* ${data.origem}

*📅 APRESENTAÇÃO*
----------------------------
• *Data:* ${formatDate(data.data)}
• *Horário:* ${data.horario}
• *Duração:* ${data.duracao} minutos
• *Local Sugerido:* ${data.local}

*💰 INFORMAÇÕES FINANCEIRAS*
----------------------------
• *Valor do Cachê:* R$ ${data.cache}
• *Forma de Pagamento:* ${data.pagamento}
• *Despesas Extras:* ${data.despesas === 'sim' ? 'Sim' : 'Não'}

${data.equipamentos ? `*🎛️ EQUIPAMENTOS NECESSÁRIOS*
----------------------------
${data.equipamentos}

` : ''}${data.exigencias ? `*⚙️ EXIGÊNCIAS TÉCNICAS*
----------------------------
${data.exigencias}

` : ''}${data.links ? `*🔗 LINKS*
----------------------------
${data.links}

` : ''}*📝 DOCUMENTAÇÃO*
----------------------------
• *Documentação Anexa:* ${data.documentacao === 'sim' ? 'Sim' : 'Não'}
${data.observacoes ? `
*📌 OBSERVAÇÕES*
----------------------------
${data.observacoes}` : ''}`;
    }
    
    // Função para formatar data (YYYY-MM-DD para DD/MM/YYYY)
    function formatDate(dateString) {
        if (!dateString) return '';
        const parts = dateString.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
}); 