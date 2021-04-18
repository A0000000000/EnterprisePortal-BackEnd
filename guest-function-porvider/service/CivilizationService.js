const civilizationDao = require('../dao/CivilizationDao')

module.exports = {
    async getCivilizations() {
        return await civilizationDao.getCivilizations()
    },
    async addNewCivilization(model) {
        try {
            await civilizationDao.addNewCivilization(model)
            return {
                status: 'success',
                message: '操作成功.'
            }
        } catch (err) {
            return {
                status: 'failed',
                message: err
            }
        }
    }
}