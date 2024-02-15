package com.recharge.kishore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanResponse {
    private Long planId;
    private String planType;
    private String planName;
    private String planValidity;
    private String planDetails;
    private double planPrice;
}
