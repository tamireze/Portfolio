Feature: WebdriverUniversity - Login Page - Challenge

    Background: Pré-condições
        Given Que eu acesso a home da pagina WebdriverUniversity
        When Eu clico no botão 'Login'

    @smoke
    Scenario Outline: Logins
        And Eu digito um '<username>'
        And Eu digito uma '<pssword>'
        And Eu clico no botão de 'Login'
        Then Eu devo visualizar uma mensagem de login '<message>'

    Examples:
        | username  | pssword       | message               |
        | webdriver | webdriver123  | validation succeeded  |
        | webdriver | Jones         | validation failed     |
        