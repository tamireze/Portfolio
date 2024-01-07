describe('DELETE/ tasks/:id', () => {
    beforeEach(function () {
        cy.fixture('tasks/delete').then(function (tasks) {
            this.tasks = tasks
        })
    })
    it('remove a task', function () {
        const { user, task } = this.tasks.remove

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
                        cy.deleteTask(taskResp.body._id, responseUser.body.token)
                            .then(response => {
                                expect(response.status).to.eq(404)
                            })
                    })
            })
    })
})

