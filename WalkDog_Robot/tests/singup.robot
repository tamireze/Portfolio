*** Settings ***
Documentation        Suite de testes de cadastro da dog walker

Resource    ../resources/base.resource

Test Setup    Start session
Test Teardown    Finish Session


*** Test Cases ***
Deve poder cadastrar um novo DogWalker
    [Tags]    smoke

    ${dog_walker}        Create Dictionary
    ...    name=Tamires de Oliveira
    ...    email=tamires@gmail.com
    ...    cpf=00000014141
    ...    cep=60531660
    ...    number=1000
    ...    details=Apt 78
    ...    street=Rua 709
    ...    district=Conjunto Ceará II
    ...    cityUf=Fortaleza/CE
    ...    cnh=toretto.jpg
    
        Go to signup page
        Fill signup form    ${dog_walker}
        Submit signup form
        Popup should be    Recebemos o seu cadastro e em breve retornaremos o contato.


Não deve poder cadastrar se os campos obrigatórios não forem preenchidos
    [Tags]    required
    
        Go to signup page
        Submit signup form
        Alert should be    Informe o seu nome completo
        Alert should be    Informe o seu melhor email
        Alert should be    Informe o seu CPF
        Alert should be    Informe o seu CEP
        Alert should be    Informe um número maior que zero
        Alert should be    Adcione um documento com foto (RG ou CHN)

Não deve poder cadastrar um novo DogWalker com CPF Inválido
    [Tags]    cpf_inv

    ${dog_walker}        Create Dictionary
    ...    name=Beyonce Knowless
    ...    email=beyonce@gmail.com
    ...    cpf=0000000000
    ...    cep=60531660
    ...    number=1000
    ...    details=Apt 78
    ...    street=Rua 709
    ...    district=Conjunto Ceará II
    ...    cityUf=Fortaleza/CE
    ...    cnh=toretto.jpg
    
        Go to signup page
        Fill signup form    ${dog_walker}
        Submit signup form
        Alert should be    CPF Inválido

Deve poder cadastrar um novo DogWalker que sabe cuidar de pets
    [Tags]    aservice

    ${dog_walker}        Create Dictionary
    ...    name=Dominic Toretto
    ...    email=toretto@gmail.com
    ...    cpf=00000014141
    ...    cep=60531660
    ...    number=1000
    ...    details=Apt 78
    ...    street=Rua 709
    ...    district=Conjunto Ceará II
    ...    cityUf=Fortaleza/CE
    ...    cnh=toretto.jpg
    
        Go to signup page
        Fill signup form    ${dog_walker}
        Additional Service    Cuidar
        Submit signup form
        Popup should be    Recebemos o seu cadastro e em breve retornaremos o contato.

Deve poder cadastrar um novo DogWalker que sabe adestrar de pets
    [Tags]    aservice

    ${dog_walker}        Create Dictionary
    ...    name=Marcos Levi
    ...    email=levi@gmail.com
    ...    cpf=00000014141
    ...    cep=60531660
    ...    number=1000
    ...    details=Apt 78
    ...    street=Rua 709
    ...    district=Conjunto Ceará II
    ...    cityUf=Fortaleza/CE
    ...    cnh=toretto.jpg
    
        Go to signup page
        Fill signup form    ${dog_walker}
        Additional Service    Adestrar
        Submit signup form
        Popup should be    Recebemos o seu cadastro e em breve retornaremos o contato.

      
        


    