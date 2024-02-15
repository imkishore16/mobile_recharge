package com.recharge.kishore.serviceImpl;

import org.springframework.stereotype.Service;

import com.recharge.kishore.dto.BasicResponse;
import com.recharge.kishore.dto.UserResponse;
import com.recharge.kishore.model.User;
import com.recharge.kishore.repository.UserRepository;
import com.recharge.kishore.service.UserService;

import lombok.RequiredArgsConstructor;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public BasicResponse<UserResponse> getAllUser() {
        List<User> users=userRepository.findAll();
        List<UserResponse> userResponses =
        users.stream().map(user -> UserResponse.builder()
        .id(user.getId())
        .username(user.getUsername())
        .email(user.getEmail())
        .build())
        .collect(Collectors.toList());



        return BasicResponse.<UserResponse>builder()
        .message("User data fetcher successfully")
        .data(userResponses)
        .build();
    }

}
