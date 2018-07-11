const expect = require('expect');
const {Users} = require('./users.js');

var users;

beforeEach(() => {
  users = new Users();
  users.users = [{id:'1',name:'billhu',room:'node course'},
                 {id:'2',name:'hutao',room:'c course'},
                 {id:'3',name:'ywt',room:'node course'}
                ];
});

describe('users',()=>{
  it('should add user correctly',()=>{
    var users = new Users();
    var user = {id:'123',name:'billhu',room:'learning'};

    var responseUser = users.addUser(user.id,user.name,user.room);

    expect(users.users).toEqual([user]);
    expect(responseUser).toEqual(user);
  });

  it('should get user list1 correctly',() => {
    expect(users.getUserList(users.users[0].room)).toEqual([users.users[0].name,
                                                         users.users[2].name
                                                        ]);
  });

  it('should get user list2 correctly',() => {
    expect(users.getUserList(users.users[1].room)).toEqual([users.users[1].name
                                                        ]);
  });

  it('should get user', () => {
    expect(users.getUser(users.users[0].id)).toBe(users.users[0]);
  });

  it('should not get user', () => {
    expect(users.getUser('xxx')).toNotExist();
  });

  it('should delete user',() =>{
    expect(users.removeUser(users.users[0].id)).
      toEqual({id:'1',name:'billhu',room:'node course'});

    expect(users.users).
      toEqual([{id:'2',name:'hutao',room:'c course'},
               {id:'3',name:'ywt',room:'node course'}]);
  });

  it('should not delete user',() =>{
    expect(users.removeUser('xxx')).toNotExist();

    expect(users.users).
      toEqual([{id:'1',name:'billhu',room:'node course'},
               {id:'2',name:'hutao',room:'c course'},
               {id:'3',name:'ywt',room:'node course'}]);
  });
});
