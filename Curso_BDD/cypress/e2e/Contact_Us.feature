Feature: WebdriverUniversity - Contact Us Page

    Background: Pré-condições
        Given Que eu acesso a home da pagina WebdriverUniversity
        When Eu clico no botão 'Contact Us'

    Scenario: Submissão de formulário válida
        And Eu digito no campo 'First Name'
        And Eu digito no campo 'Last Name'
        And Eu digito no campo 'Email'
        And Eu adiciono um comentário
        And Eu clico no botão de Submissão
        Then Eu devo visualizar uma mensagem de sucesso

    Scenario: Submissão de formuláio inváldia - Sem um campo
        And Eu digito no campo 'Last Name'
        And Eu digito no campo 'Email'
        And Eu adiciono um comentário
        And Eu clico no botão de Submissão
        Then Eu devo visualizar a mensagem 'Error: all fields are required'

    Scenario: Submissão de formuláio inváldia - Email inválido
        And Eu digito no campo 'First Name'
        And Eu digito no campo 'Last Name'
        And Eu digito no campo 'Email' um email inválido
        And Eu adiciono um comentário
        And Eu clico no botão de Submissão
        Then Eu devo visualizar a mensagem 'Error: Invalid email address'

    Scenario: Submissão de formulário válida - Usando dados especificos
        And Eu digito um especifico first name "Sarah"
        And Eu digito um especifico last name "Woods"
        And Eu digito um especifico email adress "sarah_woods@gmail.com"
        And Eu digito um especifico comments "hello123" and um número 1310
        And Eu clico no botão de Submissão
        Then Eu devo visualizar uma mensagem de sucesso
    
    @smoke
    Scenario Outline: : Subimissão de formulário válida - Usando Outline
        And Eu digito no campo "<firstName>" e digito no campo '<lastName>'
        And Eu digito no campo '<emailAdress>' e comento '<comment>'
        And Eu clico no botão de Submissão
        Then Eu devo visualizar uma mensagem com "<message>"

    Examples:
        | firstName | lastName | emailAdress           | comment    | message                         |
        | John      | Jones    | john_jones@gmail.com  | helooo     | Thank You for your Message!     |
        | Su        | Lee      | su_lee@gmail.com      | helooo l21 | Thank You for your Message!     |
        | Ale       | Lee      | ale_lee               | heloool66  | Error: Invalid email address    |



