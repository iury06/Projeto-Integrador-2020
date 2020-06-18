package com.bd.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bd.model.LaboratorioSala;
import com.bd.model.OrdemServico;
import com.bd.model.Pessoa;
import com.bd.model.TipoServico;


public interface OrdemServicoRepository extends JpaRepository<OrdemServico,Long>{


	@Query(value = "select os_id, os_pes_id_cli, os_pes_id_fun, os_data_emisao, os_data_fechamento, os_local, os_status, os_tps_id, os_lab_id,"
			+ " os_descricao from ordem_servico where os_pes_id_cli = ?1", nativeQuery = true)
	List<OrdemServico> listaOrdemLog(int os_pes_id_cli);
	

	
}
