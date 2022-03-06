#!/usr/bin/env node

const { commands } = require('./dist/index');

const options = {
  input: {
    alias: 'i',
    description: 'Path to input document',
  },
  output: {
    alias: 'o',
    description: 'Path to output document',
  },
  key: {
    alias: 'k',
    description: 'Path to key',
  },
  mnemonic: {
    alias: 'm',
    description: 'Mnemonic to derive key',
  },
  hdpath: {
    alias: 'hd',
    description: 'HD Path to derive key',
  },
  type: {
    alias: 't',
    description: 'Type of key to derive',
  },
  format: {
    alias: 'f',
    choices: ['vc', 'vc-jwt'],
    description: 'Output format',
    default: 'vc',
  },
  endpoint: {
    alias: 'e',
    stype: 'string',
    description: 'Endpoint to use to issue',
  },
  access_token: {
    alias: 'a',
    stype: 'string',
    description: 'Authorization token to use',
  },
};

require('yargs')
  .scriptName('transmute')
  .usage('$0 <cmd> [args]')
  // key
  .command({
    command: 'key [operationType]',
    describe: 'Manage key material',
    handler: argv => {
      if (argv.operationType === 'generate') {
        return commands.key.generate.generateKeyCommand[3](argv);
      }
    },
    builder: {
      operationType: {
        demand: true,
        choices: ['generate'],
      },
      ...commands.key.generate.generateKeyCommand[2],
    },
  })

  // credential
  .command({
    command: 'credential [operationType]',
    describe: 'See https://www.w3.org/TR/vc-data-model/#credentials',
    handler: argv => {
      const dispatchHandler = {
        create: commands.credential.createCredentialHandler,
        verify: commands.credential.verifyCredentialHandler,
        setStatusListIndex: commands.credential.setStatusListIndexHandler,
        isStatusListIndexSet: commands.credential.isStatusListIndexSetHandler,
      };
      if (dispatchHandler[argv.operationType]) {
        return dispatchHandler[argv.operationType](argv);
      } else {
        throw new Error('Unsupported operationType');
      }
    },
    builder: {
      operationType: {
        demand: true,
        choices: [
          'create',
          'verify',
          'setStatusListIndex',
          'isStatusListIndexSet',
        ],
      },
      ...options,
    },
  })

  // presentation
  .command({
    command: 'presentation [operationType]',
    describe: 'See https://www.w3.org/TR/vc-data-model/#presentations',
    handler: argv => {
      if (argv.operationType === 'create') {
        return commands.presentation.createPresentationCommand[3](argv);
      }
      if (argv.operationType === 'verify') {
        return commands.presentation.verifyPresentationCommand[3](argv);
      }
    },
    builder: {
      operationType: {
        demand: true,
        choices: ['create', 'verify'],
      },
      ...commands.presentation.createPresentationCommand[2],
      ...commands.presentation.verifyPresentationCommand[2],
    },
  })

  // data
  .command({
    command: 'data [operationType]',
    describe: 'See https://www.w3.org/TR/vc-data-model/#lifecycle-details',
    handler: argv => {
      if (argv.operationType === 'create') {
        return commands.data.createDataCommand[3](argv);
      }
    },
    builder: {
      operationType: {
        demand: true,
        choices: ['create'],
      },
      ...commands.data.createDataCommand[2],
    },
  })

  // neo
  .command({
    command: 'neo [operationType]',
    describe: 'See https://neo4j.com/',
    handler: argv => {
      if (argv.operationType === 'workflow') {
        return commands.neo.importWorkflowInstanceComand[3](argv);
      }
    },
    builder: {
      operationType: {
        demand: true,
        choices: ['workflow'],
      },
      ...commands.neo.importWorkflowInstanceComand[2],
    },
  })

  // google
  .command({
    command: 'google [operationType]',
    describe:
      'A wrapper around a few google cloud libraries that help manage verifiable data.',
    handler: argv => {
      if (argv.operationType === 'create') {
        return commands.google.googleCommands[3](argv);
      }
    },
    builder: {
      operationType: {
        demand: true,
        choices: ['create'],
      },
      ...commands.google.googleCommands[2],
    },
  })

  .help().argv;
