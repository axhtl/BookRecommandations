const path = require('path');

module.exports = {
  // 엔트리 포인트 설정
  entry: './src/index.js',

  // 번들된 파일의 출력 설정
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  // 모듈 로더 설정
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // 필요에 따라 추가 로더 설정
    ],
  },

  // 개발 서버 설정
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000, // 개발 서버 포트
    allowedHosts: [
      'localhost',
      'yourdomain.com', // 필요한 경우 다른 도메인 추가
      'ceprj.gachon.ac.kr', // 사용 중인 도메인 추가
    ],
  },

  // 기타 설정
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
