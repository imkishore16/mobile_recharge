package com.recharge.kishore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recharge.kishore.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer>{

}
