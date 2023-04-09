const Employee = require("../lib/Employee")

    describe('Constructor', () =>{
        it('New employee objects should have a name, id, and an email', () => {
            const newEmployee = new Employee("Tony", 1, "tony@employee.com")
            expect(newEmployee.name).toBe("Tony")
            expect(newEmployee.id).toBe(1)
            expect(newEmployee.email).toBe("tony@employee.com")
        })
    })

    describe('getRole', () => {
        it('getRole should return the role "Employee"', () => {
            const newEmployee = new Employee("Tony", 1, "tony@employee.com")
            expect(newEmployee.getRole()).toBe("Employee")
        })
    })