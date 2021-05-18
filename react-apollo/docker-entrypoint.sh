#!/usr/bin/env bash
set -e
#rm -f /usr/sbin/suexec
cd /data;npm install

exec "$@"