import { OrdemServico } from './ordem-servico.model';
import { Pessoa } from './pessoa.model';

export class Historico {
    id: number;
    hist_status: string;
    hist_data: Date;
    ordemServico: OrdemServico = new OrdemServico();
    pessoa: Pessoa = new Pessoa();
   
}
