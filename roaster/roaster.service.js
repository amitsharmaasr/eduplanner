const db = require('_helpers/db');
var moment = require('moment');

module.exports = {
    getAllRoaster,
    getRoaster,
    getRoasterById,
    createRoaster,
    updateRoaster,
    deleteRoaster,
};


async function getAllRoaster() {
    return await db.roaster.findAll({where: {status: true}});
}
async function getRoaster(params) {
    params.status = true;
    return await db.roaster.findAll({ where: params });
}

async function getRoasterById(id) {
    return await getRoaster({id: id});
}

async function createRoaster(params) {

    if(params.from_date != params.to_date){
        var start = moment(params.from_date).format('DD-MM-YYYY"');
        var end = moment(params.to_date).format('DD-MM-YYYY"');
        var loop = start;
        while(loop <= end){
            params = await getRoasterParams(params.teacher_id, loop);
            var newDate = loop.setDate(loop.getDate() + 1);
            loop = moment(loop, "DD-MM-YYYY").add(1, 'days');
            await db.roaster.bulkCreate(params);
        }
    }else{
            params = await getRoasterParams(params.teacher_id, params.from_date);
            await db.roaster.bulkCreate(params);
    }
    return {'msg' : 'roaster created'}
}

async function updateRoaster(id, params) {
    const roaster = await getRoaster({id: id});
    if(roaster.length >= 1){
        roaster = roaster[0];
        Object.assign(roaster, params);
        await roaster.save();
        return omitHash(roaster.get());
    }else{
        return {msg: 'roaster not exists'};
    }
}

async function deleteRoaster(id) {
    const roaster = await getRoaster({id: id});
    await roaster.destroy({where:{id: id}});
}


async function getRoasterParams(teacher_id, roaster_date){
    var data = [];
    for(let hour = 9; hour < 18; hour++) {
        var firstInt = moment({ hour }).format('HH:mm');
        var secondInt = moment({
            hour,
            minute: 30
        }).format('HH:mm');
        var thirdInt = moment({ hour+1 }).format('HH:mm');
        data.push({teacher_id, from_time: from_time: firstInt, to_time: secondInt, roaster_date}, {teacher_id, from_time: to_time: secondInt, to_time: thirdInt, roaster_date});
    }
    return data;
}