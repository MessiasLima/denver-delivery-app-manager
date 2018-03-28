# DENVER DELIVERY (NOME PROVISÒRIO)
Aplicativo para Administradores

## Descrição
O Denver Delivery* é um aplicativo de entrega de comida voltado ao publico das cidades do interior do ceará

## Tecnologias utilizadas
O Aplicativo foi construido com tecnologias hibridas com base no [IONIC Framework](https://ionicframework.com/docs/). Esse framework utiliza tecnologias WEB(HTML, CSS, JavaScript) para desenvolver aplicações para dispositivos móveis.

Além disso, as seguinter ferramentas foram utilizadas:

- [GIT](https://git-scm.com/), para versionamento de código

## Ambiente de desenvolvimento
### O que é preciso instalar?
Para o ambiente de desenvolvimento é necessario a instalação dos seguintes softwares:

- [GIT](https://git-scm.com/), para o versionamento de códido e download de dependencias do IONIC
- [NodeJS e NPM](https://nodejs.org/en/), responsável por automatizar a tarefas do desenvovimento e gerenciamento de dependências
- [Ionic Framework](https://ionicframework.com/getting-started/)
    - [Cordova](https://cordova.apache.org/)*, responsavel por fazer a ponte entre a parte web e os recursos nativos dos smartphones. Para instalar o Cordova juntamente com o IONIC, basta estar com o NodeJS instalado, abrir uma janela do prompt de comando e digitar o seguinte comando:
    ```
    npm install -g ionic cordova
    ```
- [Android SDK](https://developer.android.com/studio/index.html?hl=pt-br#downloads). Opcional. É necessário apenas para fazer deploy da aplicação em dispositivos Android. Durante o desenvolvimento, o resultado pode ser visto diretamente no navegador de internet.

** A instalação do cordova pode ser feita junto com o Ionic via NPM(Gerenciador de dependencias do NodeJS) **

## Executando o projeto

1. Como o GIT instalado, abra uma janela de terminal (cmd)  e entre na pasta onde deseja colocar o projeto. 
1. Clone o projeto na pasta com o comando. Pode ser necessário colocar seu login e senha do Gitlab 
    ``` 
    git clone https://gitlab.com/caju_mobile/delivery/delivery-manager-app.git
    ```
1. Após terminar o clone, entre na pasta onde o projeto foi baixado  com o comando 
    ```
    cd delivery-manager-app
    ```
1. Execute o comando npm para baixar as dependências do projeto
    ```
    npm install
    ```
1. Execute o comando para iniciar o sevidor web local do aplicativo. Aguarde, o navegador abrirá uma aba com o aplicativo. Para uma melhor experiência, pressione F12 para entrar no modo de visualizacao em telas estreitas.
    ```
    ionic serve
    ```

Depois que o servidor web do aplicativo estiver rodando, você pode usar qualquer editor de texto para alterar os arquivos do projeto. Quando os arquivos forem salvos, o aplicativo irá atualizar automaticamente.

É recomendado o uso do [Visual Studio Code](https://code.visualstudio.com/) para editar os arquivos