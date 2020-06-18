package com.bd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bd.model.Historico;
import com.bd.model.HistoricoOrdem;



public interface HistoricoRepository extends JpaRepository<Historico, Long>{

@Query(value = "select hist_id, hist_os_id, hist_pes_id, hist_data ,"
		+ " hist_status from historico where hist_os_id = ?1", nativeQuery = true)
List<Historico> listaHistoricoPorOrdemS(int hist_os_id);


}
