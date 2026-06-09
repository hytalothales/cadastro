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

    @GetMapping("/obra/{obra}")
    public ResponseEntity<?> getArquivosPorObra(@PathVariable String obra) {
        if (obra == null || obra.isEmpty() || "null".equalsIgnoreCase(obra) || "undefined".equalsIgnoreCase(obra)) {
            List<Arquivo> todosArquivos = repository.findAll().stream()
                    .flatMap(u -> u.getFiles().stream())
                    .toList();
            return ResponseEntity.ok(todosArquivos);
        }
        
        List<Arquivo> arquivos = repository.findAll().stream()
                .filter(u -> u.getObra() != null && u.getObra().equalsIgnoreCase(obra))
                .flatMap(u -> u.getFiles().stream())
                .toList();
        return ResponseEntity.ok(arquivos);
    }

    @PostMapping("/obra/{obra}")
    public ResponseEntity<?> uploadArquivoPorObra(@PathVariable String obra, @RequestBody Arquivo arquivo) {
        if (obra == null || obra.isEmpty() || "null".equalsIgnoreCase(obra) || "undefined".equalsIgnoreCase(obra)) {
            List<Usuario> admins = repository.findAll().stream()
                    .filter(u -> "admin".equals(u.getRole()))
                    .toList();
            if (!admins.isEmpty()) {
                admins.get(0).getFiles().add(arquivo);
                repository.save(admins.get(0));
                return ResponseEntity.ok("Arquivo salvo com sucesso");
            }
        }

        List<Usuario> usuariosDaObra = repository.findAll().stream()
                .filter(u -> u.getObra() != null && u.getObra().equalsIgnoreCase(obra))
                .toList();

        if (!usuariosDaObra.isEmpty()) {
            usuariosDaObra.get(0).getFiles().add(arquivo);
            repository.save(usuariosDaObra.get(0));
            return ResponseEntity.ok("Arquivo salvo com sucesso");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum usuário cadastrado para esta obra");
    }
}
