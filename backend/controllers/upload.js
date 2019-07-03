

exports.newFile = async function (request, response, next) {
    return response.status(200).json({
        "message": "working"
    })
}