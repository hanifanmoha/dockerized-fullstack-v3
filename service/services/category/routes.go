package category

import (
	"net/http"
	"service/types"
	"service/utils"
	"strconv"
)

type Handler struct {
	store types.CategoryStore
}

func NewHandler(store types.CategoryStore) *Handler {
	return &Handler{store: store}
}

func (h *Handler) RegisterRoutes(router *http.ServeMux) {
	router.HandleFunc("GET /categories", h.getAllCategories)
	router.HandleFunc("GET /categories/{categoryID}", h.getCategoryByID)
	router.HandleFunc("POST /categories", h.createCategory)
	router.HandleFunc("PUT /categories/{categoryID}", h.updateCategory)
	router.HandleFunc("DELETE /categories/{categoryID}", h.deleteCategory)
}

func (h *Handler) getAllCategories(w http.ResponseWriter, r *http.Request) {
	categories, err := h.store.GetAll()
	if err != nil {
		utils.NewErrorResponse(w, http.StatusInternalServerError, "failed to get categories", err.Error())
		return
	}
	utils.NewSuccessResponse(w, http.StatusOK, "success", categories)
}

func (h *Handler) getCategoryByID(w http.ResponseWriter, r *http.Request) {
	categoryIDStr := r.PathValue("categoryID")
	categoryID, err := strconv.Atoi(categoryIDStr)
	if err != nil {
		utils.NewErrorResponse(w, http.StatusBadRequest, "invalid category ID", err.Error())
		return
	}
	category, err := h.store.GetByID(categoryID)
	if err != nil {
		utils.NewErrorResponse(w, http.StatusInternalServerError, "failed to get category", err.Error())
		return
	}
	utils.NewSuccessResponse(w, http.StatusOK, "success", category)
}

func (h *Handler) createCategory(w http.ResponseWriter, r *http.Request) {
	var payload types.CreateCategoryPayload
	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.NewErrorResponse(w, http.StatusBadRequest, "failed to parse request body", err.Error())
		return
	}

	if err := utils.Validate.Struct(payload); err != nil {
		utils.NewErrorResponse(w, http.StatusBadRequest, "invalid request body", err.Error())
		return
	}

	category := payload.Transform()
	newCategory, err := h.store.Create(category)
	if err != nil {
		utils.NewErrorResponse(w, http.StatusInternalServerError, "failed to create category", err.Error())
		return
	}
	utils.NewSuccessResponse(w, http.StatusCreated, "success", newCategory)
}

func (h *Handler) updateCategory(w http.ResponseWriter, r *http.Request) {
	categoryIDStr := r.PathValue("categoryID")
	categoryID, err := strconv.Atoi(categoryIDStr)
	if err != nil {
		utils.NewErrorResponse(w, http.StatusBadRequest, "invalid category ID", err.Error())
		return
	}

	var payload types.CreateCategoryPayload
	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.NewErrorResponse(w, http.StatusBadRequest, "failed to parse request body", err.Error())
		return
	}

	if err := utils.Validate.Struct(payload); err != nil {
		utils.NewErrorResponse(w, http.StatusBadRequest, "invalid request body", err.Error())
		return
	}

	category := payload.Transform()
	category.ID = categoryID
	updatedCategory, err := h.store.Update(category)
	if err != nil {
		utils.NewErrorResponse(w, http.StatusInternalServerError, "failed to update category", err.Error())
		return
	}
	utils.NewSuccessResponse(w, http.StatusOK, "success", updatedCategory)
}

func (h *Handler) deleteCategory(w http.ResponseWriter, r *http.Request) {
	categoryIDStr := r.PathValue("categoryID")
	categoryID, err := strconv.Atoi(categoryIDStr)
	if err != nil {
		utils.NewErrorResponse(w, http.StatusBadRequest, "invalid category ID", err.Error())
		return
	}
	if err := h.store.Delete(categoryID); err != nil {
		utils.NewErrorResponse(w, http.StatusInternalServerError, "failed to delete category", err.Error())
		return
	}
	utils.NewSuccessResponse(w, http.StatusOK, "success", nil)
}
