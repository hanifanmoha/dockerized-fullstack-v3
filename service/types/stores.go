package types

type CategoryStore interface {
	GetAll() ([]Category, error)
	GetByID(id int) (Category, error)
	Create(category Category) (Category, error)
	Update(category Category) (Category, error)
	Delete(id int) error
}

type MenuStore interface {
	GetAll() ([]Menu, error)
	GetByID(id int) (Menu, error)
	Create(menu Menu) (Menu, error)
	Update(menu Menu) (Menu, error)
	Delete(id int) error
}
