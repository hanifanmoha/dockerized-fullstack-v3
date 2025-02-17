package types

type Category struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Menu struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	CategoryID  int     `json:"category_id"`

	Category Category `json:"category"`
}
