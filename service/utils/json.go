package utils

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type GeneralResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Error   string      `json:"error"`
	Data    interface{} `json:"data"`
	Meta    interface{} `json:"meta,omitempty"`
}

func NewResponse(success bool, message string, error string, data interface{}, meta interface{}) *GeneralResponse {
	return &GeneralResponse{
		Success: success,
		Message: message,
		Error:   error,
		Data:    data,
		Meta:    meta,
	}
}

func setDefaultHeaders(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Content-Type", "application/json")
}

func NewSuccessResponse(w http.ResponseWriter, status int, message string, data interface{}, meta interface{}) {
	setDefaultHeaders(&w)
	w.WriteHeader(status)

	response := NewResponse(true, message, "", data, meta)
	json.NewEncoder(w).Encode(response)
}

func NewErrorResponse(w http.ResponseWriter, status int, message string, error string) {
	setDefaultHeaders(&w)
	w.WriteHeader(status)

	response := NewResponse(false, message, error, nil, nil)
	json.NewEncoder(w).Encode(response)
}

func ParseJSON(r *http.Request, v any) error {
	if r.Body == nil {
		return fmt.Errorf("missing request body")
	}

	return json.NewDecoder(r.Body).Decode(v)
}
