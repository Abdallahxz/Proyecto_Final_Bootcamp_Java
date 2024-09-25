package com.example.userauthapi.config;

public class ApiResponse {
    private boolean success;
    private String message;
    private int errorCode;  // يمكن استخدامه لتحديد أنواع الأخطاء المختلفة

    // Constructors
    public ApiResponse(boolean success, String message, int errorCode) {
        this.success = success;
        this.message = message;
        this.errorCode = errorCode;
    }

    // Getters and setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }
}
