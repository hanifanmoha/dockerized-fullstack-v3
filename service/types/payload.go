package types

type CreateCategoryPayload struct {
	Name string `json:"name" validate:"required,min=3"`
}

func (p CreateCategoryPayload) Transform() Category {
	return Category{
		Name: p.Name,
	}
}

type CreateMenuPayload struct {
	Name        string  `json:"name" validate:"required,min=3"`
	Description string  `json:"description" validate:"required,min=3"`
	Price       float64 `json:"price" validate:"required"`
	CategoryID  int     `json:"category_id" validate:"required"`
}

func (p CreateMenuPayload) Transform() Menu {
	return Menu{
		Name:        p.Name,
		Description: p.Description,
		Price:       p.Price,
		CategoryID:  p.CategoryID,
	}
}
