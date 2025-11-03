# os-health-report

A micro server reporting simple information on its (Linux) host machine:
```json
{ "memory_used": 0.81, "disk_used": 0.49, "cpu_used": 0.13 }
```
Those are fractions of the total resources available.

## Summary
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Start](#start)
- [API](#api)
  - [Get memory, CPU and disk used fraction](#get-memory-cpu-and-disk-used-fraction)
  - [Get systemd services statuses](#get-systemd-services-statuses)
  - [Get docker containers statuses](#get-docker-containers-statuses)
- [Use HTTP instead of HTTPS](#use-http-instead-of-https)
- [Documentation](#documentation)
  - [CPU](#cpu)
- [See also](#see-also)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation
```sh
git clone https://github.com/maxlath/os-health-report.git
cd os-health-report
npm install
```

## Start
* As a normal process
```sh
npm start
# Check that everything is fine
curl -k https://localhost:1112
```

* As a daemon handled by [systemd](https://en.wikipedia.org/wiki/Systemd)
```sh
# Uses sudo so you will be prompt for your password
npm run add-to-systemd
sudo systemctl start os-health-report
# Check that everything is fine
sudo systemctl status os-health-report
curl -k https://localhost:1112
```

## API
### Get memory, CPU and disk used fraction
```sh
curl -k https://localhost:1112
```
output:
```json
{ "memory_used": 0.81, "disk_used": 0.49, "cpu_used": 0.13 }
```

`cpu_used` is the 15 minutes [CPU average load](http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages).

### Get systemd services statuses
```sh
curl -k 'https://localhost:1112?services=couchdb|inventaire|nginx'
```
output:
```json
{
  "memory_used": 0.35,
  "disk_used": 0.48,
  "cpu_used": 0.04,
  "services": {
    "couchdb": "active",
    "inventaire": "inactive",
    "nginx": "active"
  }
}
```

### Get docker containers statuses
```sh
curl -k 'https://localhost:1112?docker=elasticsearch|lyrasis/blazegraph|585c7be23ac3|7ea426b95a78'
```
output:
```json
{
  "memory_used": 0.35,
  "disk_used": 0.48,
  "cpu_used": 0.04,
  "docker": {
    "elasticsearch": "active",
    "lyrasis/blazegraph": "inactive",
    "585c7be23ac3": "active",
    "7ea426b95a78": "inactive"
  }
}
```

## Use HTTP instead of HTTPS
The server uses self-signed certificates to run with HTTPS, thus the `-k` option passed to curl so that it ignores the TLS error it will get.
You can [do the same within Node](http://stackoverflow.com/a/21961005/3324977) using `process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'`, or by disabling it per request: for instance with the [request](https://www.npmjs.com/package/request) lib, it can be done by passing a flag:
```js
request({ method, url, rejectUnauthorized: false })
```

If for some reason, you prefer using HTTP, override the config by setting a different protocol in `./config/local.js`
```sh
echo "export default { protocol: 'http' }" > ./config/local.js
```

## Documentation
### CPU
* [Understand load average](http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages)
* [Restricting process CPU usage using nice, cpulimit, and cgroups](http://blog.scoutapp.com/articles/2014/11/04/restricting-process-cpu-usage-using-nice-cpulimit-and-cgroups)

## See also
* [os-info-server](https://github.com/bahmutov/os-info-server)
