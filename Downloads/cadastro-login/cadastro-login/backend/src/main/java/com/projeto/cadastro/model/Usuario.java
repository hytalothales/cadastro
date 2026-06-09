package com.projeto.cadastro.model;

import java.util.ArrayList;
import java.util.List;

public abstract class Usuario {
    protected String name;
    protected String identity;
    protected String password;
    protected List<Arquivo> files;
    protected String role;
    protected String obra;

    public Usuario() {
        this.files = new ArrayList<>();
    }

    public Usuario(String name, String identity, String password, String role, String obra) {
        this.name = name;
        this.identity = identity;
        this.password = password;
        this.role = role;
        this.obra = obra;
        this.files = new ArrayList<>();
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIdentity() { return identity; }
    public void setIdentity(String identity) { this.identity = identity; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public List<Arquivo> getFiles() { return files; }
    public void setFiles(List<Arquivo> files) { this.files = files; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getObra() { return obra; }
    public void setObra(String obra) { this.obra = obra; }
}
