package com.bd.resource;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bd.model.LoginUsuario;
import com.bd.repository.PessoaRepository;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/login")

public class LoginResource {
	
	@Autowired
	private PessoaRepository pessoaRepository;
	
	
	@PostMapping
	public ResponseEntity<Object[]> create(@RequestBody LoginUsuario loginUsuario, HttpServletResponse response) {
		return ResponseEntity.ok(pessoaRepository.findFiltroUsuario(LoginUsuario.getLogin(), LoginUsuario.getSenha()));
	}
	}