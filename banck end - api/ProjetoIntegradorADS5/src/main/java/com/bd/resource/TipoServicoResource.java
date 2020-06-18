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

import com.bd.model.TipoServico;
import com.bd.repository.TipoServicoRepository;




//Get --> pegar
//Put --> alterar
//Delet --> apagar
//Post --> inserir


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/tiposervico")

public class TipoServicoResource {
	
	@Autowired
	private TipoServicoRepository tiposervicoRepository;

	
	@GetMapping
	public List<TipoServico> list(){
		return tiposervicoRepository.findAll();
	}



	
	
	
	
	@GetMapping("/{id}")
//	@ResponseStatus(HttpStatus.NO_CONTENT) --->  isso serve para não aparecer nenhuma resposta
	public Optional<TipoServico> findById(@PathVariable Long id){
		return tiposervicoRepository.findById(id);
	}

	
	@PostMapping
	public ResponseEntity<TipoServico> create(@RequestBody TipoServico tiposervico, HttpServletResponse response) {

		TipoServico save = tiposervicoRepository.save(tiposervico);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(save.getId())
				.toUri();

		return ResponseEntity.created(uri).body(save);
	}
	
	
	
	
	
	
	
	
//===== Deletando algum componente do banco
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id){
		tiposervicoRepository.deleteById(id);
	}

	
	@PutMapping("/{id}")
	public ResponseEntity<TipoServico> update(@PathVariable long id, @RequestBody TipoServico tiposervico) {
		Optional<TipoServico> tiposervicoBanco = tiposervicoRepository.findById(id);
		BeanUtils.copyProperties(tiposervico, tiposervicoBanco.get(), "id");
		tiposervicoRepository.save(tiposervicoBanco.get());
		return ResponseEntity.ok(tiposervico);
	}
	
	
}




