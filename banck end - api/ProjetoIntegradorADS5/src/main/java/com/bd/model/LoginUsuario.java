package com.bd.model;

public class LoginUsuario {
	private static  String login;
	private static  String senha;

	public static  String getLogin(){
	  return login;
	  }
	   
	public void setLogin(String login) {
	this.login = login;
	}
	public static String getSenha(){
	  return senha;
	  }
	  
	public void setSenha(String senha) {
	this.senha= senha;
	}  
}