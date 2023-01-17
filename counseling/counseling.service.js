const db = require('_helpers/db');

module.exports = {
    getAllCounseling,
    getCounseling,
    getCounselingById,
    create,
    update,
    _delete
};

async function getAllCounseling() {
    return await db.counseling.findAll({where: {status: true}});
}
async function getCounseling(params) {
    params.status = true;
    return await db.counseling.findAll({ where: params });
}

async function getCounselingById(id) {
    return await getCounseling({id: id});
}

async function create(params) {
    return await db.counseling.create(params);
}

async function update(id, params) {
    const info = await getCounseling({id: id});
    if(infi.length >= 1){
        info = info[0];
        Object.assign(info, params);
        return await info.save();
    }else{
        return {msg: 'user/booking not exists, please create new one'};
    }
}

async function _delete(id) {
    await db.counseling.destroy({where:{id: id}});
}