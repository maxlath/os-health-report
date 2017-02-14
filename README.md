# os-health-report

A micro server reporting simple information on its (Linux) host machine:
```json
{ "memory_used": 0.81, "disk_used": 0.49, "cpu_used": 0.13 }
```
Those are fractions of the total resources available.

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
sudo systemctl start os-health-report
curl -k https://localhost:1112
```

## Use HTTP instead of HTTPS
The server uses self-signed certificates to run with HTTPS, thus the `-k` option passed to curl so that it ignores the TLS error it will get.
You can [do the same within Node](http://stackoverflow.com/a/21961005/3324977) using `process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'`.

If for some reason, you prefer using HTTP, override the config by setting a different protocol in `./config/local.js`
```sh
echo "module.exports = { protocol: 'http' }" > ./config/local.js
```

## See also
* [os-info-server](https://github.com/bahmutov/os-info-server)
