require('babel-register');
const config = require('../../config');

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],

  selenium: {
    start_process: false,
    server_path: '',
    log_path: '',
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': '',
    },
  },

  test_workers: { enabled: true, workers: 'auto' },

  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: 'ondemand.saucelabs.com',
      silent: true,
      globals: {
        devServerURL: `http://localhost:${process.env.PORT || config.dev.port}`,
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },
  },
};
