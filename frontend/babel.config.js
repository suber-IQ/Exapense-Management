export const presets = ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'];
export const plugins = [
    [
        'import',
        {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        },
    ],
];
  