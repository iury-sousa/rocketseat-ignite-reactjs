const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",

  // Configura a visualização original do código mesmo depois da compressão e conversão do babel.
  // Desse modo, facilia a localização do arquivo e linha de onde ocorreram erros.
  devtool: isDevelopment ? "eval-source-map" : "source-map",

  // O arquivo principal/inicial da aplicação
  entry: path.resolve(__dirname, "src", "index.jsx"),

  // Arquivo que será gerado pelo webpack
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  resolve: {
    // Extensões que podem ser lidas pelo webpack
    extensions: [".js", ".jsx"],
  },

  // Configura o servidor local/dev do webpack
  devServer: {
    // Diretório do arquivo index.html
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 3000,
  },

  plugins: [
    // Injeta automaticamente o script bundle gerado pelo webpack/babel no arquivo index.html
    // do diretorio dist.
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],

  // Configurações que devem ser efetuadas de acordo com cada tipo de arquivo importado
  module: {
    rules: [
      {
        // Verifica se o arquivo é .jsx
        test: /\.jsx$/,

        exclude: /node_modules/,

        // Integração do babel com o webpack
        // Toda vez que um arquivo .jsx é importado o babel fará a conversão para que o browser entenda.
        use: "babel-loader",
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
