# GitHub Webhook

[![JavaScript Standard Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![MIT license](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

> HTTP server for handling GitHub webhook requests

## About

**GitHub Webhook** is a NodeJS-based HTTP server that handles the `push` events sent by [GitHub Webhooks](https://developer.github.com/webhooks/). The server pulls the changes from GitHub for the given repositories on a `push` event and handles the changes via local commands.

## Features

- Listening to the `push` events from GitHub Webhooks
- Configure remote repository and webhook secret for security
- Configure the path of the local repository
- Execute commands **before** and **after** the `git pull` command
- All commands can be executed in given working directories

## Usage

To use the **GitHub Webhook** server clone this repository into your server and set up a configuration file (`github-webhook.json`) in the root folder. You should run the NodeJS server to handle the webhook requests.ű

### Configuration

The server can be configured with the `github-webhook.json` file in the root of the clone of this repository. The JSON file should contain the following fields:

#### port

The server will be listening on this port. You should set this port in the URL of the GitHub Webhook's configuration. (e.g. `8001`)

#### github.repository

The name of the remote repository to watch (e.g. `elte-fi/github-webhook`).

#### github.secret

The secret string that you can configure in the GitHub Webhook configuration (e.g. `mysecret`).

#### local.repository

The path to the folder which contains the local version of the remote repository (e.g. `/path/to/local/repository`).

#### hooks.before

An array of `commands` that will be executed before running `git pull`. (e.g. deleting files)

#### hooks.after

An array of `commands` that will be executed **after** running `git pull`. (e.g. copying files, building)

#### Commands

The elements of `hooks.before` and `hooks.after` that constists of two fields:

- **command**: the command to be executed
- **workingDir**: the working directory in which the command will be executed

## Prerequisites

The server running this script needs NodeJS version > 7.6 and has to be accessible from the web.

## Contributing

All ideas, recommendations, bug reports, pull requests are welcome. :smile: