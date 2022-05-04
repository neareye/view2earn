const { responseSuccess,  } = require('../util');
const CategoryUtil = require('../util/category');

exports.getAllCategory = async (req, res, next) => {
  try {
    const { page, limit = 50 } = req.body;

    const { rows, count } = await CategoryUtil.findAndCountAll({
      where: {
        active: true
      },
      page,
      limit,
    });

    return responseSuccess(res, {
      data: rows,
      total: count,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(err);
  }
};