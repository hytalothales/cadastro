package com.projeto.cadastro.repository;

import com.projeto.cadastro.model.Admin;
import com.projeto.cadastro.model.Cliente;
import com.projeto.cadastro.model.Usuario;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class MemoriaRepository {
    private List<Usuario> usuarios = new ArrayList<>();

    public MemoriaRepository() {
        // Inicializa o Admin padrão
        usuarios.add(new Admin("Administrador", "admin", "admin"));
    }

    public List<Usuario> findAll() {
        return usuarios;
    }

    public Optional<Usuario> findByIdentity(String identity) {
        return usuarios.stream()
            .filter(u -> u.getIdentity().equals(identity))
            .findFirst();
    }

    public void save(Usuario usuario) {
        // Se já existe, atualiza (remove antigo e põe o novo, ou apenas mantém se a ref for a mesma)
        Optional<Usuario> existente = findByIdentity(usuario.getIdentity());
        if (existente.isPresent()) {
            usuarios.remove(existente.get());
        }
        usuarios.add(usuario);
    }
}
