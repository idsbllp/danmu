function Ajax (ajaxData) {

    var obj = {
        url: './index.php',
        method: 'GET',
        async: true,
        data: null,
        success: function () {},
        fail: function () {},
    }
    for (var item in ajaxData) {
        obj[item] = ajaxData[item] || obj[item];
    }
    if (!ajaxData.async || ajaxData.async.toString() === 'false') {
        obj.async = false;
    }

    function CreateXhr () {
        if (window.XMLHttpRequest) {
            CreateXhr = function () {
                return new XMLHttpRequest();
            }
        } else {
            CreateXhr = function () {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        return CreateXhr();
    }


    var xhr = new CreateXhr();

    xhr.addEventListener('load', function () {
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                obj.success(xhr.responseText);
            } else {
                obj.fail(xhr.status);
            }
        } else {
            obj.fail(xhr.readyState);
        }
    });
    switch (obj.method.toUpperCase()) {
        case 'GET':
            if (obj.data) {
                xhr.open('GET', obj.url + '?' + obj.data, obj.async);
            } else {
                xhr.open('GET', obj.url);
            }
            xhr.send();
            break;
        case 'POST':
            xhr.open('POST', obj.url, obj.async);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(obj.data);
            break;
        default:
            console.error('check your method!');
    }
}