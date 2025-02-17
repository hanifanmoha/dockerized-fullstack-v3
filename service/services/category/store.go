package category

import (
	"service/types"

	"gorm.io/gorm"
)

type Store struct {
	db *gorm.DB
}

func NewStore(db *gorm.DB) *Store {
	return &Store{db: db}
}

func (s *Store) GetAll() ([]types.Category, error) {
	var categories []types.Category
	err := s.db.Find(&categories).Error
	return categories, err
}

func (s *Store) GetByID(id int) (types.Category, error) {
	var category types.Category
	err := s.db.First(&category, id).Error
	return category, err
}

func (s *Store) Create(category types.Category) (types.Category, error) {
	err := s.db.Create(&category).Error
	return category, err
}

func (s *Store) Update(category types.Category) (types.Category, error) {
	err := s.db.Save(&category).Error
	return category, err
}

func (s *Store) Delete(id int) error {
	return s.db.Delete(&types.Category{}, id).Error
}
