package com.recharge.kishore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
import com.recharge.kishore.model.Plan;
import com.recharge.kishore.model.User;

public interface PlanRepository extends JpaRepository<Plan, Long>{
    // Page<Plan> findAll(Pageable pageable);
    @SuppressWarnings("null")
    public List<Plan> findAll();

}
