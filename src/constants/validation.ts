export const ID_REGEX = /^[a-zA-Z0-9]{5,20}$/; // 영문 + 숫자만 허용 (5~20자)

export const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
//8~16자, 영문 + 숫자 + 특수문자 포함

export const NICKNAME_REGEX = /^[A-Za-z가-힣0-9]{2,7}$/; // 영문 + 한글 + 숫자만 허용 2~7자 가능

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일
