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

func (s *Store) GetAll() ([]types.Menu, error) {
	var menus []types.Menu
	err := s.db.Find(&menus).Error
	return menus, err
}

func (s *Store) GetByID(id int) (types.Menu, error) {
	var menu types.Menu
	err := s.db.First(&menu, id).Error
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
