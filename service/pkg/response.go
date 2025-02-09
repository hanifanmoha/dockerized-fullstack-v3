package pkg

import (
	"encoding/json"
	"net/http"
)

type Response struct {
	Status  bool        `json:"status"`
	Message string      `json:"message"`
	Error   string      `json:"error"`
	Data    interface{} `json:"data"`
}

func NewResponse(status bool, message string, error string, data interface{}) *Response {
	return &Response{
		Status:  status,
		Message: message,
		Error:   error,
		Data:    data,
	}
}

func NewSuccessResponse(w http.ResponseWriter, message string, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	response := NewResponse(true, message, "", data)
	json.NewEncoder(w).Encode(response)
}

func NewErrorResponse(w http.ResponseWriter, message string, error string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusInternalServerError)

	response := NewResponse(false, message, error, nil)
	json.NewEncoder(w).Encode(response)
}
