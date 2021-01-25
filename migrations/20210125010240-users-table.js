'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('users',{
    id: {type:'int',primaryKey:true,autoIncrement:true,notNull:true},
    username: {type:'string',notNull:true},
    email: {type:'string',notNull:true},
    password: {type:'string',notNull:true},
    email_verified_at: {type:'datetime',notNull:false},
    created_at: {type:'datetime',notNull:false},
    updated_at: {type:'datetime',notNull:false},
  });
};

exports.down = function(db) {
  return db.dropTable('users')
};

exports._meta = {
  "version": 1
};
