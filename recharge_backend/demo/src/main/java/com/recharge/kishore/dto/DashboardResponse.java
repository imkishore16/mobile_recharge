package com.recharge.kishore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {
    private int users;
    private int plans;
    private int addons;
    private int revenue;
}
