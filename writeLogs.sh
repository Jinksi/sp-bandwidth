#!/usr/bin/env bash
echo "writing logs to ~/logs"
for D in /srv/users/*; do
  if [ -d "${D}" ]; then
    zcat ${D}/log/*/*_apache.access.log.*.gz | goaccess ${D}/log/*/*_apache.access.log ${D}/log/*/*_apache.access.log.1 - -o json > ~/logs/${D##*/}.json
    echo "${D}"
  fi
  sleep 1;
done
