import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfFormat'
})
export class CpfFormatPipe implements PipeTransform {
  transform(cpf: string): string {
    if (cpf) {
      // Verifique se o CPF é um número de 11 dígitos (sem formatação)
      if (/^\d{11}$/.test(cpf)) {
        // Formate o CPF como XXX.XXX.XXX-XX
        return cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9);
      }
    }
    // Retorne o valor original se o CPF não estiver em um formato válido
    return cpf;
  }
}
