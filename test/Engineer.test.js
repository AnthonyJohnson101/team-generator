const Engineer = require("../lib/Engineer")

describe('Constructor', () =>{
    it('New engineer objects should have a name, id, and an email, and a github username', () => {
        const newEngineer = new Engineer("Tony", 1, "tony@engineer.com", "tonyj")
        expect(newEngineer.name).toBe("Tony")
        expect(newEngineer.id).toBe(1)
        expect(newEngineer.email).toBe("tony@engineer.com")
        expect(newEngineer.github).toBe("tonyj")
    })
})

describe('getRole', () => {
    it('getRole should return the role "Engineer"', () => {
        const newEngineer = new Engineer("Tony", 1, "tony@engineer.com", "tonyj")
        expect(newEngineer.getRole()).toBe("Engineer")
    })
})

describe('getGithub', () => {
    it("getGithub should return the Engineer's github username", () => {
        const newEngineer = new Engineer("Tony", 1, "tony@engineer.com", "tonyj")
        expect(newEngineer.getGithub()).toBe("tonyj")
    })
})