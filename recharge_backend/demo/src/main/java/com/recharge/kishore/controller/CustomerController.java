package com.recharge.kishore.controller;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.recharge.kishore.dto.BasicResponse;
import com.recharge.kishore.dto.CustomerIdRequest;
import com.recharge.kishore.dto.CustomerResponse;
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

import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

import org.springframework.web.bind.annotation.RequestBody;

// @RequiredArgsConstructor
@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("/api/customer")
public class CustomerController {
    private final PlanRepository planRepository; 
    private final AddonRepository addonRepository;
    private final CustomerRepository customerRepository;
    private final RechargeRepository rechargeRepository;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;

    public CustomerController(PlanRepository planRepository, AddonRepository addonRepository, CustomerRepository customerRepository, RechargeRepository rechargeRepository, PaymentRepository paymentRepository,UserRepository userRepository) {
        this.planRepository = planRepository;
        this.addonRepository = addonRepository;
        this.customerRepository = customerRepository;
        this.rechargeRepository = rechargeRepository;
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
    }

    // retrieve all the plan details
    @GetMapping("/plans")
    public List<Plan> viewPlans() {
        List<Plan> plans = planRepository.findAll();
        System.out.println(plans);
        if (plans.isEmpty()) {
            return plans;
        } else {
            return null;
        }
    }

    @GetMapping("/addons")
    public ResponseEntity<List<Addon>> viewAddons() {
        List<Addon> addons = addonRepository.findAll();
        
        if (addons.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(addons);
        }
    }

    // @GetMapping("/plan")
    // public ResponseEntity<Page<Plan>> viewPlans(Pageable pageable) {
    //     Page<Plan> plansPage = planRepository.findAll(pageable);

    //     if (plansPage.isEmpty()) {
    //         return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    //     } else {
    //         return new ResponseEntity<>(plansPage, HttpStatus.OK);
    //     }
    // }

    //retrieve all the addon plans available
    // @GetMapping("/addon")
    // public ResponseEntity<Page<Addon>> getAllAddons(Pageable pageable) {
    //     try {
    //         Page<Addon> addonsPage = addonRepository.findAll(pageable);
    //         return ResponseEntity.ok(addonsPage);
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    //     }
    // }
    
    
    @PostMapping("/recharge/plan/{planId}")
    public ResponseEntity<String> addRecharge(@PathVariable Long planId, @RequestBody CustomerIdRequest customerIdRequest ) {
        System.out.println(customerIdRequest.getCustomerId());
        try{
            if (customerIdRequest.getCustomerId() == null) {
                return ResponseEntity.badRequest().body("customerId is required");
            }

            Plan plan = planRepository.findById(planId).orElse(null);
            if (plan == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("plan not found");
            }
            Customer customer = customerRepository.findById(customerIdRequest.getCustomerId()).orElse(null);
            if (customer == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Customer not found");
            }
            // Create and save recharge
            Recharge recharge = new Recharge();
            recharge.setRechargePrice(plan.getPlanPrice());
            recharge.setStatus("false");
            recharge.setDate(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()));
            recharge.setPlan(plan);
            recharge.setAddon(null);
            rechargeRepository.save(recharge);
    
            // Create and save payment
            Payment payment = new Payment();
            payment.setPaymentId(recharge.getRechargeId());
            payment.setStatus("false");
            payment.setTotalAmount(plan.getPlanPrice());
            payment.setPaymentDate(new Date()); // Set payment date appropriately
            payment.setModeOfPayment(null);
            payment.setRecharge(recharge); // Set recharge
            payment.setCustomer(customer);
            paymentRepository.save(payment);

            return ResponseEntity.ok("Plan was recharged successfully");
        } 
        catch (Exception e) {
            System.out.println(e.getMessage());
            // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Plan not found");
        }
    }
    @PostMapping("/recharge/addon/{addonId}")
    public ResponseEntity<String> addAddon(@PathVariable Long addonId, @RequestBody Integer customerId) {

        try{
            Addon addon=addonRepository.findById(addonId).get();

            Recharge r=new Recharge();
            r.setRechargePrice(addon.getAddonPrice());
            r.setStatus("false");
            r.setDate(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()));
            r.setPlan(null);
            r.setAddon(addon);
            
            Payment p = new Payment();
            p.setStatus("false");
            p.setTotalAmount(addon.getAddonPrice());
            p.setPaymentDate(null);
            p.setModeOfPayment(null);
            Customer customer=customerRepository.findById(customerId).get();
            p.setCustomer(customer);

            r.setPayment(p);

            return ResponseEntity.ok("Addon added successfully");
            
        } 
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
            // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Plan not found");
        }
    }

    // retrieve all the recharges of the user , consider userId as customerId
    //     @GetMapping("/{customerId}")
    // public ResponseEntity<BasicResponse<List<Recharge>>> viewRecharges(@PathVariable Integer customerId) {
    //     try {
    //         Customer customer = customerRepository.findById(customerId).orElse(null);

    //         if (customer == null) {
    //             return ResponseEntity.status(HttpStatus.NOT_FOUND)
    //                 .body(BasicResponse.<List<Recharge>>builder()
    //                     .message("Customer not found")
    //                     .build());
    //         }

    //         List<Payment> payments = customer.getPayments();
    //         List<Recharge> recharges = new ArrayList<>();

    //         for (Payment payment : payments) {
    //             if ("false".equals(payment.getStatus())) {
    //                 recharges.add(payment.getRecharge());
    //             }
    //         }

    //         // Wrap the list of recharges in another list to match the expected type
    //         List<List<Recharge>> data = new ArrayList<>();
    //         data.add(recharges);
            
    //         return ResponseEntity.ok()
    //             .body(BasicResponse.<List<Recharge>>builder()
    //                 .message("Recharges fetched successfully")
    //                 .data(data) // Provide List<List<Recharge>> to match the expected type
    //                 .build());
            
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //             .body(BasicResponse.<List<Recharge>>builder()
    //                 .message("Internal server error")
    //                 .build());
    //     }
    // }
    

    // Edit recharge
    // @PutMapping("/recharge/{planId}")
    // public ResponseEntity<String> editRecharge(@PathVariable Long planId, @RequestBody Integer customerId) {


    //     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");

    // }

    //Delete recharge
    @DeleteMapping("/recharge/{rechargeId}")
    public ResponseEntity<String> deleteRecharge(@PathVariable Long rechargeId, @RequestBody Integer customerId) {
        try {
            rechargeRepository.deleteById(rechargeId);
            return ResponseEntity.status(HttpStatus.OK).body("Recharge Deleted Successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }


    }

    //Making payment , client sends the Payment data after he pays the money.
    @PostMapping("/makepayment")
    public ResponseEntity<String> makePayment(@RequestBody Long paymentId) {
        Payment pending_payment=paymentRepository.findById(paymentId).get();
        System.out.println("kjasdnoadfh;oashfdoisdhf;oiSFjoifhd");
        try {
            pending_payment.setStatus("true");
            pending_payment.setPaymentDate(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()));
            pending_payment.setModeOfPayment("razorpay");
            long recharge_id=pending_payment.getRecharge().getRechargeId();
            Recharge recharge = rechargeRepository.findById(recharge_id).get();
            recharge.setStatus("true");
            paymentRepository.save(pending_payment);
            rechargeRepository.save(recharge);
            return ResponseEntity.status(HttpStatus.OK).body("Payment Successfullt Made!!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }       



    //change customer details
    @PutMapping("/updateCustomer/{customerId}")
    public ResponseEntity<String> updateCustomerDetails(@PathVariable int customerId, @RequestBody Customer updatedCustomer) {
        try {
            Customer existingCustomer = customerRepository.findById(customerId).get();

            if (existingCustomer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer with ID " + customerId + " not found.");
            }

            // Update the existing customer details
            existingCustomer.setCustomerName(updatedCustomer.getCustomerName());
            existingCustomer.setAddress(updatedCustomer.getAddress());

            // Save the updated customer to the database
            customerRepository.save(existingCustomer);

            return ResponseEntity.ok("Customer details updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating customer details.");
        }
    }

    @DeleteMapping("/customer/{customerId}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Integer customerId) {
        try {
            customerRepository.deleteById(customerId);
            userRepository.deleteById(Long.valueOf(customerId));
            
            return ResponseEntity.ok("Customer deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting customer");
        }
    }



    @GetMapping("/get/{customerId}")
    public ResponseEntity<BasicResponse<CustomerResponse>> getCustomerDetails(@PathVariable int customerId) {
        Customer customer = customerRepository.findById(customerId).orElse(null);
        
        if (customer != null) {
            // Convert Customer to CustomerResponse
            CustomerResponse customerResponse = convertToCustomerResponse(customer);
            
            BasicResponse<CustomerResponse> response = BasicResponse.<CustomerResponse>builder()
                    .message("Customer details fetched successfully")
                    .data(Collections.singletonList(customerResponse))
                    .build();
            return ResponseEntity.ok(response);
        } else {
            BasicResponse<CustomerResponse> response = BasicResponse.<CustomerResponse>builder()
                    .message("Customer not found")
                    .build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
    
    // Method to convert Customer to CustomerResponse
    private CustomerResponse convertToCustomerResponse(Customer customer) {
        return CustomerResponse.builder()
                .address(customer.getAddress())
                .customerName(customer.getCustomerName())
                .build();
    }

    @GetMapping("/email/{email}")
public ResponseEntity<BasicResponse<Integer>> getEmail(@PathVariable String email) {
    // Mock implementation to retrieve integer value associated with the email
    User user = userRepository.findByEmail(email).orElse(null);
    
    if (user != null) {
        int customerId = user.getId().intValue();
        // Create a list containing the integer value
        List<Integer> customerIdList = Collections.singletonList(customerId);

        // Create BasicResponse object with the list containing the integer value
        BasicResponse<Integer> response = BasicResponse.<Integer>builder()
                .message("Integer value retrieved successfully for email: " + email)
                .data(customerIdList)
                .build();
        return ResponseEntity.ok(response);
    } else {
        // Email value not found
        BasicResponse<Integer> response = BasicResponse.<Integer>builder()
                .message("Integer value not found for email: " + email)
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
}
    
    
}