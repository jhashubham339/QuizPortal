package com.QuizPortalServer.QuizPortalServer.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    private long roleId;
    private String roleName;
    @OneToMany(cascade = CascadeType.ALL ,fetch = FetchType.LAZY,mappedBy = "role")
    private List<UserRole> userRoles = new ArrayList<>();

    public Role() {
    }

    public Role(long roleId, String roleName, List<UserRole> userRoles) {
        this.roleId = roleId;
        this.roleName = roleName;
        this.userRoles = userRoles;
    }

    public long getRoleId() {
        return roleId;
    }

    public void setRoleId(long roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public List<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<UserRole> userRoles) {
        this.userRoles = userRoles;
    }
}
