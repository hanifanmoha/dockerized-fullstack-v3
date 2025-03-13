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

func (s *Store) GetAll(pagination types.PaginationRequest) ([]types.Category, types.PaginationMeta, error) {
	var categories []types.Category

	q := s.db.Model(&types.Category{})

	var count int64

	if err := q.Count(&count).Error; err != nil {
		return nil, types.PaginationMeta{}, err
	}

	paginationMeta := types.PaginationMeta{
		Total: count,
		Limit: pagination.Limit,
	}

	err := q.
		Order("id").
		Offset((pagination.Page - 1) * pagination.Limit).
		Limit(pagination.Limit).
		Find(&categories).
		Error

	return categories, paginationMeta, err
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
