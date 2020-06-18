package com.bd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bd.model.ListaPessoa;
import com.bd.model.LoginUsuario;
import com.bd.model.Pessoa;



public interface PessoaRepository extends JpaRepository<Pessoa, Long>{

	/*
	@Query(value = "select pes_login, pes_senha, pes_perfil from Pessoa "
			+ "where pes_login = ?1 and pes_senha= ?2", nativeQuery = true)
    LoginUsuario findFiltroUsuario(String pes_login, String pes_senha);

			*/
	@Query(value = " select pes_id as id, pes_nome as nome from pessoa where pes_perfil = ?1 ", nativeQuery = true)
	List<ListaPessoa> listaPessoaPorPerfil(String perfil);
	
	@Query(value = " select pes_id as id, pes_nome as nome, pes_perfil as pes_perfil from Pessoa where pes_login = ?1 and pes_senha = ?2 ", nativeQuery = true)
	Object[] findFiltroUsuario(String login, String senha);
		
}
