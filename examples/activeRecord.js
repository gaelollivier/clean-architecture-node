const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  role: { type: String, enum: ['USER', 'ADMIN'] },
});

UserSchema.pre('save', function(next) {
  if (!this.isNew) return next();

  if (this.role != 'ADMIN' && this.email.endsWith('@admins.com')) {
    next(new Error('Only admins can use @admins.com emails'));
  } else {
    next();
  }
});

UserSchema.methods = {
  isAdmin: function() {
    return this.role === 'ADMIN';
  },
};

UserSchema.statics = {
  findByEmail: function(email) {
    return this.findOne({ email });
  },
};

mongoose.model('User', UserSchema);
