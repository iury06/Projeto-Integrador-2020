package com.bd.model;

import java.util.Date;

public interface HistoricoOrdem {

	
	public long getId();
	
	public OrdemServico getOrdemServico();

	public Pessoa getPessoa();

	public String getHist_status();

	public Date getHist_data();
	
}



