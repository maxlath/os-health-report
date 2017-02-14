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
curl http://localhost:1112
```

* As a daemon handled by [systemd](https://en.wikipedia.org/wiki/Systemd)
```sh
# Uses sudo so you will be prompt for your password
npm run add-to-systemd
sudo systemctl start os-health-report
# Check that everything is fine
sudo systemctl start os-health-report
curl http://localhost:1112
```

## See also
* [os-info-server](https://github.com/bahmutov/os-info-server)
