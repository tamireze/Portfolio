*** Settings ***
Documentation    Arquivo principal do projeto

Library    Browser

Resource    actions/signup.resource
Resource    env.resource

*** Keywords ***
Start session
    New Browser    browser=${BROWSER}   headless=False
    New Page    https://walkdog.vercel.app/

    Wait For Elements State    css=h1 >> text=Cuidado e diversão em cada passo
    ...    visible    5  

Finish Session
    Take Screenshot    fullPage=True


