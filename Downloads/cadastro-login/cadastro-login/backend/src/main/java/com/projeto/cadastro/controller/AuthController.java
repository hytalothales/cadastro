package com.projeto.cadastro.controller;

import com.projeto.cadastro.model.Cliente;
import com.projeto.cadastro.model.Usuario;
import com.projeto.cadastro.repository.MemoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private MemoriaRepository repository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciais) {
        String identity = credenciais.get("identity");
        String password = credenciais.get("password");

        Optional<Usuario> usuario = repository.findByIdentity(identity);

        if (usuario.isPresent() && usuario.get().getPassword().equals(password)) {
            return ResponseEntity.ok(usuario.get());
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> dados) {
        String name = dados.get("name");
        String identity = dados.get("identity");
        String password = dados.get("password");
        String obra = dados.get("obra");

        if (repository.findByIdentity(identity).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuário já existe");
        }

        Cliente novoCliente = new Cliente(name, identity, password, obra);
        repository.save(novoCliente);

        return ResponseEntity.ok("Cadastrado com sucesso");
    }
}
