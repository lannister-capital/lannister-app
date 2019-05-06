module.exports = {
  extends: [
    'react-app',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['graphql', 'prettier'],
  rules: {
    'prettier/prettier': ['warn'],
    'react/prop-types': ['warn'],
    'react/no-find-dom-node': ['warn'],
    'react/display-name': ['warn'],

    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
        schemaJson: require('./schema.json')
      }
    ]
  }
}
