package com.bd.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

import com.sun.istack.NotNull;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.util.Date;


@Entity
@Table (name = "ordem_servico")


public class OrdemServico {

	//SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
   // Date hoje = new Date();
    
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	
//=====================================================
   
//=====================================================
	@NotNull
	@Column(name = "os_id")
	private long os_id;
	
	@NotNull
	//@FutureOrPresent
	@Column(name = "os_data_emisao")
	private Date os_data_emisao;
	
	//@NotNull
	//@FutureOrPresent
	@Column(name = "os_data_fechamento")
	private Date os_data_fechamento;
	
	@NotNull
	@Column(name = "os_status")
	private String os_status;
	
	@NotNull
	@Column(name = "os_descricao")
	private String os_descricao;
	
	@NotNull
	@Column(name = "os_local")
	private String os_local;
	
//=====================================================
	 
	@ManyToOne
	@JoinColumn(name = "os_tps_id")
	private TipoServico tipoServico;
	
	@ManyToOne
	@JoinColumn(name = "os_lab_id")
	private LaboratorioSala laboratorioSala;
	
	@ManyToOne
	@JoinColumn(name = "os_pes_id_fun")
	private Pessoa pessoaFun;
	
	@ManyToOne
	@JoinColumn(name = "os_pes_id_cli")
	private Pessoa pessoaCli;
	
	//=====================================================
	

	public long getOs_id() {
		return os_id;
	}

	public void setOs_id(long os_id) {
		this.os_id = os_id;
	}

	public Date getOs_data_emisao() {
		return os_data_emisao;
	}

	public void setOs_data_emisao(Date os_data_emisao) {
		this.os_data_emisao = os_data_emisao;
	}

	public Date getOs_data_fechamento() {
		return os_data_fechamento;
	}

	public void setOs_data_fechamento(Date os_data_fechamento) {
		this.os_data_fechamento = os_data_fechamento;
	}

	public String getOs_status() {
		return os_status;
	}

	public void setOs_status(String os_status) {
		this.os_status = os_status;
	}

	public String getOs_descricao() {
		return os_descricao;
	}

	public void setOs_descricao(String os_descricao) {
		this.os_descricao = os_descricao;
	}

	public String getOs_local() {
		return os_local;
	}

	public void setOs_local(String os_local) {
		this.os_local = os_local;
	}

	public TipoServico getTipoServico() {
		return tipoServico;
	}

	public void setTipoServico(TipoServico tipoServico) {
		this.tipoServico = tipoServico;
	}

	public LaboratorioSala getLaboratorioSala() {
		return laboratorioSala;
	}

	public void setLaboratorioSala(LaboratorioSala laboratorioSala) {
		this.laboratorioSala = laboratorioSala;
	}

	public Pessoa getPessoaFun() {
		return pessoaFun;
	}

	public void setPessoaFun(Pessoa pessoaFun) {
		this.pessoaFun = pessoaFun;
	}

	public Pessoa getPessoaCli() {
		return pessoaCli;
	}

	public void setPessoaCli(Pessoa pessoaCli) {
		this.pessoaCli = pessoaCli;
	}
		
//=====================================================

	

}


