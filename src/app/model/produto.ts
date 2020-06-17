import { GrupoProduto } from './grupo-produto';

export class Produto {
    id: number;
    nome: string;
    und: string;
    localestoque: string;
    custo: number;
    precovenda: number;
    grupoProduto: GrupoProduto = new GrupoProduto();

}