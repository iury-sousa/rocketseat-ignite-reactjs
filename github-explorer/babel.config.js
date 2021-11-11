module.exports = {
  presets: [
    // Identifica qual o ambiente (web/node/mob) da aplicação para converter o js
    // de acordo com a plataforma de execução.
    "@babel/preset-env",
    // Configuração para o babel interpretar o typescript
    "@babel/preset-typescript",
    // Converte o código js/jsx utilizado no react para o formato adequado aceito pelo ambiente que executa a aplicação
    [
      "@babel/preset-react",
      {
        // Garante que não seja necessário fazer a importação do React sempre que for criar um componente.
        runtime: "automatic",
      },
    ],
  ],
};
