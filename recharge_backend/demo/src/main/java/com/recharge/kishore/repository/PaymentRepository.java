package com.recharge.kishore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recharge.kishore.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{

}


