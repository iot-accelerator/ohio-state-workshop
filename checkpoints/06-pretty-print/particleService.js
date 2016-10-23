function getStatus() {
    return $.ajax({
        url: 'https://particle-proxy.herokuapp.com/api/v1/status',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ohio-state-2016-workshop'
        }
    });
}

function getDevices() {
    return $.ajax({
        url: 'https://particle-proxy.herokuapp.com/api/v1/devices',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ohio-state-2016-workshop'
        }
    });
}

function getDeviceDetails(id) {
    return $.ajax({
        url: 'https://particle-proxy.herokuapp.com/api/v1/devices/' + id,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ohio-state-2016-workshop'
        }
    });
}

function getDeviceVariable(id, variable) {
    return $.ajax({
        url: 'https://particle-proxy.herokuapp.com/api/v1/devices/' + id + '/' + variable,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ohio-state-2016-workshop'
        }
    });
}

function getSensorData(sensorNameList) {
    let deviceObjects = [];

    return getDevices().then(devices => {
        return devices.map(d => d.id);
    }).then(ids => {
        return Promise.all(ids.map(id => getDeviceDetails(id)));
    }).then(details => {
        return details.map(d => {
            return {
                id: d.id,
                name: d.name
            };
        });
    }).then(devObjs => {
        deviceObjects = devObjs;
        return Promise.all(devObjs.map(
            d => Promise.all(sensorNameList.map(s => getDeviceVariable(d.id, s)))
        ));
    }).then(rawData => {
        return rawData.map((d, i) => {
           return {
               name: deviceObjects[i].name,
               sensors: d
           };
        });
    });
}

window.particleService = {
    getStatus: getStatus,
    getDevices: getDevices,
    getDeviceDetails: getDeviceDetails,
    getDeviceVariable: getDeviceVariable,
    getSensorData: getSensorData
};
