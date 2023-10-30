import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefoneFormat'
})
export class TelefoneFormatPipe implements PipeTransform {
  transform(telefone: string): string {
    if (telefone) {
      // Remova qualquer formatação existente (por exemplo, espaços e traços)
      telefone = telefone.replace(/\D/g, '');

      // Verifique se o número de telefone tem 11 dígitos (incluindo o DDD)
      if (telefone.length === 11) {
        // Formate o telefone como (XX) XXXXX-XXXX
        return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 7)}-${telefone.substring(7)}`;
      }
    }
    // Retorne o valor original se o telefone não estiver em um formato válido
    return telefone;
  }
}
