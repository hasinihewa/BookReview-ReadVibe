package com.example.BookReviewCoullax.controller;
import com.example.BookReviewCoullax.dto.ReqRes;
import com.example.BookReviewCoullax.entity.OurUsers;
import com.example.BookReviewCoullax.service.UsersManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserManagementController {

    @Autowired
    private UsersManagementService userManagementService;

    @PostMapping("/auth/userRegister")
    public ResponseEntity<ReqRes> userRegister(@RequestBody ReqRes req) {
        return ResponseEntity.ok(userManagementService.userRegister(req));
    }



    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req) {
        return ResponseEntity.ok(userManagementService.login(req));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req) {
        return ResponseEntity.ok(userManagementService.refreshToken(req));
    }

    @GetMapping("/anyuser/get-users")
    public ResponseEntity<ReqRes> getUsers() {
        return ResponseEntity.ok(userManagementService.findAllUsers());
    }

    @GetMapping("/anyuser/get-user/{userId}")
    public ResponseEntity<ReqRes> getUserById(@PathVariable Integer userId) {
        return ResponseEntity.ok(userManagementService.getUsersById(userId));
    }

    @GetMapping("/anyuser/get-name/{userId}")
    public ResponseEntity<ReqRes> getUserNameById(@PathVariable Long userId) {
        return ResponseEntity.ok(userManagementService.getUsernameById(userId));
    }

    @PutMapping("/anyuser/update/{userId}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable Integer userId, @RequestBody OurUsers reqres) {
        return ResponseEntity.ok(userManagementService.updateUser(userId, reqres));
    }

    @GetMapping("/anyuser/getMyProfile")
    public ResponseEntity<ReqRes> getMyProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = userManagementService.getMyProfile(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
