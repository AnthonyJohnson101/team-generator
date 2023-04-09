const Manager = require("../lib/Manager")

describe('Constructor', () =>{
    it('New Manager objects should have a name, id, and an email, and an office number', () => {
        const newManager = new Manager("Tony", 1, "tony@manager.com", 1)
        expect(newManager.name).toBe("Tony")
        expect(newManager.id).toBe(1)
        expect(newManager.email).toBe("tony@manager.com")
        expect(newManager.officeNum).toBe(1)
    })
})

describe('getRole', () => {
    it('getRole should return the role "Manager"', () => {
        const newManager = new Manager("Tony", 1, "tony@manager.com", 1)
        expect(newManager.getRole()).toBe("Manager")
    })
})