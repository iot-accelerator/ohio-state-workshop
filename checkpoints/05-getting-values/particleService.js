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

window.particleService = {
    getStatus: getStatus,
    getDevices: getDevices,
    getDeviceDetails: getDeviceDetails,
    getDeviceVariable: getDeviceVariable
};
