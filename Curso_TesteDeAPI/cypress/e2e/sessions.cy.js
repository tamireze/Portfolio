describe('POST/ session', () => {
    beforeEach(function () {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
    })

    it('user session', function () {
        const userData = this.users.login

        cy.task('removeUser', userData.email)
        cy.postUser(userData)

        cy.loginUser(userData)
            .then(response => {
                expect(response.status).to.eq(200)

                const { user, token } = response.body

                expect(user.name).to.eq(userData.name)
                expect(user.email).to.eq(userData.email)
                expect(token).not.to.be.empty
            })
    })
    it('user session unauthorized password', function () {
        const user = this.users.inv_pass

        cy.loginUser(user)
            .then(response => {
                expect(response.status).to.eq(401)
            })
    })
    it('user session unauthorized email', function () {
        const user = this.users.email_404

        cy.loginUser(user)
            .then(response => {
                expect(response.status).to.eq(401)
            })
    })
})