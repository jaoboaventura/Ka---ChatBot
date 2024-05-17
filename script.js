document.querySelector('.message-input').addEventListener('keydown', function(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        insertMessage();
    }
});

var messagesContent = document.querySelector('.messages-content');
var messageInput = document.querySelector('.message-input');
var d, h, m;
var nomeCliente = "";
var telefoneCliente = "";
var clienteKonnet = "";
var documentoCliente = "";

window.addEventListener('load', function () {
    updateScrollbar();
    setTimeout(function () {
        apresentacao();
    }, 100);
});

function updateScrollbar() {
    messagesContent.scrollTop = messagesContent.scrollHeight;
}

function setDate() {
    d = new Date();
    if (m != d.getMinutes()) {
        m = d.getMinutes();
        var timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');
        timestamp.textContent = d.getHours() + ':' + (m < 10 ? '0' + m : m);
        var lastMessage = messagesContent.lastElementChild;
        lastMessage.appendChild(timestamp);
    }
}

function apresentacao() {
    var message = document.createElement('div');
    message.classList.add('message', 'new');
    message.innerHTML = '<figure class="avatar"><img src="/assets/Ká/Ká1.jpg" /></figure>Olá! Sou a Ká, assistente virtual da KONNET. Por favor, diga-me o seu nome. ;)';
    messagesContent.appendChild(message);
    setDate();
    updateScrollbar();
}

function solicitarTelefone() {
    var message = document.createElement('div');
    message.classList.add('message', 'new');
    message.innerHTML = '<figure class="avatar"><img src="/assets/Ká/Ká1.jpg" /></figure>Obrigada, ' + nomeCliente + '! Agora, me informe seu número de telefone para contato:';
    messagesContent.appendChild(message);
    setDate();
    updateScrollbar();
}

function perguntaCliente() {
    var message = document.createElement('div');
    message.classList.add('message', 'new');
    message.innerHTML = '<figure class="avatar"><img src="/assets/Ká/Ká1.jpg" /></figure>Você já é cliente KONNET? <br> 1 - Sim <br> 2 - Não';
    messagesContent.appendChild(message);
    setDate();
    updateScrollbar();
}

function opcoesAtendimento() {
    var message;
    if (clienteKonnet === "Sim") {
        message = '<div class="message new"><figure class="avatar"><img src="/assets/Ká/Ká1.jpg" /></figure>É muito bom ter você conosco, ' + nomeCliente + '! Agora, selecione uma das opções abaixo: <br> 1 - Setor de Vendas <br> 2 - Setor Financeiro <br> 3 - Suporte Técnico</div>';
    } else {
        message = '<div class="message new"><figure class="avatar"><img src="/assets/Ká/Ká1.jpg" /></figure>Ótimo, ' + nomeCliente + '! Como você não é cliente, sua única opção é o Setor de Vendas.</div>';
    }
    messagesContent.insertAdjacentHTML('beforeend', message);
    setDate();
    updateScrollbar();
}

function processarResposta(resposta) {
    var message;
    switch (resposta) {
        case "1":
            message = 'Você escolheu: Setor de Vendas. Aguarde, um atendente retornará o contato.';
            break;
        case "2":
            message = 'Você escolheu: Setor Financeiro. Aguarde, um atendente retornará o contato.';
            break;
        case "3":
            message = 'Você escolheu: Suporte Técnico. Aguarde, um atendente retornará o contato.';
            break;
        default:
            message = 'Desculpe, não entendi. Por favor, escolha uma opção válida.';
    }
    var responseMessage = '<div class="message new"><figure class="avatar"><img src="/assets/Ká/Ká1.jpg" /></figure>' + message + '</div>';
    messagesContent.insertAdjacentHTML('beforeend', responseMessage);
    setDate();
    updateScrollbar();
}

function insertMessage() {
    var msg = messageInput.value.trim();
    if (msg === '') {
        return false;
    }
    var message = '<div class="message message-personal">' + msg + '</div>';
    messagesContent.insertAdjacentHTML('beforeend', message);
    setDate();
    messageInput.value = '';
    updateScrollbar();

    if (nomeCliente === "") {
        nomeCliente = msg;
        solicitarTelefone();
    } else if (telefoneCliente === "") {
        if (/^\d+$/.test(msg)) {
            telefoneCliente = msg;
            perguntaCliente();
        } else {
            var errorMessage = '<div class="message new"><figure class="avatar"><img src="/assets/Ká/Ká1.jpg" /></figure>Por favor, insira apenas números para o número de telefone.</div>';
            messagesContent.insertAdjacentHTML('beforeend', errorMessage);
            setDate();
            updateScrollbar();
        }
    } else if (clienteKonnet === "") {
        if (msg === "1" || msg === "2") {
            clienteKonnet = msg === "1" ? "Sim" : "Não";
            if (clienteKonnet === "Sim") {
                var documentMessage = '<div class="message new"><figure class="avatar"><img src="/assets/Ká/Ká1.jpg" /></figure>Por favor, informe seu número de documento (CPF ou CNPJ) sem pontuações:</div>';
                messagesContent.insertAdjacentHTML('beforeend', documentMessage);
                setDate();
                updateScrollbar();
            } else {
                var contactMessage = '<div class="message new"><figure class="avatar"><img src="/assets/Ká/Ká1.jpg" /></figure>Ótimo, ' + nomeCliente + '! Como você não é cliente, sua única opção é o Setor de Vendas. Um colaborador KONNET entrará em contato em breve.</div>';
                messagesContent.insertAdjacentHTML('beforeend', contactMessage);
                setDate();
                updateScrollbar();
            }
        } else {
            var errorMessage = '<div class="message new"><figure class="avatar"><img src="/assets/Ká/Ká1.jpg" /></figure>Desculpe, não entendi. Por favor, responda com "1" para Sim ou "2" para Não.</div>';
            messagesContent.insertAdjacentHTML('beforeend', errorMessage);
            setDate();
            updateScrollbar();
        }
    } else if (clienteKonnet === "Sim" && documentoCliente === "") {
        if (/^\d+$/.test(msg)) {
            documentoCliente = msg;
            opcoesAtendimento();
        } else {
            var errorMessage = '<div class="message new"><figure class="avatar"><img src="/assets/Ká/Ká1.jpg" /></figure>Por favor, insira apenas números para o número de documento.</div>';
            messagesContent.insertAdjacentHTML('beforeend', errorMessage);
            setDate();
            updateScrollbar();
        }
    } else {
        processarResposta(msg);
    }

    messageInput.focus();
}

function reiniciarChat() {
    messagesContent.innerHTML = '';
    nomeCliente = "";
    telefoneCliente = "";
    clienteKonnet = "";
    documentoCliente = "";
    messageInput.value = '';
    apresentacao();
}

document.querySelector('.message-submit').addEventListener('click', function () {
    insertMessage();
});

document.querySelector('.reset-chat').addEventListener('click', function () {
    reiniciarChat();
});
