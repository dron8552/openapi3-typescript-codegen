#!/usr/bin/env node

import { Codegen } from './codegen';
import path = require('path');
import readYaml = require('read-yaml');
import cli = require('cli');

const options = cli.parse({
  templates: [ 't', 'Templates directory', 'dir', path.join(__dirname, '../templates/typescript')],
  output: [ 'o', 'Output directory', 'dir', path.join('./out')],
});

if (cli.args.length < 1) {
  throw new Error('No file specified');
}

readYaml(cli.args.shift(), (err, data) => {
  if (err) {
    process.stdout.write(`error reading file: ${err}`);
    return;
  }

  const generator = new Codegen(
    options.templates,
    options.output,
  );

  generator.generate(data);
});

