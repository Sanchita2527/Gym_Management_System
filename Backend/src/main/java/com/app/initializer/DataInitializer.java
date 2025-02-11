package com.app.initializer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.app.Entity.Customer;
import com.app.Entity.Role;
import com.app.repository.CustomerReopository;


@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CustomerReopository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final String adminEmail;
    private final String adminPassword;
    
    public DataInitializer(
            CustomerReopository adminRepository,
            PasswordEncoder passwordEncoder,
            @Value("${admin.email}") String adminEmail,
            @Value("${admin.password}") String adminPassword) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
    }
    @Override
    @Transactional
    public void run(String... args) {
        // Save the area first
      
        if (adminRepository.findByEmail("admin@gmail.com").isEmpty()) {
            Customer admin = new Customer();
            admin.setName("Admin User");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setContact("123456790");
            admin.setGender("MALE");
            
            admin.setRole(Role.ROLE_ADMIN);
           
            

            adminRepository.save(admin);
            System.out.println("Admin user seeded successfully.");
        } else {
            System.out.println("Admin user already exists.");
        }
    }



}
