const civilizationDao = require('../dao/CivilizationDao')

module.exports = {
    async getCivilizations() {
        return await civilizationDao.getCivilizations()
    },
    async addNewCivilization(model) {
        try {
            await civilizationDao.addNewCivilization(model)
            return {
                code: 200,
                message: '操作成功.'
            }
        } catch (err) {
            return {
                code: 500,
                message: err
            }
        }
    }
}