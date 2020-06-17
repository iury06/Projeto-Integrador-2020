import { TipoServico } from './tipo-servico.model';
import { Pessoa } from './pessoa.model';
import { LaboratorioSala } from './laboratorio-sala.model';

export class OrdemServico {
    os_id: number;
    os_data_emisao: Date;
    os_data_fechamento: Date;
    os_descricao: string;
    os_local: string;
    os_status: string;
    pessoaCli: Pessoa = new Pessoa();
    pessoaFun: Pessoa = new Pessoa();
    tipoServico: TipoServico = new TipoServico();
    laboratorioSala: LaboratorioSala = new LaboratorioSala();
   
    

}
