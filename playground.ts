// function saudacao(nome: string, idade: number): string {
//   return `Olá, ${nome}! Você tem ${idade} anos.`;
// }

// const resultado = saudacao("Fabrício", 25);

// console.log(resultado);

async function consultaFake(id: string) {
  return { id, nome: "Usuário Teste" };
}

async function buscarUsuario(id: string) {
  try {
    const usuario = await consultaFake(id);
    console.log("Usuário encontrado:", usuario);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
  }
}

buscarUsuario("321");
