import { faker } from '@faker-js/faker';
describe('HackerNews', () => {
  const termoInicial = 'redux'
  const novoTermo = 'Cypress'
  context('Usando API', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'GET',
        pathname: '**/search',
        query: {
          query: termoInicial,
          page: '0'
        }
      }).as('loading')
  
        cy.visit('https://hackernews-seven.vercel.app/')
        cy.wait('@loading')
      })
      it('Verificando se existe 100 histórias e se ao clicar em "more" mostra mais 100', () =>{
        cy.intercept({
          method: 'GET',
          pathname: '**/search',
          query: {
            query: termoInicial,
            page: '1'
          }
        }).as('more')

        cy.get('.table-row').should('have.length', 100)
        cy.get('.page > :nth-child(3) > button')
        .should('be.visible')
        .click()
        cy.wait('@more')
        cy.get('.table-row').should('have.length', 200)
      })

      it('Verificando se um item é removido da lista corretamente', () => {
        cy.get('.table > :nth-child(2) > :nth-child(5)')
        .should('be.visible')
        .click()
        cy.get('.table-row').should('have.length', 99)
      })

      context('Buscas', () => {
        beforeEach(()=>{
          cy.intercept({
            method: 'GET',
            pathname: '**/search',
            query: {
              query: novoTermo,
              page: '0'
            }
          }).as('search')
        })
        it('Garante que um termo é buscado clicando no Enter', () => {
          cy.get('input')
          .should('be.visible')
          .clear()
          .type(`${novoTermo}{enter}`)

          cy.wait('@search')
          .its('request.url')
          .should('include',`https://hn.algolia.com/api/v1/search?query=${novoTermo}&page=0&hitsPerPage=100`)
        })

        it('Garante que um termo é buscado clicando no Botão Search', () => {
          cy.get('input')
          .should('be.visible')
          .clear()
          .type(novoTermo)

          cy.get('form > button')
          .should('be.visible')
          .click()

          cy.wait('@search')
          .its('request.url')
          .should('include',`https://hn.algolia.com/api/v1/search?query=${novoTermo}&page=0&hitsPerPage=100`)
        })
      })
  })
    
  context('Mockando a API', () => {
    const stories = require('C:/Users/Tamires/OneDrive/Área de Trabalho/Portifolio/cypress/fixtures/stories')
    beforeEach(() => {
      cy.intercept({
        method: 'GET',
        pathname: '**/search',
        query: {
          query: termoInicial,
          page: '0'
        }
      },
        {fixture: 'empty'}
      ).as('empty')

      cy.intercept({
        method: 'GET',
        pathname: '**/search',
        query: {
          query: novoTermo,
          page: '0'
        }
      },
        {fixture: 'stories'}
      ).as('stories')

      cy.visit('https://hackernews-seven.vercel.app/')
      cy.wait('@empty')

      cy.get('input')
      .should('be.visible')
      .clear()
    })
    it('Verifica realmente está vazio', () => {
      cy.get('.table-row').should('not.exist')
    })

    it('Verifica se os dados vem corretamente', () => {
      cy.get('input')
      .should('be.visible')
      .clear()
      .type(`${novoTermo}{enter}`)

      cy.wait('@stories')

      cy.get('.table-row')
        .first()
        .should('be.visible')
        .and('contain', stories.hits[0].title)
        .and('contain', stories.hits[0].author)
        .and('contain', stories.hits[0].num_comments)
        .and('contain', stories.hits[0].points)
      cy.get(`.table-row a:contains(${stories.hits[0].title})`)
        .should('have.attr', 'href', stories.hits[0].url)

      cy.get('.table-row')
        .last()
        .should('contain', stories.hits[2].title)
        .and('contain', stories.hits[2].author)
        .and('contain', stories.hits[2].num_comments)
        .and('contain', stories.hits[2].points)
      cy.get(`.table-row a:contains(${stories.hits[2].title})`)
        .should('have.attr', 'href', stories.hits[2].url)
    })
    context('Ordernando', () => {
      beforeEach(()=>{
        cy.get('input')
        .should('be.visible')
        .clear()
        .type(`${novoTermo}{enter}`)

        cy.wait('@stories')
      })
      it('Ordendando por Titulo', () => {
        //Clicando uma vez
        cy.get('[style="width: 40%;"] > .button-inline')
        .should('be.visible')
        .click()

        cy.get('.table-row')
          .first()
          .should('be.visible')
          .and('contain', stories.hits[0].title)
          .and('contain', stories.hits[0].author)
          .and('contain', stories.hits[0].num_comments)
          .and('contain', stories.hits[0].points)
        cy.get(`.table-row a:contains(${stories.hits[0].title})`)
          .should('have.attr', 'href', stories.hits[0].url)

        cy.get('.table-row')
          .last()
          .should('contain', stories.hits[1].title)
          .and('contain', stories.hits[1].author)
          .and('contain', stories.hits[1].num_comments)
          .and('contain', stories.hits[1].points)
        cy.get(`.table-row a:contains(${stories.hits[1].title})`)
          .should('have.attr', 'href', stories.hits[1].url)

        //Clicando duas vezes
        cy.get('[style="width: 40%;"] > .button-inline')
          .should('be.visible')
          .click()

        cy.get('.table-row')
          .first()
          .should('be.visible')
          .and('contain', stories.hits[1].title)
          .and('contain', stories.hits[1].author)
          .and('contain', stories.hits[1].num_comments)
          .and('contain', stories.hits[1].points)
        cy.get(`.table-row a:contains(${stories.hits[1].title})`)
          .should('have.attr', 'href', stories.hits[1].url)

        cy.get('.table-row')
          .last()
          .should('contain', stories.hits[0].title)
          .and('contain', stories.hits[0].author)
          .and('contain', stories.hits[0].num_comments)
          .and('contain', stories.hits[0].points)
        cy.get(`.table-row a:contains(${stories.hits[0].title})`)
          .should('have.attr', 'href', stories.hits[0].url)
      })
      it('Ordendando por Autor', () => {
        //Clicando uma vez
        cy.get('[style="width: 30%;"] > .button-inline')
        .should('be.visible')
        .click()

        cy.get('.table-row')
          .first()
          .should('be.visible')
          .and('contain', stories.hits[1].title)
          .and('contain', stories.hits[1].author)
          .and('contain', stories.hits[1].num_comments)
          .and('contain', stories.hits[1].points)
        cy.get(`.table-row a:contains(${stories.hits[1].title})`)
          .should('have.attr', 'href', stories.hits[1].url)

        cy.get('.table-row')
          .last()
          .should('contain', stories.hits[2].title)
          .and('contain', stories.hits[2].author)
          .and('contain', stories.hits[2].num_comments)
          .and('contain', stories.hits[2].points)
        cy.get(`.table-row a:contains(${stories.hits[2].title})`)
          .should('have.attr', 'href', stories.hits[2].url)

        //Clicando duas vezes
        cy.get('[style="width: 30%;"] > .button-inline')
          .should('be.visible')
          .click()

        cy.get('.table-row')
          .first()
          .should('be.visible')
          .and('contain', stories.hits[2].title)
          .and('contain', stories.hits[2].author)
          .and('contain', stories.hits[2].num_comments)
          .and('contain', stories.hits[2].points)
        cy.get(`.table-row a:contains(${stories.hits[2].title})`)
          .should('have.attr', 'href', stories.hits[2].url)

        cy.get('.table-row')
          .last()
          .should('contain', stories.hits[1].title)
          .and('contain', stories.hits[1].author)
          .and('contain', stories.hits[1].num_comments)
          .and('contain', stories.hits[1].points)
        cy.get(`.table-row a:contains(${stories.hits[1].title})`)
          .should('have.attr', 'href', stories.hits[1].url)
      })

      it('Ordendando por Comentarios', () => {
        //Clicando uma vez
        cy.get(':nth-child(3) > .button-inline')
          .should('be.visible')
          .click()

        cy.get('.table-row')
          .first()
          .should('be.visible')
          .and('contain', stories.hits[1].title)
          .and('contain', stories.hits[1].author)
          .and('contain', stories.hits[1].num_comments)
          .and('contain', stories.hits[1].points)
        cy.get(`.table-row a:contains(${stories.hits[1].title})`)
          .should('have.attr', 'href', stories.hits[1].url)

        cy.get('.table-row')
          .last()
          .should('contain', stories.hits[0].title)
          .and('contain', stories.hits[0].author)
          .and('contain', stories.hits[0].num_comments)
          .and('contain', stories.hits[0].points)
        cy.get(`.table-row a:contains(${stories.hits[0].title})`)
          .should('have.attr', 'href', stories.hits[0].url)
        //Clicando duas vezes
        cy.get(':nth-child(3) > .button-inline')
        .should('be.visible')
        .click()

        cy.get('.table-row')
          .first()
          .should('be.visible')
          .and('contain', stories.hits[0].title)
          .and('contain', stories.hits[0].author)
          .and('contain', stories.hits[0].num_comments)
          .and('contain', stories.hits[0].points)
        cy.get(`.table-row a:contains(${stories.hits[0].title})`)
          .should('have.attr', 'href', stories.hits[0].url)

        cy.get('.table-row')
          .last()
          .should('contain', stories.hits[1].title)
          .and('contain', stories.hits[1].author)
          .and('contain', stories.hits[1].num_comments)
          .and('contain', stories.hits[1].points)
        cy.get(`.table-row a:contains(${stories.hits[1].title})`)
          .should('have.attr', 'href', stories.hits[1].url)
      })
      it('Ordendando por Pontos', () => {
        //Clicando uma vez
        cy.get(':nth-child(4) > .button-inline')
          .should('be.visible')
          .click()

        cy.get('.table-row')
          .first()
          .should('be.visible')
          .and('contain', stories.hits[2].title)
          .and('contain', stories.hits[2].author)
          .and('contain', stories.hits[2].num_comments)
          .and('contain', stories.hits[2].points)
        cy.get(`.table-row a:contains(${stories.hits[2].title})`)
          .should('have.attr', 'href', stories.hits[2].url)

        cy.get('.table-row')
          .last()
          .should('contain', stories.hits[1].title)
          .and('contain', stories.hits[1].author)
          .and('contain', stories.hits[1].num_comments)
          .and('contain', stories.hits[1].points)
        cy.get(`.table-row a:contains(${stories.hits[1].title})`)
          .should('have.attr', 'href', stories.hits[1].url)
        //Clicando duas vezes
        cy.get(':nth-child(4) > .button-inline')
        .should('be.visible')
        .click()

        cy.get('.table-row')
          .first()
          .should('be.visible')
          .and('contain', stories.hits[1].title)
          .and('contain', stories.hits[1].author)
          .and('contain', stories.hits[1].num_comments)
          .and('contain', stories.hits[1].points)
        cy.get(`.table-row a:contains(${stories.hits[1].title})`)
          .should('have.attr', 'href', stories.hits[1].url)

        cy.get('.table-row')
          .last()
          .should('contain', stories.hits[2].title)
          .and('contain', stories.hits[2].author)
          .and('contain', stories.hits[2].num_comments)
          .and('contain', stories.hits[2].points)
        cy.get(`.table-row a:contains(${stories.hits[2].title})`)
          .should('have.attr', 'href', stories.hits[2].url)
      })
    })
    it('Pegando corretamente o cache', () => {
      const faker = require('faker');
      const randomWord = faker.lorem.word()
      let count = 0

      cy.intercept(`**/search?query=${randomWord}**`, req => {
        count +=1
        req.reply({fixture: 'empty'})
      }).as('random')
  
      cy.search(randomWord).then(() => {
        expect(count, `network calls to fetch ${randomWord}`).to.equal(1)
  
        cy.wait('@random')
  
        cy.search(novoTermo)
        cy.wait('@stories')
  
        cy.search(randomWord).then(() => {
          expect(count, `network calls to fetch ${randomWord}`).to.equal(1)
        })
      })
    })
  })
  context('Erros e Delays', () => {
    it('Verifica a mensagem de "Loading"', () =>{
      cy.intercept({
        method: 'GET',
        pathname: '**/search',
        query: {
          query: termoInicial,
          page: '0'
        }
      },
        { delay:1000,
          fixture: 'stories'}
      ).as('storiesDelay')

       cy.visit("https://hackernews-seven.vercel.app/") 
       cy.contains('Loading ...').should('be.visible') 
       cy.wait('@storiesDelay') 
       cy.get('.table-row').should('have.length', 3)
    })
    it('Verifica a mensagem ao dar 500 na requisição', () =>{
      cy.intercept('GET', '**/search**',
      { statusCode: 500 }
      ).as('serverError')

      cy.visit("https://hackernews-seven.vercel.app/")
      cy.wait('@serverError')

      cy.contains("Something went wrong.").should('be.visible')
    })
  })
      
})