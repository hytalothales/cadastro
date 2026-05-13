package com.projeto.cadastro.model;

public class Cliente extends Usuario {
    public Cliente() {
        super();
        this.role = "cliente";
    }

    public Cliente(String name, String identity, String password) {
        super(name, identity, password, "cliente");
    }
}
