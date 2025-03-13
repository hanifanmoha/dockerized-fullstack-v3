package types

type CategoryStore interface {
	GetAll(pagination PaginationRequest) ([]Category, PaginationMeta, error)
	GetByID(id int) (Category, error)
	Create(category Category) (Category, error)
	Update(category Category) (Category, error)
	Delete(id int) error
}

type MenuStore interface {
	GetAll(pagination PaginationRequest) ([]Menu, PaginationMeta, error)
	GetByID(id int) (Menu, error)
	Create(menu Menu) (Menu, error)
	Update(menu Menu) (Menu, error)
	Delete(id int) error
}
