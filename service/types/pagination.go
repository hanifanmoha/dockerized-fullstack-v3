package types

import (
	"net/http"
	"strconv"
)

type PaginationRequest struct {
	Page  int `json:"page"`
	Limit int `json:"limit"`
}

type PaginationMeta struct {
	Total int64 `json:"total"`
	Limit int   `json:"limit"`
}

func ParsePaginationRequest(r *http.Request) (PaginationRequest, error) {
	pageStr := r.URL.Query().Get("page")
	if pageStr == "" {
		pageStr = "1"
	}
	limitStr := r.URL.Query().Get("limit")
	if limitStr == "" {
		limitStr = "10"
	}
	page, err := strconv.Atoi(pageStr)
	if err != nil {
		return PaginationRequest{}, err
	}
	limit, err := strconv.Atoi(limitStr)
	if err != nil {
		return PaginationRequest{}, err
	}
	return PaginationRequest{Page: page, Limit: limit}, nil
}
