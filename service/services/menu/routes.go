package menu

import (
	"net/http"
	"service/types"
	"service/utils"
	"strconv"
)

type Handler struct {
	store types.MenuStore
}

func NewHandler(store types.MenuStore) *Handler {
	return &Handler{store: store}
}

func (h *Handler) RegisterRoutes(router *http.ServeMux) {
	router.HandleFunc("GET /menus", h.getAllMenus)
	router.HandleFunc("GET /menus/{menuID}", h.getMenuByID)
	router.HandleFunc("POST /menus", h.createMenu)
	router.HandleFunc("PUT /menus/{menuID}", h.updateMenu)
	router.HandleFunc("DELETE /menus/{menuID}", h.deleteMenu)
}

func (h *Handler) getAllMenus(w http.ResponseWriter, r *http.Request) {
	menus, err := h.store.GetAll()
	if err != nil {
		utils.NewErrorResponse(w, http.StatusInternalServerError, "failed to get menus", err.Error())
		return
	}
	utils.NewSuccessResponse(w, http.StatusOK, "success 2", menus)
}

func (h *Handler) getMenuByID(w http.ResponseWriter, r *http.Request) {
	menuIDStr := r.PathValue("menuID")
	menuID, err := strconv.Atoi(menuIDStr)
	if err != nil {
		utils.NewErrorResponse(w, http.StatusBadRequest, "invalid menu ID", err.Error())
		return
	}
	menu, err := h.store.GetByID(menuID)
	if err != nil {
		utils.NewErrorResponse(w, http.StatusInternalServerError, "failed to get menu", err.Error())
		return
	}
	utils.NewSuccessResponse(w, http.StatusOK, "success", menu)
}

func (h *Handler) createMenu(w http.ResponseWriter, r *http.Request) {
	var payload types.CreateMenuPayload
	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.NewErrorResponse(w, http.StatusBadRequest, "failed to parse request body", err.Error())
		return
	}

	if err := utils.Validate.Struct(payload); err != nil {
		utils.NewErrorResponse(w, http.StatusBadRequest, "invalid request body", err.Error())
		return
	}

	menu := payload.Transform()
	newMenu, err := h.store.Create(menu)
	if err != nil {
		utils.NewErrorResponse(w, http.StatusInternalServerError, "failed to create menu", err.Error())
		return
	}
	utils.NewSuccessResponse(w, http.StatusCreated, "success", newMenu)
}

func (h *Handler) updateMenu(w http.ResponseWriter, r *http.Request) {
	menuIDStr := r.PathValue("menuID")
	menuID, err := strconv.Atoi(menuIDStr)
	if err != nil {
		utils.NewErrorResponse(w, http.StatusBadRequest, "invalid menu ID", err.Error())
		return
	}

	var payload types.CreateMenuPayload
	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.NewErrorResponse(w, http.StatusBadRequest, "failed to parse request body", err.Error())
		return
	}

	if err := utils.Validate.Struct(payload); err != nil {
		utils.NewErrorResponse(w, http.StatusBadRequest, "invalid request body", err.Error())
		return
	}

	menu := payload.Transform()
	menu.ID = menuID
	updatedMenu, err := h.store.Update(menu)
	if err != nil {
		utils.NewErrorResponse(w, http.StatusInternalServerError, "failed to update menu", err.Error())
		return
	}
	utils.NewSuccessResponse(w, http.StatusOK, "success", updatedMenu)
}

func (h *Handler) deleteMenu(w http.ResponseWriter, r *http.Request) {
	menuIDStr := r.PathValue("menuID")
	menuID, err := strconv.Atoi(menuIDStr)
	if err != nil {
		utils.NewErrorResponse(w, http.StatusBadRequest, "invalid menu ID", err.Error())
		return
	}
	err = h.store.Delete(menuID)
	if err != nil {
		utils.NewErrorResponse(w, http.StatusInternalServerError, "failed to delete menu", err.Error())
		return
	}
	utils.NewSuccessResponse(w, http.StatusOK, "success", nil)
}
