package com.bd.resource;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.bd.model.LaboratorioSala;
import com.bd.repository.LaboratorioSalaRepository;


//Get --> pegar
//Put --> alterar
//Delet --> apagar
//Post --> inserir


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/laboratoriosala")

public class LaboratorioSalaResource {
	
	@Autowired
	private LaboratorioSalaRepository laboratoriosalaRepository;

	
	@GetMapping
	public List<LaboratorioSala> list(){
		return laboratoriosalaRepository.findAll();
	}



	
	
	
	
	@GetMapping("/{id}")
//	@ResponseStatus(HttpStatus.NO_CONTENT) --->  isso serve para não aparecer nenhuma resposta
	public Optional<LaboratorioSala> findById(@PathVariable Long id){
		return laboratoriosalaRepository.findById(id);
	}

	
	@PostMapping
	public ResponseEntity<LaboratorioSala> create(@RequestBody LaboratorioSala laboratoriosala, HttpServletResponse response) {

		LaboratorioSala save = laboratoriosalaRepository.save(laboratoriosala);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(save.getId())
				.toUri();

		return ResponseEntity.created(uri).body(save);
	}
	
	
	
//===== Deletando algum componente do banco
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id){
		laboratoriosalaRepository.deleteById(id);
	}

	
	@PutMapping("/{id}")
	public ResponseEntity<LaboratorioSala> update(@PathVariable long id, @RequestBody LaboratorioSala laboratoriosala) {
		Optional<LaboratorioSala> laboratoriosalaBanco = laboratoriosalaRepository.findById(id);
		BeanUtils.copyProperties(laboratoriosala, laboratoriosalaBanco.get(), "id");
		laboratoriosalaRepository.save(laboratoriosalaBanco.get());
		return ResponseEntity.ok(laboratoriosala);
	}

	
}




