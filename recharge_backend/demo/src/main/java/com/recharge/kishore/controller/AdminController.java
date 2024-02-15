package com.recharge.kishore.controller;

import java.util.*;

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
import org.springframework.web.bind.annotation.RestController;

import com.recharge.kishore.model.Addon;
import com.recharge.kishore.model.Plan;
import com.recharge.kishore.repository.AddonRepository;
import com.recharge.kishore.repository.PlanRepository;

@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("/api")
public class AdminController {

    private final PlanRepository planRepository; 
    private final AddonRepository addonRepository;
    public AdminController(PlanRepository planRepository, AddonRepository addonRepository) {
        this.planRepository = planRepository;
        this.addonRepository = addonRepository;
    }

    //Add a new plan in the database
    @PostMapping("/plan")
    public ResponseEntity<String> addPlan(@RequestBody Plan plan) {
        try {
            Optional<Plan> existingPlan = planRepository.findById(plan.getPlanId());

            if (existingPlan.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Plan with ID " + plan.getPlanId() + " already exists.");
            }
            planRepository.save(plan);

            return ResponseEntity.status(HttpStatus.CREATED).body("Plan added successfully.");
        } catch (Exception e) {
            // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding the plan.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
    
    // retrieve all the plan details
    @GetMapping("/plans")
    public ResponseEntity<List<Plan>> viewPlans() {
        System.out.print("sadkpm");
        List<Plan> plans = planRepository.findAll();
        return new ResponseEntity<>(plans, HttpStatus.OK);
        // if (plans.isEmpty()) {
        //     String message = "No plans found.";
        //     List<Plan> empty=Collections.emptyList();
        //     // return ResponseEntity<>(HttpStatus.NO_CONTENT).body(message);
        //     return new ResponseEntity<>(empty, HttpStatus.NO_CONTENT);

        // } else {
        //     return new ResponseEntity<>(plans, HttpStatus.OK);
        // }
    }

    @PutMapping("/plan/{planId}")
    public ResponseEntity<String> editPlan(@PathVariable Long planId, @RequestBody Plan updatedPlan) {
        Optional<Plan> existingPlanOptional = planRepository.findById(planId);

        if (existingPlanOptional.isPresent()) {
            Plan existingPlan = existingPlanOptional.get();

            // Update the plan details
            existingPlan.setPlanType(updatedPlan.getPlanType());
            existingPlan.setPlanName(updatedPlan.getPlanName());
            existingPlan.setPlanValidity(updatedPlan.getPlanValidity());
            existingPlan.setPlanDetails(updatedPlan.getPlanDetails());
            existingPlan.setPlanPrice(updatedPlan.getPlanPrice());

            // Save the updated plan
            planRepository.save(existingPlan);

            return new ResponseEntity<>("Plan edited", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Plan not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/plan/{planId}")
    public ResponseEntity<String> deletePlan(@PathVariable Long planId) {
        try {
            Optional<Plan> existingPlanOptional = planRepository.findById(planId);
            
            if (existingPlanOptional.isPresent()) {
                Plan existingPlan = existingPlanOptional.get();

                // Delete the plan
                planRepository.delete(existingPlan);

                return new ResponseEntity<>("Plan deleted", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Plan not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Log the error for debugging purposes
            e.printStackTrace();
            // Return an internal server error response
            return new ResponseEntity<>("Error deleting the plan", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Add an addon to the plan
    @PostMapping("/addon")
    public ResponseEntity<String> createAddon(@RequestBody Addon addon) {
        try {
            addonRepository.save(addon);
            return new ResponseEntity<>("Addon added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add addon: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
