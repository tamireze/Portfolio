describe('GET/ tasks', () => {
    beforeEach(function () {
        cy.fixture('tasks/get').then(function (tasks) {
            this.tasks = tasks
        })
    })
    it('get my tasks', function () {
        const { user, tasks } = this.tasks.list

        cy.task('removeTasksLike', 'Estud4r')
        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.loginUser(user)
            .then(responseUser => {

                tasks.forEach(function (t) {
                    cy.postTask(t, responseUser.body.token)
                })
                cy.getTasks(responseUser.body.token)
                    .then(response => {
                        expect(response.status).to.eq(200)
                    }).its('body')
                    .should('be.an', 'array')
                    .should('have.length', tasks.length)
            })
    })
})
describe('GET/ tasks/:id', () => {
    beforeEach(function () {
        cy.fixture('tasks/get').then(function (tasks) {
            this.tasks = tasks
        })
    })
    it('get unique task', function () {
        const { user, task } = this.tasks.unique

        cy.task('removeTask', task.name, user.email)
        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.loginUser(user)
            .then(responseUser => {
                cy.postTask(task, responseUser.body.token)
                    .then(taskResp => {
                        cy.getUniqueTask(taskResp.body._id, responseUser.body.token)
                            .then(response => {
                                expect(response.status).to.eq(200)
                            })
                    })
            })
    })
    it('task not found', function () {
        const { user, task } = this.tasks.notFound

        cy.task('removeTask', task.name, user.email)
        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.loginUser(user)
            .then(responseUser => {
                cy.postTask(task, responseUser.body.token)
                    .then(taskResp => {
                        cy.deleteTask(taskResp.body._id, responseUser.body.token)
                            .then(response => {
                                expect(response.status).to.eq(204)
                            })
                        cy.getUniqueTask(taskResp.body._id, responseUser.body.token)
                            .then(response => {
                                expect(response.status).to.eq(404)
                            })
                    })
            })
    })
})

