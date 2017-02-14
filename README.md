# os-health-report

A micro server reporting simple information on its (Linux) host machine:
```json
{ "memory_used": 0.81, "disk_used": 0.49, "cpu_used": 0.13 }
```
Those are fractions of the total resources available.

## Installation
```sh
git clone https://github.com/maxlath/os-health-report.git
npm install
npm start
curl http://localhost:1112
```

## Add to Systemd
```sh
# Uses sudo so you will be prompt for your password
npm run add-to-systemd
```

## See also
* [os-info-server](https://github.com/bahmutov/os-info-server)
