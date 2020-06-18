package com.bd.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.sun.istack.NotNull;

@Entity
@Table (name = "historico")
public class Historico {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	
//=====================================================

//=====================================================
	
	@NotNull
	@Column(name = "hist_id")
	private long id;

	@NotNull
	@Column(name = "hist_status")
	private String  hist_status;

	@NotNull
	//@FutureOrPresent
	@Column(name = "hist_data")
	private Date hist_data;
	
//=====================================================

	@ManyToOne
	@JoinColumn(name = "hist_os_id")
	private OrdemServico ordemServico;
	
	@ManyToOne
	@JoinColumn(name = "hist_pes_id")
	private Pessoa pessoa;

//=====================================================

	public long getId() { 
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}

	//-----------------------------------------------------------------

	public OrdemServico getOrdemServico() {
		return ordemServico;
	}

	public void setOrdemServico(OrdemServico ordemServico) {
		this.ordemServico = ordemServico;
	}

	

	//-----------------------------------------------------------------

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	//-----------------------------------------------------------------

	public String getHist_status() {
		return hist_status;
	}

	public void setHist_status(String hist_status) {
		this.hist_status = hist_status;
	}

	//-----------------------------------------------------------------

	public Date getHist_data() {
		return hist_data;
	}

	public void setHist_data(Date hist_data) {
		this.hist_data = hist_data;
	}
	
//=====================================================
	
}


