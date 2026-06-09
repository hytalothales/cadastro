package com.projeto.cadastro.model;

public class Admin extends Usuario {
    public Admin() {
        super();
        this.role = "admin";
    }

    public Admin(String name, String identity, String password) {
        super(name, identity, password, "admin", null);
    }
}
