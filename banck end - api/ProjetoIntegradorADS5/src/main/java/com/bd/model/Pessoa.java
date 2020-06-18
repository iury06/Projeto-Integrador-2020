package com.bd.model;

import java.util.Date;
import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.sun.istack.NotNull;

@Entity
@Table (name = "pessoa")
public class Pessoa {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	
//=====================================================

//=====================================================
	
	@NotNull
	@Column(name = "pes_id")
	private long id;

	@NotNull
	@Column(name = "pes_nome")
	private String  nome;
	
	@NotNull
	@Column(name = "pes_cpf_cnpj")
	private String  pes_cpf_cnpj;

	@NotNull
	@Column(name = "pes_telefone")
	private String  pes_telefone;
		
	@NotNull
	@Column(name = "pes_email")
	private String  pes_email;
	
	@NotNull
	@Column(name = "pes_funcao")
	private String  pes_funcao;
	
	@NotNull
	@Column(name = "pes_login")
	private String  pes_login;
	
	@NotNull
	@Column(name = "pes_senha")
	private String  pes_senha;
	
	@NotNull
	@Column(name = "pes_perfil")
	private String  pes_perfil;

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
	
	//-----------------------------------------------------------------

	public String getPes_cpf_cnpj() {
		return pes_cpf_cnpj;
	}

	public void setPes_cpf_cnpj(String pes_cpf_cnpj) {
		this.pes_cpf_cnpj = pes_cpf_cnpj;
	}
	
	//-----------------------------------------------------------------

	public String getPes_telefone() {
		return pes_telefone;
	}

	public void setPes_telefone(String pes_telefone) {
		this.pes_telefone = pes_telefone;
	}
	
	//-----------------------------------------------------------------

	public String getPes_email() {
		return pes_email;
	}

	public void setPes_email(String pes_email) {
		this.pes_email = pes_email;
	}
	
	//-----------------------------------------------------------------

	public String getPes_funcao() {
		return pes_funcao;
	}

	public void setPes_funcao(String pes_funcao) {
		this.pes_funcao = pes_funcao;
	}
	
	//-----------------------------------------------------------------

	public String getPes_login() {
		return pes_login;
	}

	public void setPes_login(String pes_login) {
		this.pes_login = pes_login;
	}
	
	//-----------------------------------------------------------------

	public String getPes_senha() {
		return pes_senha;
	}

	public void setPes_senha(String pes_senha) {
		this.pes_senha = pes_senha;
	}

	//-----------------------------------------------------------------

	public String getPes_perfil() {
		return pes_perfil;
	}

	public void setPes_perfil(String pes_perfil) {
		this.pes_perfil = pes_perfil;
	}

//=====================================================
	
}


