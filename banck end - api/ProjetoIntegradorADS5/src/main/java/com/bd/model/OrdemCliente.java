package com.bd.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.sun.istack.NotNull;

public interface OrdemCliente {

	public long getOs_id();

	public Pessoa getPessoaCli();

	public Date getOs_data_emisao();
	
	public Date getOs_data_fechamento();
	
	public String getOs_local();
	
	public TipoServico getTipoServico();
	
	public LaboratorioSala getLaboratorioSala();
	
	public String getOs_status();

	public String getOs_descricao();

}
