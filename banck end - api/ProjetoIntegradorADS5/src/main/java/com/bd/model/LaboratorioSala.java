package com.bd.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.sun.istack.NotNull;

@Entity
@Table (name = "laboratorio_sala")
public class LaboratorioSala {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	
//=====================================================

//=====================================================
	
	@NotNull
	@Column(name = "lab_id")
	private long id;

	@NotNull
	@Column(name = "lab_nome")
	private String  nome;

//=====================================================
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	//-----------------------------------------------------------------

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

//=====================================================
	
}


