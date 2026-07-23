#!/bin/bash

# author: martin@affolter.net
#
# Registers a global npm link under a *-local name so a consuming app can link
# the working copy without shadowing the published package.
#
#   ./link.sh                 # from inside scripts/
#   cd <consuming-app> && npm link affolternet-vue3-feedback-local

set -e

node setname.js 'affolternet-vue3-feedback-local'
npm link
node setname.js 'affolternet-vue3-feedback'

echo "linked as affolternet-vue3-feedback-local"
