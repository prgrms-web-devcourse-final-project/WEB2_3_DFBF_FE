export const ID_ALLOWED_CHARACTERS = /^[a-zA-Z0-9]+$/; // 영문 + 숫자만 허용

export const PASSWORD_REQUIRED_RULES = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
// 영문 + 숫자 + 특수문자 포함 필수
