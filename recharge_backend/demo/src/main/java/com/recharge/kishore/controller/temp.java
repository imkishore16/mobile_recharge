package com.recharge.kishore.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recharge.kishore.dto.BasicResponse;
import com.recharge.kishore.dto.DashboardResponse;
import com.recharge.kishore.dto.PlanResponse;
import com.recharge.kishore.model.Addon;
import com.recharge.kishore.model.Customer;
import com.recharge.kishore.model.Payment;
import com.recharge.kishore.model.Plan;
import com.recharge.kishore.model.Recharge;
import com.recharge.kishore.model.User;
import com.recharge.kishore.repository.AddonRepository;
import com.recharge.kishore.repository.CustomerRepository;
import com.recharge.kishore.repository.PaymentRepository;
import com.recharge.kishore.repository.PlanRepository;
import com.recharge.kishore.repository.RechargeRepository;
import com.recharge.kishore.repository.UserRepository;
import com.recharge.kishore.serviceImpl.ServiceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.*;

@RestController
@RequestMapping("/temp")
// @RequiredArgsConstructor
public class temp {
    
    
    private  UserRepository userRepository;
    private  AddonRepository addonsRepository;
    private  CustomerRepository customerRepository;
    private  PlanRepository planRepository;
    private  PaymentRepository paymentRepository;
    private RechargeRepository rechargeRepository;
    private ServiceImpl serviceImpl;

    @Autowired
    public temp(UserRepository userRepository, AddonRepository addonsRepository,
                                CustomerRepository customerRepository, PlanRepository planRepository,
                                PaymentRepository paymentRepository, RechargeRepository rechargeRepository,
                                ServiceImpl serviceImpl) {
        this.userRepository = userRepository;
        this.addonsRepository = addonsRepository;
        this.customerRepository = customerRepository;
        this.planRepository = planRepository;
        this.paymentRepository = paymentRepository;
        this.rechargeRepository = rechargeRepository;
        this.serviceImpl = serviceImpl;
    }

    @GetMapping("/test")
    public Recharge UserTest()
    {
        Payment payment = new Payment();
        Recharge recharge= new Recharge();
        // paymentRepository.save(payment);
        rechargeRepository.save(recharge);
    	return recharge;
    }

    @GetMapping("/dashboard/data")
    public ResponseEntity<DashboardResponse> dashboard() {
        try {
            DashboardResponse dashboardData = serviceImpl.getDashboardData(); // Call the method to get dashboard data
            return ResponseEntity.ok(dashboardData); // Return the dashboard data with HTTP status 200 (OK)
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build(); // Return HTTP status 417 (EXPECTATION_FAILED) in case of error
        }
    }
}