package pkg

import (
	"encoding/json"
	"net/http"
)

type Response struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Error   string      `json:"error"`
	Data    interface{} `json:"data"`
}

func NewResponse(success bool, message string, error string, data interface{}) *Response {
	return &Response{
		Success: success,
		Message: message,
		Error:   error,
		Data:    data,
	}
}

func setDefaultHeaders(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Content-Type", "application/json")
}

func NewSuccessResponse(w http.ResponseWriter, message string, data interface{}) {
	setDefaultHeaders(&w)
	w.WriteHeader(http.StatusOK)

	response := NewResponse(true, message, "", data)
	json.NewEncoder(w).Encode(response)
}

func NewErrorResponse(w http.ResponseWriter, message string, error string) {
	setDefaultHeaders(&w)
	w.WriteHeader(http.StatusInternalServerError)

	response := NewResponse(false, message, error, nil)
	json.NewEncoder(w).Encode(response)
}
