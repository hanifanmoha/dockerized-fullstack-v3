package menu

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

func (s *Store) GetAll(pagination types.PaginationRequest) ([]types.Menu, types.PaginationMeta, error) {
	var menus []types.Menu

	q := s.db.Model(&types.Menu{})

	var count int64

	if err := q.Count(&count).Error; err != nil {
		return nil, types.PaginationMeta{}, err
	}

	paginationMeta := types.PaginationMeta{
		Total: count,
		Limit: pagination.Limit,
	}

	err := q.
		Preload("Category").
		Order("id").Offset((pagination.Page - 1) * pagination.Limit).
		Limit(pagination.Limit).
		Find(&menus).
		Error

	return menus, paginationMeta, err
}

func (s *Store) GetByID(id int) (types.Menu, error) {
	var menu types.Menu
	err := s.db.Preload("Category").First(&menu, id).Error
	return menu, err
}

func (s *Store) Create(menu types.Menu) (types.Menu, error) {
	err := s.db.Create(&menu).Error
	return menu, err
}

func (s *Store) Update(menu types.Menu) (types.Menu, error) {
	err := s.db.Save(&menu).Error
	return menu, err
}

func (s *Store) Delete(id int) error {
	return s.db.Delete(&types.Menu{}, id).Error
}
