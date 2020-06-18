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
@Table (name = "tipo_servico")
public class TipoServico {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	
//=====================================================

//=====================================================
	
	@NotNull
	@Column(name = "tps_id")
	private long id;

	@NotNull
	@Column(name = "tps_descricao ")
	private String  descricao;

//=====================================================
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	//-----------------------------------------------------------------

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
//=====================================================

}


