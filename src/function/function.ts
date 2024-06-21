export const Fn = {
    validaRut(rutCompleto: string) {
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
      const tmp = rutCompleto.split('-');
      let digv = tmp[1];
      const rut = tmp[0];
      if (digv == 'K') digv = 'k';
      return this.dv(Number(rut)) == digv;
    },
    dv(T: number) {
      let M = 0,
        S = 1;
      for (; T; T = Math.floor(T / 10))
        S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
      return S ? S - 1 : 'k';
    },
    format_rut(string: string) {
      const rut = string.replaceAll('.','');
      return rut;
    },
  };
  