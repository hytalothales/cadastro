package com.projeto.cadastro.controller;

import com.projeto.cadastro.model.Arquivo;
import com.projeto.cadastro.model.Usuario;
import com.projeto.cadastro.repository.MemoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/arquivos")
public class ArquivoController {

    @Autowired
    private MemoriaRepository repository;

    @GetMapping("/{identity}")
    public ResponseEntity<?> getArquivos(@PathVariable String identity) {
        Optional<Usuario> usuario = repository.findByIdentity(identity);
        
        if (usuario.isPresent()) {
            if ("admin".equals(usuario.get().getRole())) {
                // Admin can see all files from all users (flatten list)
                List<Arquivo> todosArquivos = repository.findAll().stream()
                        .flatMap(u -> u.getFiles().stream())
                        .toList();
                return ResponseEntity.ok(todosArquivos);
            }
            return ResponseEntity.ok(usuario.get().getFiles());
        }
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
    }

    @PostMapping("/{identity}")
    public ResponseEntity<?> uploadArquivo(@PathVariable String identity, @RequestBody Arquivo arquivo) {
        Optional<Usuario> usuario = repository.findByIdentity(identity);

        if (usuario.isPresent()) {
            usuario.get().getFiles().add(arquivo);
            repository.save(usuario.get()); // Atualiza
            return ResponseEntity.ok("Arquivo salvo com sucesso");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
    }
}
