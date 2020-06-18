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

import com.bd.model.Historico;
import com.bd.model.OrdemServico;
import com.bd.repository.OrdemServicoRepository;

//Get --> pegar
//Put --> alterar
//Delet --> apagar
//Post --> inserir

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/ordemservico")

public class OrdemServicoResource {

	@Autowired
	private OrdemServicoRepository ordemServicoRepository;

	@GetMapping
	public List<OrdemServico> list() {
		return ordemServicoRepository.findAll();
	}

	// ordem de serviço cliente logado
	@GetMapping("/cliente/{os_pes_id_cli}")
	public List<OrdemServico> list(@PathVariable int os_pes_id_cli) {
		return ordemServicoRepository.listaOrdemLog(os_pes_id_cli);
	}

	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public Optional<OrdemServico> findById(@PathVariable Long id) {
		return ordemServicoRepository.findById(id);
	}

	@PostMapping
	public ResponseEntity<OrdemServico> create(@RequestBody OrdemServico esporte, HttpServletResponse response) {

		OrdemServico save = ordemServicoRepository.save(esporte);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(save.getOs_id())
				.toUri();

		return ResponseEntity.created(uri).body(save);
	}

//===== Deletando algum componente do banco

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		ordemServicoRepository.deleteById(id);
	}

	@PutMapping("/{id}")
	public ResponseEntity<OrdemServico> update(@PathVariable long id, @RequestBody OrdemServico ordemServico) {

		Optional<OrdemServico> ordemServicoBanco = ordemServicoRepository.findById(id);

		BeanUtils.copyProperties(ordemServico, ordemServicoBanco.get(), "id");

		ordemServicoRepository.save(ordemServicoBanco.get());

		return ResponseEntity.ok(ordemServico);
	}

}
