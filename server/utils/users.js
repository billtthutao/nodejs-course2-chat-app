class Users{
  constructor() {
    this.users = [];
  }

  addUser(id,name,room){
    var user = {id,name,room};
    this.users.push(user);
  
    return user;
  }

  getUserList(room){
    var users = this.users.filter((user) => user.room === room);

    var namesArray = users.map(user => user.name);

    return namesArray;
  }

  removeUser(id){
    var deleteUser = this.getUser(id);
    var leftUsers = this.users.filter((user) => user.id != id);

    this.users = leftUsers;

    return deleteUser;
  }

  getUser(id){
    return this.users.filter((user) => user.id === id)[0];
  }
}

module.exports = {Users};
