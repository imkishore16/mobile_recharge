package com.recharge.kishore.serviceImpl;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recharge.kishore.dto.BasicResponse;
import com.recharge.kishore.dto.DashboardResponse;
import com.recharge.kishore.dto.PlanResponse;
import com.recharge.kishore.dto.UserResponse;
import com.recharge.kishore.model.Addon;
import com.recharge.kishore.model.Customer;
import com.recharge.kishore.model.Plan;
import com.recharge.kishore.model.User;
import com.recharge.kishore.repository.AddonRepository;
import com.recharge.kishore.repository.CustomerRepository;
import com.recharge.kishore.repository.PlanRepository;
import com.recharge.kishore.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.*;

@RequiredArgsConstructor
@Service
public class ServiceImpl {
    @Autowired
    private final PlanRepository planRepository;
    private  AddonRepository addonsRepository;
    private  CustomerRepository customerRepository;
    
    @Autowired
    public ServiceImpl(PlanRepository planRepository, AddonRepository addonsRepository,
                                CustomerRepository customerRepository) {
        this.planRepository = planRepository;
        this.addonsRepository = addonsRepository;
        this.customerRepository = customerRepository;
    }

    public BasicResponse<PlanResponse> getPlans() {
        List<Plan> plans = planRepository.findAll();
        List<PlanResponse> planResponses = plans.stream().map(plan ->
            PlanResponse.builder()
                .planId(plan.getPlanId())
                .planType(plan.getPlanType())
                .planName(plan.getPlanName())
                .planDetails(plan.getPlanDetails())
                .planPrice(plan.getPlanPrice())
                .planValidity(plan.getPlanValidity())
                .build())
            .collect(Collectors.toList());
    
        return BasicResponse.<PlanResponse>builder()
            .message("Plans data fetched successfully")
            .data(planResponses)
            .build();
    }
    // public BasicResponse<PlanResponse> getDashbordData() {
    //     List<Customer> usersList = customerRepository.findAll();
    //     Integer users = usersList.size();

    //     List<Plan> plansList = planRepository.findAll();
    //     Integer plans = plansList.size();

    //     List<Addon> addonsList = addonsRepository.findAll();
    //     Integer addons = addonsList.size();

    //     Integer revenue = 9892;
    //     DashboardResponse dashboardData = new DashboardResponse();
    //     dashboardData.setAddons(addons);
    //     dashboardData.setPlans(plans);
    //     dashboardData.setRevenue(revenue);
    //     dashboardData.setUsers(users);
    //     List<DashboardResponse> responses=new ArrayList<>();
    //     responses.add(dashboardData);
    //     List<DashboardResponse> dashboardResponses = responses.stream().map(plan ->
    //         PlanResponse.builder()
    //             .planId(plan.getPlanId())
    //             .planType(plan.getPlanType())
    //             .planName(plan.getPlanName())
    //             .planDetails(plan.getPlanDetails())
    //             .planPrice(plan.getPlanPrice())
    //             .planValidity(plan.getPlanValidity())
    //             .build())
    //         .collect(Collectors.toList());
    
    //     return BasicResponse.<PlanResponse>builder()
    //         .message("Plans data fetched successfully")
    //         .data(planResponses)
    //         .build();
    // }

    // public BasicResponse<DashboardResponse> getDashboardData() {
    //     List<Customer> usersList = customerRepository.findAll();
    //     Integer users = usersList.size();
    
    //     List<Plan> plansList = planRepository.findAll();
    //     Integer plans = plansList.size();
    
    //     List<Addon> addonsList = addonsRepository.findAll();
    //     Integer addons = addonsList.size();
    
    //     Integer revenue = 9892;
        
    //     DashboardResponse dashboardData = DashboardResponse.builder()
    //         .users(users)
    //         .plans(plans)
    //         .addons(addons)
    //         .revenue(revenue)
    //         .build();
    
    //     return BasicResponse.<DashboardResponse>builder()
    //         .message("Dashboard data fetched successfully")
    //         .data(Collections.singletonList(dashboardData))
    //         .build();
    // }

    public DashboardResponse getDashboardData() {
        List<Customer> usersList = customerRepository.findAll();
        Integer users = usersList.size();
    
        List<Plan> plansList = planRepository.findAll();
        Integer plans = plansList.size();
    
        List<Addon> addonsList = addonsRepository.findAll();
        Integer addons = addonsList.size();
    
        Integer revenue = 9892;
    
        return DashboardResponse.builder()
            .users(users)
            .plans(plans)
            .addons(addons)
            .revenue(revenue)
            .build();
    }
}

