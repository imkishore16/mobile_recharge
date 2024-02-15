package com.recharge.kishore.service;

import com.recharge.kishore.dto.LoginRequest;
import com.recharge.kishore.dto.LoginResponse;
import com.recharge.kishore.dto.RegisterRequest;
import com.recharge.kishore.dto.RegisterResponse;

public interface AuthService {

    RegisterResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);
    
}
