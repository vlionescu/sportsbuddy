/*jshint node: true*/
/*jshint esversion: 6 */

"use strict";

const Account         = require('../models/account.model');
const Activity        = require('../models/activity.model');
const ShopProduct     = require('../models/shop-products.model');
const EmailValidators = require('../models/email-validators.model');
const Category        = require('../models/category.model');
const ShopCategory    = require('../models/shopcategory.model');
const PendingRequest  = require('../models/pending-request.model');

async function getAccounts(){

    return Account.find({});
}

async function findUserById(id) {

    return Account.findById(id);
}

async function findUser(email) {

    return Account.findOne({email});
}

async function getEmailValidators() {

    return EmailValidators.find({});
}

async function addEmailValidator(companyName){

    let newEmailValidator = new EmailValidators(companyName);
    return newEmailValidator.save();
}

async function findCategoryData(name) {

    return Category.findOne({name: name});
}

async function saveUser(user) {

    let newUser = new Account(user);
    return newUser.save();
}

async function saveCategory(categ) {

    let newCategory = new Category(categ);
    return newCategory.save();
}

async function findCompanyName(companyName) {

    return EmailValidators.find({companyName});
}

async function updateUser(email, updatedData) {

    return Account.update({email: email}, updatedData);
}

async function updateAdmin(email) {

    return Account.update({email}, {isAdmin:true});
}

async function saveActivity(activity) {

    let newActivity = new Activity(activity);
    return newActivity.save();
}

async function getPendingRequests() {

    return PendingRequest.find({}, {accountEmail: 0, activityID: 0});
}

async function getPendingRequest(id) {

    return PendingRequest.findById(id);
}

async function getActivities() {

    return Activity.find({isValidated: true}).sort({date: -1});
}

async function getPendingActivities() {

    return Activity.find({isValidated: false}).sort({date: -1});
}

async function getPendingProducts() {

    return ShopProduct.find({isValidated: false});
}
async function getActivityById(id) {

    return Activity.findById(id);
}

async function deleteActivity(id) {

    return Activity.findById({_id: id}).remove();
}

async function updateActivity(id, activityData) {

    return Activity.findById(id).update(activityData);
}

async function validateActivity(id) {

    return Activity.update({_id: id}, {isValidated: true})
}

async function validateProduct(id) {

    return ShopProduct.update({_id: id}, {isValidated: true})
}

async function updateShopProduct(id, productData) {

    return ShopProduct.findById(id).update(productData);
}

async function saveProduct(product) {

    let newProduct = new ShopProduct(product);

    return newProduct.save();
}

async function getProducts() {

    return ShopProduct.find({isValidated: true});
}

async function getCategories(){

    return Category.find({});
}

async function getShopCategories(){

    return ShopCategory.find({});
}

async function addActivityToUser(email, activity) {

    return Account.findOneAndUpdate({email}, {$push:{activities: activity}})
}

async function addPendingActivityToUser(email, activity) {

    return Account.findOneAndUpdate({email}, {$push:{pendingActivities: activity}})
}

async function addShopCategory(category){
    let newCategory= new ShopCategory(category);

    return newCategory.save();
}

async function deleteProduct(id) {

    return ShopProduct.findById({_id: id}).remove();
}

async function getAccountById(id) {

    return Account.findById(id);
}

async function updateAccount(account, data) {

    return Account.update({email: account}, {name: data.name, position: data.position});
}

async function updateMeters(email, meters) {

    return Account.update({email}, {distance: meters})
}

async function updateAccountByActivity(email, activities) {

    return Account.update({email}, {activities: activities});
}

async function updateAccountByShopPurchase(id,purchases) {

    return Account.update({_id:id}, {shopPurchases: purchases});
}

async function addFunds(id, distance, funds) {

    let newDistance = distance + funds;
    return Account.update({_id:id}, {distance: newDistance});
}

async function getProductById(id) {

    return ShopProduct.find({_id:id});
}

async function withdrawFunds(account, shopproduct) {

    shopproduct.stock--;
    if(shopproduct.stock === 0) {
        shopproduct.showOnShop = false;
    }
    account.distance -= shopproduct.value;

    await Account.update({email: account}, {distance: account.distance});

    await ShopProduct.update({_id:shopproduct._id}, {stock: shopproduct.stock, showOnShop: shopproduct.showOnShop});

    return {message: 'OK.'}
}

async function addPendingRequest(pendingRequest) {

    let newPendingRequest = new PendingRequest(pendingRequest);

    return newPendingRequest.save();
}


async function getActivityRequests() {

    return PendingRequest.find({});
}

async function deletePendingRequest(pendingID) {
    console.log(pendingID)
    return PendingRequest.remove({_id: pendingID});
}

async function updatePicture(email, url) {

    return Account.update({email: email}, {photo: url});
}

async function saveReview(id, review) {
    return Activity.update(
        {_id: id},
        {$push: {reviews: review}}
    );
}

async function saveActivityToAccount(email, activity) {
    console.log('email si activity', email, activity)
    return Account.update(
        {email: email},
        {$push: {activities: activity}}
    );
}
module.exports = {
    deletePendingRequest,
    updateAccountByShopPurchase,
    getActivityRequests,
    addPendingRequest,
    getProductById,
    updateAdmin,
    withdrawFunds,
    addFunds,
    updateAccountByActivity,
    updateAccount,
    getAccountById,
    addShopCategory,
    getShopCategories,
    getCategories,
    findCategoryData,
    getPendingProducts,
    saveCategory,
    getActivityById,
    getAccounts,
    addEmailValidator,
    getEmailValidators,
    findUserById,
    findUser,
    findCompanyName,
    saveUser,
    updateUser,
    saveActivity,
    getActivities,
    deleteActivity,
    updateActivity,
    updateShopProduct,
    saveProduct,
    getProducts,
    deleteProduct,
    updatePicture,
    getPendingActivities,
    validateActivity,
    addActivityToUser,
    addPendingActivityToUser,
    getPendingRequests,
    validateProduct,
    saveReview,
    updateMeters,
    getPendingRequest,
    saveActivityToAccount
};

