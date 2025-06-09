package structs

type Person struct {
	firstName string
	lastName  string
}

func NewPerson(firstname, lastname string) Person {
	return Person{
		firstname,
		lastname,
	}
}

func (p Person) Walk() string {
	return p.firstName + p.lastName + " likes walking"
}

func (p *Person) SetFirstName(val string) {
	p.firstName = val
}
