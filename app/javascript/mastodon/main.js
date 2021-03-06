const perf = require('./performance');

// allow override variables here
require.context('../../assets/stylesheets/', false, /variables.*\.scss$/);

// import default stylesheet with variables
require('font-awesome/css/font-awesome.css');
require('../styles/application.scss');

function onDomContentLoaded(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

function main() {
  perf.start('main()');
  const Mastodon = require('mastodon/containers/mastodon').default;
  const React = require('react');
  const ReactDOM = require('react-dom');

  require.context('../images/', true);

  // import customization styles
  require.context('../../assets/stylesheets/', false, /custom.*\.scss$/);

  onDomContentLoaded(() => {
    const mountNode = document.getElementById('mastodon');
    const props = JSON.parse(mountNode.getAttribute('data-props'));

    ReactDOM.render(<Mastodon {...props} />, mountNode);
    perf.stop('main()');
  });
}

export default main;
