package com.recharge.kishore.service;

import com.recharge.kishore.dto.BasicResponse;
import com.recharge.kishore.dto.UserResponse;

public interface UserService {

    BasicResponse<UserResponse> getAllUser();
    
}
