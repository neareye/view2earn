const moment = require('moment');
const { get: _get} = require('lodash');
const ItemUtil = require('../util/item');
const { Op, userSetting, seller, user, userSeller, watchList } = require('../database/models');
const { v4: uuidv4 } = require('uuid');
const { responseSuccess, getData, isTestOrDevEnv, responseError,
  actionEnum, responseInvalidRequestError, responseServiceError } = require('../util');
const {
  CODE_SERVICE_ERROR, STATUS_ACTIVE,
  CODE_PASSWORD_NOT_MATCH, CODE_TOKEN_EXPIRED, CODE_USER_NOT_ACTIVATED
} = require('../../app.const');
const MAX_SELLER_NUMBER = 500;

exports.importSellers = async (req, res, next) => {
  try {
    let userId = null;
    console.log('req[user]::: ', req['user']);

    if (req && req['user']) {
      userId = req.user['id'];
    }

    return responseSuccess(res, ["ryupo", "piuoy", "piuoy2", "piuoy3", "piuoy4", "piuoy4", "piuoy"]);
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(err);
  }
};

// Getting of user
exports.getSellers = async (req, res, next) => {
  try {
    let userId = null;
    console.log('req[user]::: ', req['user']);

    if (req && req['user']) {
      userId = req.user['id'];
    }

    let { keyword, limit = 20, page = 1  } = req.query;

    limit = Number.parseInt(limit);
    let offset = ((page - 1) * limit);

    console.log(req.body);

    // let where = {active: 1};
    let where = {};
    where.name = {
      [Op.like]: `%${keyword}%`,
    }

    const sellers = await seller.findAndCountAll({
      where,
      sort: [
        'updated_at','asc'
      ],
      limit,
      offset,
      include: [
        {
          model: userSeller,
          as: "userSellers",
          where: {
            active: true,
            userId: userId
          },
          required: true
        },
      ],
    });

    if (sellers) {
      return responseSuccess(res, {
        sellers: sellers.rows,
        total: sellers.count
      });
    } else {
      return responseSuccess(res, {
        sellers: [],
        total: 0
      });
    }

  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(err);
  }
};

// update seller of user
exports.updateSellers = async (req, res, next) => {
  try {
    let userId = null;
    console.log('req[user]::: ', req['user']);

    if (req && req['user']) {
      userId = req.user['id'];
    }

    console.log(req.body);
    let { sellers} = req.body;

    // add sellers
    sellers = sellers.replace(/ /g,"");
    sellers = sellers.replace(/\n/g,"");
    sellers = sellers.replace(/\t/g,"");
    sellers = sellers.replace(/\r/g,"");
    const sellerArr = sellers.split(',');

    if (sellerArr.length > 0 && sellerArr.length <= MAX_SELLER_NUMBER) {
      for (let s of sellerArr) {
        let a = await seller.findOne({ where: {
          ebay_id: s
        }});
        if (!a) {
          a = await seller.create({
            name: s,
            ebay_id: s,
            country: 'us',
            isCommon: false
          });
        }

        console.log('a.id = ', a.id);

        try {
          await userSeller.create({
            userId: userId,
            sellerId: a.id,
            active: 1
          });
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      return responseServiceError(res, [
        {
          code: CODE_SERVICE_ERROR,
          message: "Number of sellers is between 0 and 500 !"
        }
      ]);
    }

    const us = await user.findByPk(userId, {
      include: [
        {
          model: seller,
          as: "sellers",
          // attributes: ...
        },
      ],
    });

    return responseSuccess(res, {
      sellers: us.sellers
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(err);
  }
};

// Delete seller
exports.deleteSeller = async (req, res, next) => {
  try {
    let userId = null;
    console.log('req[user]::: ', req['user']);

    if (req && req['user']) {
      userId = req.user['id'];
    }

    const sellerId = req.params['sellerId'];

    await userSeller.update({active: 0}, {
      where: {
        userId: userId,
        sellerId: sellerId
      }
    });

    return responseSuccess(res, null);
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(err);
  }
};