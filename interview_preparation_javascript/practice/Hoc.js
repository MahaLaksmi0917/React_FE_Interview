// Hoc is nothing but taking a function and returning an enhanced functoin or its like a layer for running a function ...

function withAuth(originalFunction) {
  return function (user, ...args) {
    if (!user.hasAccess) {
      return "you dont have an access to do it..";
    }

    return originalFunction(user);
  };
}

function createUser(user) {
  return `${user.name} user created successfully`;
}

function deleteUser(user) {
  return `${user.name} user delete successfully`;
}

let user = {
  name: "Maha",
  hasAccess: true,
};

const createUserWithAuth = withAuth(createUser);

console.log(createUserWithAuth(user));
